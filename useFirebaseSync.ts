/**
 * UserProfile.tsx — 사용자 프로필 메뉴
 * 로그인 상태 표시 및 로그아웃 기능
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  onLoginClick: () => void;
}

export default function UserProfile({ onLoginClick }: UserProfileProps) {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLoginClick}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold transition-all"
      >
        로그인
      </motion.button>
    );
  }

  return (
    <div className="relative">
      {/* 프로필 버튼 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        )}
        <span className="text-sm font-semibold text-white hidden sm:inline">
          {user.displayName?.split(" ")[0] || "User"}
        </span>
      </motion.button>

      {/* 드롭다운 메뉴 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 클릭 감지 */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 메뉴 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 isometric-card p-3 z-50 space-y-2"
            >
              {/* 사용자 정보 */}
              <div className="px-3 py-2 border-b border-border/20">
                <p className="text-xs text-white/50">로그인 계정</p>
                <p className="text-sm font-semibold text-white truncate">
                  {user.displayName || "Anonymous"}
                </p>
                {user.email && (
                  <p className="text-xs text-white/50 truncate">{user.email}</p>
                )}
                {user.provider && (
                  <p className="text-xs text-accent mt-1 capitalize">
                    {user.provider === "google" && "🔵 Google"}
                    {user.provider === "kakao" && "💛 Kakao"}
                    {user.provider === "anonymous" && "👤 Anonymous"}
                  </p>
                )}
              </div>

              {/* 로그아웃 버튼 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  await signOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors text-sm font-semibold"
              >
                <LogOut size={16} />
                로그아웃
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
