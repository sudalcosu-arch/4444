/**
 * PWA Install Prompt Component
 * 사용자에게 앱 설치를 제안하는 UI
 */

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServiceWorker } from '@/hooks/useServiceWorker';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { updateAvailable, applyUpdate } = useServiceWorker();

  useEffect(() => {
    // PWA 설치 프롬프트 이벤트 감지
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
      console.log('💾 PWA install prompt available');
    };

    // 앱이 설치되었는지 확인
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log('✅ App installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 이미 설치되어 있는지 확인
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('✅ User accepted install prompt');
        setShowPrompt(false);
        setDeferredPrompt(null);
      } else {
        console.log('❌ User dismissed install prompt');
      }
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  };

  // 설치 프롬프트 표시
  if (showPrompt && deferredPrompt && !isInstalled) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-bottom-4">
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-4 border border-primary/20">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                <Download size={16} />
                CosAtelier 설치
              </h3>
              <p className="text-xs text-white/80">
                스마트폰 홈 화면에 앱으로 추가하고 언제든 빠르게 접속하세요!
              </p>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-white/60 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-2 mt-3">
            <Button
              onClick={handleInstall}
              size="sm"
              className="flex-1 bg-white text-primary hover:bg-white/90"
            >
              설치
            </Button>
            <Button
              onClick={() => setShowPrompt(false)}
              size="sm"
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              나중에
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 업데이트 알림
  if (updateAvailable) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-bottom-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-4 border border-blue-400/20">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-sm text-white mb-1">
                업데이트 사용 가능
              </h3>
              <p className="text-xs text-white/80">
                새로운 버전이 준비되었습니다.
              </p>
            </div>
            <button
              onClick={() => {}}
              className="text-white/60 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-2 mt-3">
            <Button
              onClick={applyUpdate}
              size="sm"
              className="flex-1 bg-white text-blue-600 hover:bg-white/90"
            >
              업데이트
            </Button>
            <Button
              onClick={() => {}}
              size="sm"
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              나중에
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default PWAInstallPrompt;
