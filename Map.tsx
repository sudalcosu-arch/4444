/**
 * ImageUploadInput.tsx — 이미지 업로드 입력 컴포넌트
 * 드래그 앤 드롭 또는 클릭으로 이미지 업로드
 */

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useImageUpload } from "@/hooks/useImageUpload";
import { cn } from "@/lib/utils";

interface ImageUploadInputProps {
  onImageUpload: (base64: string) => void;
  previewImage?: string;
  onRemoveImage?: () => void;
  label?: string;
  className?: string;
}

export default function ImageUploadInput({
  onImageUpload,
  previewImage,
  onRemoveImage,
  label = "사진 추가",
  className,
}: ImageUploadInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading } = useImageUpload();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const result = await uploadImage(files[0]);
      if (result) {
        onImageUpload(result.base64);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const result = await uploadImage(files[0]);
      if (result) {
        onImageUpload(result.base64);
      }
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {previewImage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg border border-border/50"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={onRemoveImage}
            className="absolute top-2 right-2 bg-destructive/90 hover:bg-destructive text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
          />

          <motion.div
            animate={{ y: isDragging ? -5 : 0 }}
            className="flex flex-col items-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-white/60">업로드 중...</p>
              </>
            ) : (
              <>
                <Upload size={24} className="text-primary" />
                <div>
                  <p className="font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/50">또는 드래그해서 놓기</p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
