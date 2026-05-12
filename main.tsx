/**
 * useImageUpload.ts — 이미지 업로드 및 Base64 변환
 * 사진을 Base64로 변환하여 localStorage에 저장
 */

import { useState } from "react";
import { toast } from "sonner";

interface UploadResult {
  base64: string;
  name: string;
  size: number;
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = (file: File): Promise<UploadResult | null> => {
    return new Promise((resolve) => {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("파일 크기는 5MB 이하여야 합니다");
        resolve(null);
        return;
      }

      // 이미지 파일 확인
      if (!file.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드 가능합니다");
        resolve(null);
        return;
      }

      setIsUploading(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setIsUploading(false);
        resolve({
          base64,
          name: file.name,
          size: file.size,
        });
      };
      reader.onerror = () => {
        toast.error("이미지 업로드에 실패했습니다");
        setIsUploading(false);
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  };

  return { uploadImage, isUploading };
}
