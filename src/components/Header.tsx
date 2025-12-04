import React from 'react';
import { Utensils, Moon, Sun, Zap } from 'lucide-react';
import { TimeDisplay } from './TimeDisplay';
import { TimeSelector } from './TimeSelector';
import { TimeOfDay } from '../utils/timeUtils';

interface HeaderProps {
  isDarkMode: boolean;
  retryCount: number;
  maxRetries: number;
  selectedTimeOfDay: TimeOfDay | 'all';
  onToggleDarkMode: () => void;
  onTimeOfDayChange: (timeOfDay: TimeOfDay | 'all') => void;
}

/**
 * 应用顶部导航栏组件
 * 包含应用标题、时间段选择器、主题切换按钮和重试次数显示
 */
export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  retryCount,
  maxRetries,
  selectedTimeOfDay,
  onToggleDarkMode,
  onTimeOfDayChange,
}) => {
  return (
    <header className="flex-none px-4 py-3 flex items-center justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm sticky top-0 z-30 border-b border-orange-100/50 dark:border-slate-700/50 transition-colors">
      {/* 应用标题 - 手机端隐藏 */}
      <div className="flex items-center gap-2 hidden md:flex">
        <div className="bg-orange-500 text-white p-1.5 rounded-lg shadow-md shadow-orange-500/20">
          <Utensils size={20} />
        </div>
        <span className="font-bold text-lg tracking-tight text-gray-800 dark:text-white">今天吃什么</span>
      </div>

      {/* 中间时间段选择器 */}
      <TimeSelector
        selectedTimeOfDay={selectedTimeOfDay}
        onTimeOfDayChange={onTimeOfDayChange}
      />

      {/* 右侧按钮组 */}
      <div className="flex items-center gap-3">
        {/* 时间段显示 */}
        <TimeDisplay />
        
        {/* 主题切换按钮 */}
        <button 
          onClick={onToggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        {/* 重试次数显示 */}
        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800/30">
          <Zap size={12} className="fill-current" />
          <span>{retryCount}/{maxRetries}</span>
        </div>
      </div>
    </header>
  );
};