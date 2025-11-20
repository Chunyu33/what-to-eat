import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FoodItem } from '../types';

interface AngryModeProps {
  isVisible: boolean;
  onReset: (firstFood: FoodItem) => void;
  firstFood: FoodItem;
}

/**
 * 愤怒模式覆盖层组件
 * 当用户连续重试超过最大次数时触发
 */
export const AngryMode: React.FC<AngryModeProps> = ({
  isVisible,
  onReset,
  firstFood,
}) => {
  const handleReset = () => {
    onReset(firstFood);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-red-950 flex items-center justify-center text-center p-6 overflow-hidden"
        >
          {/* 背景纹理 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
          </div>

          {/* 主要内容 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -2, 2, -2, 2, 0],
              opacity: 1 
            }}
            transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
            className="relative z-10 max-w-lg"
          >
            {/* 表情动画 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl mb-6 filter drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]"
            >
              🤬
            </motion.div>
            
            {/* 标题 */}
            <h2 className="text-4xl md:text-6xl font-black text-red-500 mb-4 tracking-tighter border-b-4 border-red-800 pb-4 inline-block">
              嘴这么挑，别吃了！
            </h2>
            
            {/* 错误信息 */}
            <p className="text-red-300/80 text-lg md:text-xl font-mono mt-4">
              SYSTEM ERROR: PICKY_EATER_DETECTED<br/>
              ACTION: 饿着吧
            </p>
            
            {/* 重置按钮 */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleReset}
              className="mt-12 px-8 py-3 bg-transparent border-2 border-red-500/50 text-red-400 rounded-lg hover:bg-red-900/50 hover:text-white hover:border-red-500 transition-all text-sm tracking-widest uppercase cursor-pointer"
            >
              我错了，再给次机会
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};