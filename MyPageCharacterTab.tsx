/**
 * IsometricMockup Component
 * 아이소메트릭 스타일 3D 모바일 목업
 */

import { motion } from 'framer-motion';

export function IsometricMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-3d">
      {/* 배경 그래디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 rounded-3xl blur-3xl" />

      {/* 3D 모바일 목업 컨테이너 */}
      <div className="relative w-full max-w-2xl h-96 transform-3d">
        {/* 첫 번째 폰 (뒤쪽) */}
        <motion.div
          initial={{ opacity: 0, rotateX: 20, rotateY: -20, z: -50 }}
          animate={{ opacity: 1, rotateX: 5, rotateY: -15, z: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-64 rounded-3xl bg-gradient-to-br from-card to-card/50 border-2 border-primary/30 shadow-2xl"
          style={{
            transform: 'perspective(1200px) rotateX(5deg) rotateY(-15deg) rotateZ(-5deg) translateZ(-50px)',
          }}
        >
          {/* 폰 화면 */}
          <div className="w-full h-full rounded-2xl bg-gradient-to-b from-primary/20 to-primary/5 p-4 flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-white/60 mb-2">CosAtelier</div>
            <div className="w-12 h-12 rounded-full bg-accent/30 mb-3" />
            <div className="space-y-2 w-full">
              <div className="h-2 bg-accent/20 rounded-full w-3/4 mx-auto" />
              <div className="h-2 bg-accent/20 rounded-full w-1/2 mx-auto" />
            </div>
          </div>
        </motion.div>

        {/* 두 번째 폰 (중간) */}
        <motion.div
          initial={{ opacity: 0, rotateX: 10, rotateY: 0, z: 0 }}
          animate={{ opacity: 1, rotateX: 2, rotateY: 0, z: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-72 rounded-3xl bg-gradient-to-br from-card to-card/50 border-2 border-primary/40 shadow-2xl"
          style={{
            transform: 'perspective(1200px) rotateX(2deg) rotateY(0deg) rotateZ(0deg)',
          }}
        >
          {/* 폰 화면 */}
          <div className="w-full h-full rounded-2xl bg-gradient-to-b from-primary/30 to-primary/10 p-5 flex flex-col items-center justify-center">
            <div className="text-sm font-bold text-white/80 mb-3">홈</div>
            <div className="w-16 h-16 rounded-full bg-accent/40 mb-4 animate-pulse-glow" />
            <div className="space-y-2 w-full px-2">
              <div className="h-2 bg-accent/30 rounded-full w-full" />
              <div className="h-2 bg-accent/30 rounded-full w-4/5 mx-auto" />
              <div className="h-2 bg-accent/30 rounded-full w-3/4 mx-auto" />
            </div>
          </div>
        </motion.div>

        {/* 세 번째 폰 (앞쪽) */}
        <motion.div
          initial={{ opacity: 0, rotateX: -10, rotateY: 20, z: 50 }}
          animate={{ opacity: 1, rotateX: -2, rotateY: 15, z: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-64 rounded-3xl bg-gradient-to-br from-card to-card/50 border-2 border-primary/30 shadow-2xl"
          style={{
            transform: 'perspective(1200px) rotateX(-2deg) rotateY(15deg) rotateZ(5deg) translateZ(50px)',
          }}
        >
          {/* 폰 화면 */}
          <div className="w-full h-full rounded-2xl bg-gradient-to-b from-primary/25 to-primary/5 p-4 flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-white/60 mb-2">기능</div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="h-8 bg-accent/25 rounded-lg" />
              <div className="h-8 bg-accent/25 rounded-lg" />
              <div className="h-8 bg-accent/25 rounded-lg" />
              <div className="h-8 bg-accent/25 rounded-lg" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 바닥 그림자 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-gradient-to-t from-primary/20 to-transparent blur-3xl rounded-full" />
    </div>
  );
}

export default IsometricMockup;
