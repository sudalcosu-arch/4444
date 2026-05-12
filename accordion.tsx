/**
 * MyPageCharacterTab.tsx — 마이페이지 캐릭터 관리 탭
 * 내 캐릭터 목록, 수정, 삭제
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Edit2, Plus, CheckCircle2 } from "lucide-react";
import { MyCharacter } from "@/hooks/useMyPage";
import { cn } from "@/lib/utils";

interface MyPageCharacterTabProps {
  characters: MyCharacter[];
  onAddCharacter: () => void;
  onUpdateCharacter: (id: string, updates: Partial<MyCharacter>) => void;
  onDeleteCharacter: (id: string) => void;
}

export default function MyPageCharacterTab({
  characters,
  onAddCharacter,
  onUpdateCharacter,
  onDeleteCharacter,
}: MyPageCharacterTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSeries, setEditSeries] = useState("");

  const handleEdit = (character: MyCharacter) => {
    setEditingId(character.id);
    setEditName(character.name);
    setEditSeries(character.series);
  };

  const handleSave = (id: string) => {
    if (editName.trim()) {
      onUpdateCharacter(id, {
        name: editName,
        series: editSeries,
      });
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditSeries("");
  };

  return (
    <div className="space-y-4">
      {/* 캐릭터 추가 버튼 */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddCharacter}
        className="w-full p-4 rounded-lg border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-semibold text-primary"
      >
        <Plus size={20} />
        새 캐릭터 추가
      </motion.button>

      {/* 캐릭터 목록 */}
      {characters.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-white/50">아직 추가한 캐릭터가 없습니다</p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="isometric-card p-4 space-y-3"
              >
                {editingId === character.id ? (
                  // 수정 모드
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-white/50 font-semibold">
                        캐릭터명
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border/50 text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 font-semibold">
                        작품명
                      </label>
                      <input
                        type="text"
                        value={editSeries}
                        onChange={(e) => setEditSeries(e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border/50 text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(character.id)}
                        className="flex-1 px-3 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  // 표시 모드
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white">
                          {character.name}
                        </h4>
                        <p className="text-sm text-white/60">{character.series}</p>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(character)}
                          className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                        >
                          <Edit2 size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onDeleteCharacter(character.id)}
                          className="p-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>

                    {/* 진행률 바 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">진행률</span>
                        <span className="text-xs font-semibold text-primary">
                          {character.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${character.progress}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </div>

                    {/* 체크리스트 요약 */}
                    {character.checklist.length > 0 && (
                      <div className="pt-2 border-t border-border/20">
                        <p className="text-xs text-white/50 mb-2">
                          체크리스트 ({character.checklist.filter((c) => c.completed).length}/
                          {character.checklist.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {character.checklist.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className={cn(
                                "flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold",
                                item.completed
                                  ? "bg-primary/20 text-primary"
                                  : "bg-white/10 text-white/60"
                              )}
                            >
                              {item.completed && <CheckCircle2 size={12} />}
                              {item.name}
                            </div>
                          ))}
                          {character.checklist.length > 3 && (
                            <div className="px-2 py-1 text-xs text-white/50">
                              +{character.checklist.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
