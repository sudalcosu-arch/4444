/**
 * MyPageDataTab.tsx — 마이페이지 데이터 관리 탭
 * 데이터 내보내기, 가져오기, 삭제
 */

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Upload, Trash2, AlertCircle } from "lucide-react";

interface MyPageDataTabProps {
  onExport: () => void;
  onImport: (file: File) => void;
  onDeleteAll: () => void;
  loading?: boolean;
}

export default function MyPageDataTab({
  onExport,
  onImport,
  onDeleteAll,
  loading = false,
}: MyPageDataTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      // 같은 파일을 다시 선택할 수 있도록 리셋
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteAll = () => {
    onDeleteAll();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-4">
      {/* 데이터 내보내기 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="isometric-card p-4 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Download size={20} className="text-primary" />
          <h3 className="text-lg font-bold text-white">데이터 내보내기</h3>
        </div>
        <p className="text-sm text-white/60">
          프로필과 캐릭터 정보를 JSON 파일로 다운로드합니다. 백업용으로 사용할 수
          있습니다.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onExport}
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "처리 중..." : "📥 지금 내보내기"}
        </motion.button>
      </motion.div>

      {/* 데이터 가져오기 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="isometric-card p-4 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Upload size={20} className="text-accent" />
          <h3 className="text-lg font-bold text-white">데이터 가져오기</h3>
        </div>
        <p className="text-sm text-white/60">
          이전에 내보낸 JSON 파일을 선택하여 데이터를 복원합니다. 기존 데이터를
          덮어씁니다.
        </p>
        <div
          className="relative p-4 rounded-lg border-2 border-dashed border-accent/50 hover:border-accent transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            <Upload size={24} className="mx-auto mb-2 text-accent/50" />
            <p className="text-sm font-semibold text-white">
              파일을 선택하거나 여기에 드래그하세요
            </p>
            <p className="text-xs text-white/50 mt-1">JSON 파일만 지원합니다</p>
          </div>
        </div>
      </motion.div>

      {/* 데이터 삭제 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="isometric-card p-4 space-y-3 border border-destructive/20"
      >
        <div className="flex items-center gap-2">
          <AlertCircle size={20} className="text-destructive" />
          <h3 className="text-lg font-bold text-white">모든 데이터 삭제</h3>
        </div>
        <p className="text-sm text-white/60">
          프로필과 모든 캐릭터 정보를 영구적으로 삭제합니다. 이 작업은 되돌릴 수
          없습니다.
        </p>

        {!showDeleteConfirm ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full px-4 py-3 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-destructive font-semibold transition-all"
          >
            <Trash2 size={18} className="inline mr-2" />
            데이터 삭제
          </motion.button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-destructive">
              정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeleteAll}
                className="flex-1 px-4 py-2 rounded-lg bg-destructive hover:bg-destructive/90 text-white font-semibold transition-all"
              >
                삭제 확인
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
              >
                취소
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>

      {/* 정보 박스 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-primary/10 rounded-lg border border-primary/20 space-y-2"
      >
        <p className="text-xs font-semibold text-primary">💡 팁</p>
        <ul className="text-xs text-white/70 space-y-1">
          <li>• 정기적으로 데이터를 백업하세요</li>
          <li>• 새 기기에서 사용할 때 데이터를 가져올 수 있습니다</li>
          <li>• 내보낸 파일은 안전한 곳에 보관하세요</li>
        </ul>
      </motion.div>
    </div>
  );
}
