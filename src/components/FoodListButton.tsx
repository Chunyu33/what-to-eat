import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface FoodListButtonProps {
  filteredCount: number;
  onOpen: () => void;
}

/**
 * 美食库触发按钮组件
 * 点击后弹出美食库弹窗
 */
export const FoodListButton: React.FC<FoodListButtonProps> = ({
  filteredCount,
  onOpen,
}) => {
  return (
    <div className="flex-none p-4 flex justify-center z-30">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-orange-200 dark:border-slate-700 text-orange-600 dark:text-orange-400 font-medium py-2 px-6 rounded-full flex items-center gap-2 transition-all hover:bg-orange-50 dark:hover:bg-slate-700"
      >
        <Search size={16} />
        美食库 ({filteredCount})
      </motion.button>
    </div>
  );
};