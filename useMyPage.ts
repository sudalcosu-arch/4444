/**
 * AuthContext.tsx — 사용자 인증 관리
 * Firebase Authentication + 소셜 로그인 (Google, Kakao)
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  provider?: string; // "google", "kakao", "anonymous"
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithKakao: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 초기 로드 시 저장된 사용자 정보 복원
  useEffect(() => {
    const savedUser = localStorage.getItem("cosatelier_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to restore user:", error);
      }
    }
    setLoading(false);
  }, []);

  // 사용자 정보 저장
  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("cosatelier_user", JSON.stringify(userData));
  };

  // 구글 로그인
  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      // 실제 배포 시 Firebase SDK 사용
      // 현재는 로컬 테스트용 시뮬레이션
      const mockUser: User = {
        uid: `google_${Date.now()}`,
        email: "user@gmail.com",
        displayName: "Google User",
        photoURL: `https://ui-avatars.com/api/?name=Google+User&background=random`,
        provider: "google",
      };

      saveUser(mockUser);
      toast.success("구글로 로그인했습니다");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("구글 로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  // 카카오 로그인
  const signInWithKakao = async () => {
    try {
      setLoading(true);

      // 실제 배포 시 카카오 SDK 사용
      // 현재는 로컬 테스트용 시뮬레이션
      const mockUser: User = {
        uid: `kakao_${Date.now()}`,
        email: "user@kakao.com",
        displayName: "Kakao User",
        photoURL: `https://ui-avatars.com/api/?name=Kakao+User&background=random`,
        provider: "kakao",
      };

      saveUser(mockUser);
      toast.success("카카오로 로그인했습니다");
    } catch (error) {
      console.error("Kakao sign-in error:", error);
      toast.error("카카오 로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  // 익명 로그인
  const signInAnonymously = async () => {
    try {
      setLoading(true);

      const mockUser: User = {
        uid: `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        displayName: "Anonymous User",
        photoURL: `https://ui-avatars.com/api/?name=Anonymous&background=random`,
        provider: "anonymous",
      };

      saveUser(mockUser);
      toast.success("익명으로 시작했습니다");
    } catch (error) {
      console.error("Anonymous sign-in error:", error);
      toast.error("로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃
  const signOut = async () => {
    try {
      setLoading(true);
      setUser(null);
      localStorage.removeItem("cosatelier_user");
      toast.success("로그아웃했습니다");
    } catch (error) {
      console.error("Sign-out error:", error);
      toast.error("로그아웃에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithKakao,
        signInAnonymously,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
