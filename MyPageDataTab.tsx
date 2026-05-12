/**
 * Layout.tsx — Premium CosAtelier Design System
 * 코스프레의 화려함과 예술성을 담은 프리미엄 네비게이션
 * Playfair Display (우아한 제목) + Poppins (현대적 본문)
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { Home, ListChecks, ShoppingBag, MapPin, Camera, Map, User } from "lucide-react";
import { cn } from "@/lib/utils";
import UserProfile from "./UserProfile";
import LoginModal from "./LoginModal";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/", icon: Home, label: "홈" },
  { path: "/checklist", icon: ListChecks, label: "체크리스트" },
  { path: "/shopping", icon: ShoppingBag, label: "쇼핑" },
  { path: "/field", icon: MapPin, label: "현장" },
  { path: "/matching", icon: Camera, label: "매칭" },
  { path: "/venue", icon: Map, label: "지도" },
  { path: "/mypage", icon: User, label: "마이페이지" },
];

export default function Layout({ children }: LayoutProps) {
  const [location, navigate] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-background via-background to-background/80 backdrop-blur-2xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-accent flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span className="text-white text-lg font-black" style={{ fontFamily: "'Playfair Display', serif" }}>C</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-gradient-premium">Cos</span>
                <span className="text-foreground">Atelier</span>
              </span>
              <div className="text-[7px] text-primary font-bold tracking-widest uppercase">코스프레 올인원</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserProfile onLoginClick={() => setShowLoginModal(true)} />
            <span className="section-number">v1.0</span>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* 로그인 모달 */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* 하단 탭 바 */}
      <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
        <div className="flex items-center justify-around px-1 py-3">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={cn(
                  "flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl transition-all duration-300 min-w-[64px] font-medium",
                  isActive
                    ? "bg-gradient-to-br from-primary/25 to-accent/15 text-primary shadow-lg scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/8 hover:scale-105"
                )}
              >
                <Icon
                  size={24}
                  className={cn(
                    "transition-all duration-300",
                    isActive && "drop-shadow-md"
                  )}
                />
                <span className={cn(
                  "text-[7.5px] font-bold transition-all duration-300 tracking-widest uppercase",
                  isActive ? "text-primary" : "text-readable-muted"
                )}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
