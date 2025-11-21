import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Utensils, RefreshCw } from 'lucide-react';
import type { GameState } from '../types';

interface ActionButtonProps {
  gameState: GameState;
  onStart: () => void;
  isConfettiActive?: boolean;
}

/**
 * 主要操作按钮组件
 * 用于触发随机选择美食
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  gameState,
  onStart,
  isConfettiActive = false,
}) => {
  // 添加移动端触摸处理
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTouching = useRef(false);
  
  // 处理移动端触摸事件
  const handleTouchStart = () => {
    isTouching.current = true;
    // 不在这里调用 preventDefault，避免 passive event listener 错误
  };
  
  const handleTouchEnd = () => {
    if (isTouching.current && gameState !== 'spinning' && !isConfettiActive) {
      isTouching.current = false;
      // 确保在触摸结束后才触发点击
      onStart();
    }
  };

  // 处理点击事件
  const handleClick = (e: React.MouseEvent) => {
    // 只在需要时才调用 preventDefault
    if (gameState === 'spinning' || isConfettiActive) {
      e.preventDefault();
      return;
    }
    onStart();
  };

  const getButtonText = () => {
    if (isConfettiActive) {
      return '庆祝中...';
    }
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
    if (isConfettiActive) {
      return <RefreshCw className="animate-spin" />;
    }
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
        ref={buttonRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disabled={gameState === 'spinning' || isConfettiActive}
        className={`shadow-xl shadow-orange-500/30 dark:shadow-orange-500/10 bg-gradient-to-r text-white text-xl font-black py-4 px-16 rounded-full flex items-center gap-3 transition-all ring-4 ring-white dark:ring-slate-800 ${
          isConfettiActive || gameState === 'spinning' 
            ? 'from-gray-400 to-gray-500 disabled:opacity-60 disabled:cursor-not-allowed' 
            : 'from-orange-500 to-rose-500 hover:shadow-orange-500/40 disabled:opacity-80 disabled:cursor-not-allowed'
        }`}
        style={{ touchAction: 'manipulation' }} // 优化移动端触摸
      >
        {getButtonIcon()}
        {getButtonText()}
      </motion.button>
    </div>
  );
};