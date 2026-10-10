import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, RefreshCw, Check } from 'lucide-react';
import type { GameState } from '../types';

interface ActionButtonProps {
  gameState: GameState;
  onStart: () => void;
  onConfirm: () => void;
}

/**
 * 操作按钮区
 * 主按钮随状态切换（开始随机 / 挑选中 / 换一个），
 * 次按钮提供"就这个了"这个正向出口——满意时不用再靠"换一个"硬撑
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  gameState,
  onStart,
  onConfirm,
}) => {
  const isSpinning = gameState === 'spinning';

  // 主按钮的文案与图标
  const getPrimaryContent = () => {
    switch (gameState) {
      case 'spinning':
        return { text: '挑选...', icon: <RefreshCw className="animate-spin" /> };
      case 'won':
        return { text: '换一个', icon: <Utensils className="animate-bounce" /> };
      default:
        return { text: '开始随机', icon: <Utensils className="animate-bounce" /> };
    }
  };

  const primary = getPrimaryContent();
  // 只有已经抽出结果（或初始预览）时才引导用户"就这个了"
  const showConfirm = gameState === 'idle' || gameState === 'won';

  return (
    <div className="flex-none p-6 pb-8 flex flex-wrap items-center justify-center gap-3 z-30">
      <motion.button
        whileHover={isSpinning ? undefined : { scale: 1.05 }}
        whileTap={isSpinning ? undefined : { scale: 0.95 }}
        onClick={onStart}
        disabled={isSpinning}
        className={`shadow-xl shadow-orange-500/30 dark:shadow-orange-500/10 bg-gradient-to-r text-white text-xl font-black py-4 px-14 rounded-full flex items-center gap-3 transition-all ring-4 ring-white dark:ring-slate-800 ${
          isSpinning
            ? 'from-gray-400 to-gray-500 disabled:opacity-60 disabled:cursor-not-allowed'
            : 'from-orange-500 to-rose-500 hover:shadow-orange-500/40 disabled:opacity-80 disabled:cursor-not-allowed'
        }`}
        style={{ touchAction: 'manipulation' }} // 优化移动端触摸
      >
        {primary.icon}
        {primary.text}
      </motion.button>

      {/* 正向出口：抽到满意的直接定下来 */}
      {showConfirm && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConfirm}
          className="py-3.5 px-7 rounded-full font-bold text-orange-600 dark:text-orange-400 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-2 border-orange-300 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
          style={{ touchAction: 'manipulation' }}
        >
          <Check size={18} />
          就这个了
        </motion.button>
      )}
    </div>
  );
};
