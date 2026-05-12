/**
 * useServiceWorker Hook
 * Service Worker 등록 및 업데이트 관리
 */

import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isUpdating: boolean;
  updateAvailable: boolean;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isUpdating: false,
    updateAvailable: false,
  });

  useEffect(() => {
    // Service Worker 지원 확인
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    setState((prev) => ({ ...prev, isSupported: true }));

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('✅ Service Worker registered:', registration);
        setState((prev) => ({ ...prev, isRegistered: true }));

        // 업데이트 확인
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 새 Service Worker가 준비됨
              console.log('📦 New Service Worker available');
              setState((prev) => ({ ...prev, updateAvailable: true }));
            }
          });
        });

        // 주기적으로 업데이트 확인 (1시간마다)
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    };

    // 페이지 로드 후 등록
    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker);
      return () => window.removeEventListener('load', registerServiceWorker);
    }
  }, []);

  // Service Worker 업데이트 적용
  const applyUpdate = () => {
    if (!navigator.serviceWorker.controller) return;

    setState((prev) => ({ ...prev, isUpdating: true }));

    navigator.serviceWorker.controller.postMessage({
      type: 'SKIP_WAITING',
    });

    // 새 Service Worker 활성화 대기
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  };

  return {
    ...state,
    applyUpdate,
  };
}

export default useServiceWorker;
