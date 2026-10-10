import React from 'react';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';

interface HistoryButtonProps {
  count: number;
  onOpen: () => void;
}

/**
 * 历史记录入口按钮
 * 没有记录时置灰禁点
 */
export const HistoryButton: React.FC<HistoryButtonProps> = ({ count, onOpen }) => {
  const isEmpty = count === 0;

  return (
    <motion.button
      whileHover={isEmpty ? undefined : { scale: 1.05 }}
      whileTap={isEmpty ? undefined : { scale: 0.95 }}
      onClick={onOpen}
      disabled={isEmpty}
      className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-orange-200 dark:border-slate-700 text-orange-600 dark:text-orange-400 font-medium py-2 px-6 rounded-full flex items-center gap-2 transition-all ${
        isEmpty ? 'opacity-40 cursor-not-allowed' : 'hover:bg-orange-50 dark:hover:bg-slate-700'
      }`}
    >
      <History size={16} />
      {isEmpty ? '最近' : `最近 (${count})`}
    </motion.button>
  );
};
