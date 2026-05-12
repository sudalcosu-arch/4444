/**
 * Firebase Context with Local Fallback
 * Firebase가 없으면 로컬 스토리지만 사용
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  signInAnonymousUser,
  onUserStateChanged,
  syncLocalStorageWithFirebase,
  checkFirebaseConnection,
} from '@/lib/firebase';

interface FirebaseContextType {
  user: User | null;
  isLoading: boolean;
  isConnected: boolean;
  syncError: string | null;
  isLocalMode: boolean; // Firebase 없이 로컬 모드인지 여부
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isLocalMode, setIsLocalMode] = useState(false);

  useEffect(() => {
    let unsubscribeAuth: (() => void) | undefined;

    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        // Firebase 설정이 유효한지 확인
        const hasValidConfig = 
          import.meta.env.VITE_FIREBASE_API_KEY &&
          import.meta.env.VITE_FIREBASE_PROJECT_ID;

        if (!hasValidConfig) {
          console.warn('⚠️ Firebase not configured, using local mode only');
          setIsLocalMode(true);
          setIsLoading(false);
          return;
        }

        // 기존 세션이 있는지 확인
        unsubscribeAuth = onUserStateChanged(async (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
            console.log('✅ User authenticated:', currentUser.uid);

            // Firebase 연결 확인
            const connected = await checkFirebaseConnection();
            setIsConnected(connected);

            // 로컬 스토리지와 Firebase 동기화
            try {
              await syncLocalStorageWithFirebase();
            } catch (error) {
              setSyncError('Failed to sync data');
              console.error('Sync error:', error);
            }
          } else {
            // 익명 로그인
            const newUser = await signInAnonymousUser();
            if (newUser) {
              setUser(newUser);
              const connected = await checkFirebaseConnection();
              setIsConnected(connected);
              await syncLocalStorageWithFirebase();
            } else {
              setSyncError('Failed to authenticate');
              setIsLocalMode(true);
            }
          }

          setIsLoading(false);
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        console.warn('⚠️ Falling back to local mode');
        setSyncError('Firebase unavailable, using local mode');
        setIsLocalMode(true);
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, []);

  return (
    <FirebaseContext.Provider 
      value={{ user, isLoading, isConnected, syncError, isLocalMode }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within FirebaseProvider');
  }
  return context;
}
