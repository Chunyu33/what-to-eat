import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  /** 提示文案，为空则不显示 */
  text?: string | null;
  /** 是否显示 */
  isVisible: boolean;
}

/**
 * 轻提示组件（可复用）
 * 固定在顶部导航栏下方居中，不遮挡主操作区；pointer-events-none 保证不挡点击
 */
export const Toast: React.FC<ToastProps> = ({ text, isVisible }) => {
  return (
    <div className="fixed top-20 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none">
      <AnimatePresence>
        {isVisible && text && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            role="status"
            aria-live="polite"
            className="max-w-full px-5 py-3 rounded-full bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 shadow-lg text-sm font-medium text-gray-700 dark:text-gray-200 text-center"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
