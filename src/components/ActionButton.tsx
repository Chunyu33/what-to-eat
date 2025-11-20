import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, RefreshCw } from 'lucide-react';
import type { GameState } from '../types';

interface ActionButtonProps {
  gameState: GameState;
  onStart: () => void;
}

/**
 * 主要操作按钮组件
 * 用于触发随机选择美食
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  gameState,
  onStart,
}) => {
  const getButtonText = () => {
    switch (gameState) {
      case 'idle':
        return '开始随机';
      case 'spinning':
        return '挑选...';
      case 'won':
        return '换一个';
      default:
        return '开始随机';
    }
  };

  const getButtonIcon = () => {
    switch (gameState) {
      case 'spinning':
        return <RefreshCw className="animate-spin" />;
      default:
        return <Utensils className="animate-bounce" />;
    }
  };

  return (
    <div className="flex-none p-6 flex justify-center z-30 pb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        disabled={gameState === 'spinning'}
        className="shadow-xl shadow-orange-500/30 dark:shadow-orange-500/10 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xl font-black py-4 px-16 rounded-full flex items-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed transition-all ring-4 ring-white dark:ring-slate-800"
      >
        {getButtonIcon()}
        {getButtonText()}
      </motion.button>
    </div>
  );
};