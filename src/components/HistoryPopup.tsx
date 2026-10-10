import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, X } from 'lucide-react';
import { formatRelativeTime } from '../utils/formatTime';
import type { HistoryRecord } from '../types';

interface HistoryPopupProps {
  isOpen: boolean;
  history: HistoryRecord[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

/**
 * 历史记录弹窗
 * 展示用户"就这个了"确认过的美食，支持单条删除和清空全部
 */
export const HistoryPopup: React.FC<HistoryPopupProps> = ({
  isOpen,
  history,
  onClose,
  onRemove,
  onClear,
}) => {
  // "清空全部"的两段式确认状态，避免误触
  const [confirmClear, setConfirmClear] = useState(false);

  // 3 秒内没有再次点击则取消确认
  useEffect(() => {
    if (!confirmClear) return;
    const timer = window.setTimeout(() => setConfirmClear(false), 3000);
    return () => window.clearTimeout(timer);
  }, [confirmClear]);

  // 关闭弹窗前重置确认状态
  const handleClose = () => {
    setConfirmClear(false);
    onClose();
  };

  const handleClearClick = () => {
    if (confirmClear) {
      onClear();
      setConfirmClear(false);
      return;
    }
    setConfirmClear(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-end justify-center"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[70vh] rounded-t-3xl shadow-2xl flex flex-col"
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
                  <History size={18} />
                  最近决定 ({history.length})
                </h3>

                <button
                  onClick={handleClose}
                  aria-label="关闭"
                  className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 记录列表 */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {history.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {history.map((record) => (
                    <li
                      key={record.id}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/60 hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-2xl flex-shrink-0">{record.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-gray-700 dark:text-gray-200 truncate">
                          {record.name}
                        </div>
                        <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                          {record.category} · {formatRelativeTime(record.decidedAt)}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(record.id)}
                        aria-label={`删除 ${record.name}`}
                        className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-16 text-center text-gray-400 dark:text-gray-500 text-sm">
                  还没有决定过什么，抽一个试试吧
                </div>
              )}
            </div>

            {/* 底部操作 */}
            {history.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={handleClearClick}
                  className={`w-full py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    confirmClear
                      ? 'text-white bg-red-500 hover:bg-red-600'
                      : 'text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  <Trash2 size={16} />
                  {confirmClear ? '再点一次确认清空' : '清空全部记录'}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
