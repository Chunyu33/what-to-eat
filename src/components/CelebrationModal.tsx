import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Check, RotateCcw, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { FoodItem } from '../types';

interface CelebrationModalProps {
  isOpen: boolean;
  item: FoodItem | null;
  /** 本次打开时随机抽中的夸奖话术 */
  praise: string;
  isCopied: boolean;
  onClose: () => void;
  onShare: () => void;
  onSpinAgain: () => void;
}

/**
 * 庆祝弹窗
 * 点了"就这个了"之后弹出，承载庆祝动画和分享入口
 */
export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  item,
  praise,
  isCopied,
  onClose,
  onShare,
  onSpinAgain,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 打开时把焦点移进弹窗，并支持 Esc 关闭
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="celebration-title"
            initial={{ scale: 0.7, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border-4 border-orange-200 dark:border-slate-700 shadow-2xl px-8 py-10 text-center overflow-hidden"
          >
            {/* 顶部光晕装饰 */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-300/40 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* 关闭按钮 */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="关闭"
              className="absolute top-3 right-3 z-20 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 flex flex-col items-center">
              {/* 大 emoji：先弹出来，再持续轻微上下浮动 */}
              <motion.div
                initial={{ scale: 0, rotate: -35 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.08 }}
                className="text-7xl mb-5"
              >
                <motion.span
                  className="inline-block filter drop-shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                  {item.emoji}
                </motion.span>
              </motion.div>

              <motion.h2
                id="celebration-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="text-2xl font-black text-orange-500 mb-2"
              >
                就吃它了！
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="flex flex-col items-center"
              >
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {item.name}
                </p>
                <span
                  className={twMerge(
                    'mt-2 px-3 py-1 rounded-full text-xs font-bold',
                    item.color,
                    'dark:bg-opacity-20 dark:border dark:border-opacity-20'
                  )}
                >
                  {item.category}
                </span>
                <p className="mt-4 text-sm font-medium text-orange-500/90 dark:text-orange-400/90">
                  {praise}
                </p>
              </motion.div>

              {/* 操作按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full mt-8 flex flex-col gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onShare}
                  className="w-full py-3.5 rounded-full font-bold text-white text-lg bg-gradient-to-r from-orange-500 to-rose-500 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow flex items-center justify-center gap-2"
                  style={{ touchAction: 'manipulation' }}
                >
                  {isCopied ? <Check size={20} /> : <Share2 size={20} />}
                  {isCopied ? '已复制！' : '复制分享'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onSpinAgain}
                  className="w-full py-3 rounded-full font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800 border-2 border-orange-200 dark:border-slate-700 hover:bg-orange-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                  style={{ touchAction: 'manipulation' }}
                >
                  <RotateCcw size={18} />
                  再抽一次
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
