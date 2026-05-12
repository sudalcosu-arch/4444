/**
 * useFirebaseSync Hook with Local Fallback
 * Firebase가 없으면 로컬 스토리지만 사용
 */

import { useState, useEffect, useCallback } from 'react';
import { useFirebase } from '@/contexts/FirebaseContext';
import {
  saveDataToFirebase,
  subscribeToFirebaseData,
  getCurrentUserId,
} from '@/lib/firebase';

export function useFirebaseSync<T>(
  storagePath: string,
  initialValue: T,
  firebasePath?: string
) {
  const { isLocalMode } = useFirebase();
  
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(`cosatelier_${storagePath}`);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // 로컬 스토리지에 저장하고 Firebase에 동기화 (선택적)
  const setStoredValue = useCallback(
    async (newValue: T | ((prev: T) => T)) => {
      setIsSyncing(true);
      setSyncError(null);

      try {
        setValue((prev) => {
          const next =
            typeof newValue === 'function'
              ? (newValue as (prev: T) => T)(prev)
              : newValue;

          // 로컬 스토리지에 저장
          localStorage.setItem(`cosatelier_${storagePath}`, JSON.stringify(next));

          // Firebase에 비동기로 저장 (로컬 모드가 아닐 때만)
          if (!isLocalMode) {
            const fbPath = firebasePath || storagePath;
            saveDataToFirebase(fbPath, next)
              .then((success) => {
                if (success) {
                  setLastSyncTime(new Date());
                  console.log(`✅ ${storagePath} synced to Firebase`);
                }
              })
              .catch((error) => {
                setSyncError(`Failed to sync ${storagePath}`);
                console.error('Sync error:', error);
              })
              .finally(() => {
                setIsSyncing(false);
              });
          } else {
            setIsSyncing(false);
            setLastSyncTime(new Date());
          }

          return next;
        });
      } catch (error) {
        setSyncError('Failed to update data');
        console.error('Update error:', error);
        setIsSyncing(false);
      }
    },
    [storagePath, firebasePath, isLocalMode]
  );

  // Firebase 실시간 구독 설정 (로컬 모드가 아닐 때만)
  useEffect(() => {
    if (isLocalMode) return;

    const userId = getCurrentUserId();
    if (!userId) return;

    const fbPath = firebasePath || storagePath;
    const unsubscribe = subscribeToFirebaseData<T>(fbPath, (firebaseData) => {
      if (firebaseData) {
        // Firebase 데이터를 로컬 스토리지에 동기화
        localStorage.setItem(`cosatelier_${storagePath}`, JSON.stringify(firebaseData));
        setValue(firebaseData);
        setLastSyncTime(new Date());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [storagePath, firebasePath, isLocalMode]);

  return [value, setStoredValue, { isSyncing, lastSyncTime, syncError }] as const;
}

/**
 * 간단한 버전: 동기화 상태 없이 사용
 */
export function useFirebaseSyncSimple<T>(
  storagePath: string,
  initialValue: T,
  firebasePath?: string
) {
  const [value, setValue, syncState] = useFirebaseSync(
    storagePath,
    initialValue,
    firebasePath
  );
  return [value, setValue] as const;
}
