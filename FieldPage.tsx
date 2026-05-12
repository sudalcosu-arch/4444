/**
 * useMyPage.ts — 마이페이지 데이터 관리 훅
 * 프로필, 캐릭터, 데이터 관리 기능
 */

import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface UserProfile {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  bio?: string;
  createdAt: number;
}

export interface MyCharacter {
  id: string;
  name: string;
  series: string;
  photoURL?: string;
  progress: number; // 0-100
  checklist: {
    id: string;
    name: string;
    completed: boolean;
  }[];
  createdAt: number;
  updatedAt: number;
}

export function useMyPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myCharacters, setMyCharacters] = useState<MyCharacter[]>([]);
  const [loading, setLoading] = useState(false);

  // 프로필 로드
  const loadProfile = useCallback(() => {
    try {
      const savedUser = localStorage.getItem("cosatelier_user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const savedProfile = localStorage.getItem(`profile_${user.uid}`);
        
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        } else {
          // 기본 프로필 생성
          const newProfile: UserProfile = {
            uid: user.uid,
            displayName: user.displayName || "User",
            email: user.email,
            photoURL: user.photoURL,
            bio: "",
            createdAt: Date.now(),
          };
          setProfile(newProfile);
          saveProfile(newProfile);
        }
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      toast.error("프로필 로드 실패");
    }
  }, []);

  // 프로필 저장
  const saveProfile = useCallback((updatedProfile: UserProfile) => {
    try {
      localStorage.setItem(`profile_${updatedProfile.uid}`, JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      toast.success("프로필이 저장되었습니다");
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error("프로필 저장 실패");
    }
  }, []);

  // 프로필 사진 업데이트
  const updateProfilePhoto = useCallback((photoURL: string) => {
    if (profile) {
      const updated = { ...profile, photoURL };
      saveProfile(updated);
    }
  }, [profile, saveProfile]);

  // 프로필 이름 업데이트
  const updateProfileName = useCallback((displayName: string) => {
    if (profile) {
      const updated = { ...profile, displayName };
      saveProfile(updated);
    }
  }, [profile, saveProfile]);

  // 프로필 소개 업데이트
  const updateProfileBio = useCallback((bio: string) => {
    if (profile) {
      const updated = { ...profile, bio };
      saveProfile(updated);
    }
  }, [profile, saveProfile]);

  // 내 캐릭터 로드
  const loadMyCharacters = useCallback(() => {
    try {
      const savedUser = localStorage.getItem("cosatelier_user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const saved = localStorage.getItem(`my_characters_${user.uid}`);
        
        if (saved) {
          setMyCharacters(JSON.parse(saved));
        } else {
          setMyCharacters([]);
        }
      }
    } catch (error) {
      console.error("Failed to load characters:", error);
      toast.error("캐릭터 로드 실패");
    }
  }, []);

  // 캐릭터 추가
  const addCharacter = useCallback((character: Omit<MyCharacter, "id" | "createdAt" | "updatedAt">) => {
    try {
      const savedUser = localStorage.getItem("cosatelier_user");
      if (!savedUser) {
        toast.error("로그인이 필요합니다");
        return;
      }

      const user = JSON.parse(savedUser);
      const newCharacter: MyCharacter = {
        ...character,
        id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const updated = [...myCharacters, newCharacter];
      setMyCharacters(updated);
      localStorage.setItem(`my_characters_${user.uid}`, JSON.stringify(updated));
      toast.success("캐릭터가 추가되었습니다");
      return newCharacter;
    } catch (error) {
      console.error("Failed to add character:", error);
      toast.error("캐릭터 추가 실패");
    }
  }, [myCharacters]);

  // 캐릭터 수정
  const updateCharacter = useCallback((id: string, updates: Partial<MyCharacter>) => {
    try {
      const savedUser = localStorage.getItem("cosatelier_user");
      if (!savedUser) {
        toast.error("로그인이 필요합니다");
        return;
      }

      const user = JSON.parse(savedUser);
      const updated = myCharacters.map((char) =>
        char.id === id
          ? { ...char, ...updates, updatedAt: Date.now() }
          : char
      );

      setMyCharacters(updated);
      localStorage.setItem(`my_characters_${user.uid}`, JSON.stringify(updated));
      toast.success("캐릭터가 수정되었습니다");
    } catch (error) {
      console.error("Failed to update character:", error);
      toast.error("캐릭터 수정 실패");
    }
  }, [myCharacters]);

  // 캐릭터 삭제
  const deleteCharacter = useCallback((id: string) => {
    try {
      const savedUser = localStorage.getItem("cosatelier_user");
      if (!savedUser) {
        toast.error("로그인이 필요합니다");
        return;
      }

      const user = JSON.parse(savedUser);
      const updated = myCharacters.filter((char) => char.id !== id);

      setMyCharacters(updated);
      localStorage.setItem(`my_characters_${user.uid}`, JSON.stringify(updated));
      toast.success("캐릭터가 삭제되었습니다");
    } catch (error) {
      console.error("Failed to delete character:", error);
      toast.error("캐릭터 삭제 실패");
    }
  }, [myCharacters]);

  // 데이터 내보내기
  const exportData = useCallback(() => {
    try {
      const data = {
        profile,
        characters: myCharacters,
        exportedAt: new Date().toISOString(),
      };

      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cosatelier_backup_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("데이터가 내보내졌습니다");
    } catch (error) {
      console.error("Failed to export data:", error);
      toast.error("데이터 내보내기 실패");
    }
  }, [profile, myCharacters]);

  // 데이터 가져오기
  const importData = useCallback((file: File) => {
    try {
      setLoading(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);

          const savedUser = localStorage.getItem("cosatelier_user");
          if (!savedUser) {
            toast.error("로그인이 필요합니다");
            return;
          }

          const user = JSON.parse(savedUser);

          if (data.profile) {
            const updatedProfile = { ...data.profile, uid: user.uid };
            localStorage.setItem(`profile_${user.uid}`, JSON.stringify(updatedProfile));
            setProfile(updatedProfile);
          }

          if (data.characters) {
            localStorage.setItem(`my_characters_${user.uid}`, JSON.stringify(data.characters));
            setMyCharacters(data.characters);
          }

          toast.success("데이터가 가져와졌습니다");
        } catch (error) {
          console.error("Failed to parse data:", error);
          toast.error("데이터 형식이 올바르지 않습니다");
        } finally {
          setLoading(false);
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("Failed to import data:", error);
      toast.error("데이터 가져오기 실패");
      setLoading(false);
    }
  }, []);

  // 모든 데이터 삭제
  const deleteAllData = useCallback(() => {
    try {
      const savedUser = localStorage.getItem("cosatelier_user");
      if (!savedUser) {
        toast.error("로그인이 필요합니다");
        return;
      }

      const user = JSON.parse(savedUser);
      localStorage.removeItem(`profile_${user.uid}`);
      localStorage.removeItem(`my_characters_${user.uid}`);

      setProfile(null);
      setMyCharacters([]);
      toast.success("모든 데이터가 삭제되었습니다");
    } catch (error) {
      console.error("Failed to delete data:", error);
      toast.error("데이터 삭제 실패");
    }
  }, []);

  return {
    profile,
    myCharacters,
    loading,
    loadProfile,
    saveProfile,
    updateProfilePhoto,
    updateProfileName,
    updateProfileBio,
    loadMyCharacters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    exportData,
    importData,
    deleteAllData,
  };
}
