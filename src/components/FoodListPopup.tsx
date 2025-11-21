import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { FoodCard } from './FoodCard';
import type { FoodItem } from '../types';

interface FoodListPopupProps {
  isOpen: boolean;
  filteredFood: FoodItem[];
  searchTerm: string;
  winnerId: string | null;
  onClose: () => void;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

/**
 * 美食库弹窗组件
 * 显示所有可选择的美食，支持搜索功能
 */
export const FoodListPopup: React.FC<FoodListPopupProps> = ({
  isOpen,
  filteredFood,
  searchTerm,
  winnerId,
  onClose,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-slate-900 w-full max-h-[70vh] rounded-t-3xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 拖拽指示条 */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            
            {/* 头部 */}
            <div className="px-6 pb-4 border-b border-gray-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Search size={18} />
                  美食库 ({filteredFood.length})
                </h3>
                
                {/* 关闭按钮 */}
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 搜索栏 */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="搜索美食..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 text-sm rounded-full pl-10 pr-10 py-3 border-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/50 transition-all"
                />
                {searchTerm && (
                  <button 
                    onClick={onClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* 美食列表 */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {filteredFood.length > 0 ? (
                  filteredFood.map((item) => (
                    <FoodCard 
                      key={item.id} 
                      item={item} 
                      variant="list"
                      isHighlighted={winnerId === item.id}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                    未找到相关美食，换个词试试？
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};