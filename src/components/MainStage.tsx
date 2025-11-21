import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoodCard } from './FoodCard';
import type { FoodItem, GameState } from '../types';

interface MainStageProps {
  displayItem: FoodItem | null;
  gameState: GameState;
}

/**
 * 主舞台区域组件
 * 显示当前选中的美食卡片和状态文字
 */
export const MainStage: React.FC<MainStageProps> = ({
  displayItem,
  gameState,
}) => {
  // 添加一个key来强制重新渲染，解决移动端缓存问题
  const [renderKey, setRenderKey] = useState(0);
  
  // 当gameState变为'won'时强制重新渲染
  useEffect(() => {
    if (gameState === 'won') {
      setRenderKey(prev => prev + 1);
    }
  }, [gameState]);

  return (
    <main key={renderKey} className="flex-1 flex flex-col items-center justify-center p-4 min-h-[350px] relative">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* 中央卡片区域 */}
      <div className="relative z-10 w-full max-w-md mx-auto perspective-1000">
        <AnimatePresence mode="wait">
          {displayItem && (
            <FoodCard 
              key={`${gameState === 'spinning' ? displayItem.id + Math.random() : displayItem.id}-${renderKey}`} 
              item={displayItem} 
              variant="hero" 
            />
          )}
        </AnimatePresence>

        {/* 状态文字 */}
        <motion.div 
          key={`status-${renderKey}`}
          className="text-center mt-8 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {gameState === 'idle' && <p className="text-gray-400 dark:text-gray-500 font-medium">准备好开始了吗？</p>}
          {gameState === 'spinning' && <p className="text-orange-500 font-bold animate-pulse">正在纠结中...</p>}
          {gameState === 'won' && <p className="text-green-600 dark:text-green-400 font-bold text-lg">就决定是它了！</p>}
        </motion.div>
      </div>
    </main>
  );
};