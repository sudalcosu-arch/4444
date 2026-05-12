/**
 * MyPageProfileTab.tsx — 마이페이지 프로필 관리 탭
 * 프로필 사진, 이름, 소개 수정
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Calendar } from "lucide-react";
import { UserProfile } from "@/hooks/useMyPage";
import { cn } from "@/lib/utils";

interface MyPageProfileTabProps {
  profile: UserProfile | null;
  onUpdateName: (name: string) => void;
  onUpdateBio: (bio: string) => void;
  onUpdatePhoto: (photoURL: string) => void;
}

export default function MyPageProfileTab({
  profile,
  onUpdateName,
  onUpdateBio,
  onUpdatePhoto,
}: MyPageProfileTabProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newName, setNewName] = useState(profile?.displayName || "");
  const [newBio, setNewBio] = useState(profile?.bio || "");

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-white/50">로그인이 필요합니다</p>
      </div>
    );
  }

  const handleSaveName = () => {
    if (newName.trim()) {
      onUpdateName(newName);
      setIsEditingName(false);
    }
  };

  const handleSaveBio = () => {
    onUpdateBio(newBio);
    setIsEditingBio(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoURL = event.target?.result as string;
        onUpdatePhoto(photoURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* 프로필 사진 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          {profile.photoURL ? (
            <img
              src={profile.photoURL}
              alt={profile.displayName}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/50"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center border-4 border-primary/50">
              <span className="text-3xl font-bold text-white">
                {profile.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* 사진 변경 버튼 */}
          <label className="absolute bottom-0 right-0 p-2 rounded-full bg-primary hover:bg-primary/90 cursor-pointer transition-colors shadow-lg">
            <Camera size={16} className="text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
      </motion.div>

      {/* 이름 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="isometric-card p-4 space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/70">이름</h3>
          <button
            onClick={() => setIsEditingName(!isEditingName)}
            className="text-xs px-2 py-1 rounded bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
          >
            {isEditingName ? "취소" : "수정"}
          </button>
        </div>

        {isEditingName ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-border/50 text-white focus:outline-none focus:border-primary"
              placeholder="이름 입력"
            />
            <button
              onClick={handleSaveName}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"
            >
              저장
            </button>
          </div>
        ) : (
          <p className="text-lg font-semibold text-white">{profile.displayName}</p>
        )}
      </motion.div>

      {/* 이메일 */}
      {profile.email && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="isometric-card p-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-white/70">이메일</h3>
          </div>
          <p className="text-white break-all">{profile.email}</p>
        </motion.div>
      )}

      {/* 소개 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="isometric-card p-4 space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/70">소개</h3>
          <button
            onClick={() => setIsEditingBio(!isEditingBio)}
            className="text-xs px-2 py-1 rounded bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
          >
            {isEditingBio ? "취소" : "수정"}
          </button>
        </div>

        {isEditingBio ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border/50 text-white focus:outline-none focus:border-primary resize-none"
              placeholder="자신을 소개해주세요"
              rows={3}
            />
            <button
              onClick={handleSaveBio}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"
            >
              저장
            </button>
          </div>
        ) : (
          <p className="text-white/80 whitespace-pre-wrap">
            {newBio || "아직 소개가 없습니다"}
          </p>
        )}
      </motion.div>

      {/* 가입 날짜 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="isometric-card p-4 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-white/70">가입 날짜</h3>
        </div>
        <p className="text-white">{formatDate(profile.createdAt)}</p>
      </motion.div>
    </div>
  );
}
