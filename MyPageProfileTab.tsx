/**
 * LoginModal.tsx — 소셜 로그인 모달
 * 구글, 카카오, 익명 로그인 옵션 제공
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithGoogle, signInWithKakao, signInAnonymously, loading } =
    useAuth();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setSelectedMethod("google");
    await signInWithGoogle();
    onClose();
  };

  const handleKakaoLogin = async () => {
    setSelectedMethod("kakao");
    await signInWithKakao();
    onClose();
  };

  const handleAnonymousLogin = async () => {
    setSelectedMethod("anonymous");
    await signInAnonymously();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="isometric-card p-6 space-y-6">
              {/* 헤더 */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold gradient-text">로그인</h2>
                  <p className="text-sm text-white/50 mt-1">
                    계정으로 로그인하여 데이터를 동기화하세요
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 로그인 옵션 */}
              <div className="space-y-3">
                {/* 구글 로그인 */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 border-border/50 hover:border-primary/50 transition-all flex items-center justify-center gap-3 font-semibold",
                    selectedMethod === "google" && loading
                      ? "bg-primary/20 border-primary"
                      : "hover:bg-primary/5"
                  )}
                >
                  {selectedMethod === "google" && loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                  <span className="text-white">구글로 로그인</span>
                </motion.button>

                {/* 카카오 로그인 */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleKakaoLogin}
                  disabled={loading}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 border-border/50 hover:border-accent/50 transition-all flex items-center justify-center gap-3 font-semibold",
                    selectedMethod === "kakao" && loading
                      ? "bg-accent/20 border-accent"
                      : "hover:bg-accent/5"
                  )}
                >
                  {selectedMethod === "kakao" && loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-accent" />
                  )}
                  <span className="text-white">카카오로 로그인</span>
                </motion.button>

                {/* 익명 로그인 */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnonymousLogin}
                  disabled={loading}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 border-border/50 hover:border-white/50 transition-all flex items-center justify-center gap-3 font-semibold text-white/70 hover:text-white",
                    selectedMethod === "anonymous" && loading
                      ? "bg-white/10 border-white/50"
                      : "hover:bg-white/5"
                  )}
                >
                  {selectedMethod === "anonymous" && loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                  <span>익명으로 시작</span>
                </motion.button>
              </div>

              {/* 설명 */}
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-xs text-white/70 leading-relaxed">
                  💡 <strong>팁:</strong> 소셜 로그인을 사용하면 여러 기기에서
                  데이터가 자동으로 동기화됩니다. 익명 로그인은 이 기기에만
                  데이터가 저장됩니다.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
