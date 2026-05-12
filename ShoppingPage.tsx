/**
 * Firebase Configuration & Initialization
 * CosAtelier - Cloud Sync System
 * 
 * Firebase Realtime Database를 사용한 기기 간 데이터 동기화
 */

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, Auth, User } from 'firebase/auth';
import { getDatabase, ref, set, get, onValue, Database, DatabaseReference } from 'firebase/database';

// Firebase 설정 (환경 변수에서 로드)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKeyForCosAtelier',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'cosatelier-demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'cosatelier-demo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'cosatelier-demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://cosatelier-demo.firebaseio.com',
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

/**
 * 익명 사용자로 로그인
 * 처음 앱을 열 때 자동으로 익명 계정 생성
 */
export async function signInAnonymousUser(): Promise<User | null> {
  try {
    const result = await signInAnonymously(auth);
    console.log('✅ Anonymous user signed in:', result.user.uid);
    return result.user;
  } catch (error) {
    console.error('❌ Failed to sign in anonymously:', error);
    return null;
  }
}

/**
 * 현재 사용자 모니터링
 */
export function onUserStateChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * 사용자 UID 가져오기
 */
export function getCurrentUserId(): string | null {
  return auth.currentUser?.uid || null;
}

/**
 * Firebase에 데이터 저장
 */
export async function saveDataToFirebase<T>(path: string, data: T): Promise<boolean> {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      console.warn('⚠️ No user ID, cannot save to Firebase');
      return false;
    }

    const dbRef = ref(database, `users/${userId}/${path}`);
    await set(dbRef, {
      data,
      timestamp: new Date().toISOString(),
    });
    console.log(`✅ Data saved to Firebase: ${path}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to save data to Firebase: ${path}`, error);
    return false;
  }
}

/**
 * Firebase에서 데이터 가져오기 (한 번)
 */
export async function getDataFromFirebase<T>(path: string): Promise<T | null> {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      console.warn('⚠️ No user ID, cannot fetch from Firebase');
      return null;
    }

    const dbRef = ref(database, `users/${userId}/${path}`);
    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
      const value = snapshot.val();
      console.log(`✅ Data fetched from Firebase: ${path}`);
      return value.data as T;
    } else {
      console.log(`ℹ️ No data found at ${path}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Failed to fetch data from Firebase: ${path}`, error);
    return null;
  }
}

/**
 * Firebase 실시간 데이터 모니터링
 * 데이터가 변경되면 콜백 함수 호출
 */
export function subscribeToFirebaseData<T>(
  path: string,
  callback: (data: T | null) => void
): (() => void) {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      console.warn('⚠️ No user ID, cannot subscribe to Firebase');
      return () => {};
    }

    const dbRef = ref(database, `users/${userId}/${path}`);
    
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const value = snapshot.val();
          console.log(`📡 Real-time data update: ${path}`);
          callback(value.data as T);
        } else {
          console.log(`ℹ️ No data at ${path}`);
          callback(null);
        }
      },
      (error) => {
        console.error(`❌ Error listening to ${path}:`, error);
        callback(null);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error(`❌ Failed to subscribe to ${path}:`, error);
    return () => {};
  }
}

/**
 * 데이터 동기화 상태 체크
 */
export async function checkFirebaseConnection(): Promise<boolean> {
  try {
    const userId = getCurrentUserId();
    if (!userId) return false;

    const dbRef = ref(database, `users/${userId}/connection_test`);
    await set(dbRef, { timestamp: new Date().toISOString() });
    console.log('✅ Firebase connection OK');
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
}

/**
 * 로컬 스토리지와 Firebase 동기화
 * 앱 시작 시 호출하여 클라우드 데이터를 로컬에 병합
 */
export async function syncLocalStorageWithFirebase(): Promise<void> {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      console.warn('⚠️ No user ID, skipping sync');
      return;
    }

    console.log('🔄 Starting local-Firebase sync...');

    // 주요 데이터 경로들
    const dataPaths = [
      'characters',
      'survivalKit',
      'craftProjects',
      'shoppingLinks',
      'matchingProfiles',
      'venueBookmarks',
    ];

    for (const path of dataPaths) {
      const localData = localStorage.getItem(`cosatelier_${path}`);
      
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          
          // Firebase에 데이터가 있는지 확인
          const firebaseData = await getDataFromFirebase(path);
          
          if (!firebaseData) {
            // Firebase에 없으면 로컬 데이터 업로드
            await saveDataToFirebase(path, parsedData);
            console.log(`📤 Uploaded ${path} to Firebase`);
          } else {
            // Firebase 데이터가 더 최신이면 로컬 업데이트
            localStorage.setItem(`cosatelier_${path}`, JSON.stringify(firebaseData));
            console.log(`📥 Updated ${path} from Firebase`);
          }
        } catch (error) {
          console.error(`Error syncing ${path}:`, error);
        }
      }
    }

    console.log('✅ Sync completed');
  } catch (error) {
    console.error('❌ Sync failed:', error);
  }
}

export default {
  signInAnonymousUser,
  onUserStateChanged,
  getCurrentUserId,
  saveDataToFirebase,
  getDataFromFirebase,
  subscribeToFirebaseData,
  checkFirebaseConnection,
  syncLocalStorageWithFirebase,
};
