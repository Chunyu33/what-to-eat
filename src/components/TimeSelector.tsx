import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { TimeOfDay, TIME_OF_DAY_INFO, getCurrentTimeOfDay, formatHourRange } from '../utils/timeUtils';

interface TimeSelectorProps {
  selectedTimeOfDay: TimeOfDay | 'all';
  onTimeOfDayChange: (timeOfDay: TimeOfDay | 'all') => void;
}

/**
 * 时间段下拉选择器组件
 * 菜单里会显示每个时段的决策窗口（时间区间）
 */
export const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTimeOfDay,
  onTimeOfDayChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTimeOfDay = getCurrentTimeOfDay();

  // 获取显示文本和样式
  const getDisplayInfo = () => {
    if (selectedTimeOfDay === 'all') {
      return {
        emoji: '🍽️',
        name: '全天',
        color: 'bg-gradient-to-r from-orange-400 to-rose-400 text-white'
      };
    }
    const timeInfo = TIME_OF_DAY_INFO[selectedTimeOfDay];
    return {
      emoji: timeInfo.emoji,
      name: timeInfo.name,
      color: timeInfo.color
    };
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (timeOfDay: TimeOfDay | 'all') => {
    onTimeOfDayChange(timeOfDay);
    setIsOpen(false);
  };

  const displayInfo = getDisplayInfo();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 选择器按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md ${displayInfo.color} border`}
      >
        <Clock size={16} />
        <span className="text-base">{displayInfo.emoji}</span>
        <span>{displayInfo.name}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 下拉菜单：菜单项右侧显示决策窗口，窄屏靠 max-h + 滚动保证可用 */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[17rem] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-50 overflow-hidden">
          <div className="max-h-[60vh] overflow-y-auto">
            {/* 全天选项 */}
            <button
              onClick={() => handleSelect('all')}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                selectedTimeOfDay === 'all'
                  ? 'bg-gradient-to-r from-orange-50 to-rose-50 dark:from-orange-900/20 dark:to-rose-900/20 text-orange-700 dark:text-orange-300'
                  : 'hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-base flex-shrink-0">🍽️</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium flex items-center gap-2">
                  <span>全天</span>
                  <span className="ml-auto text-[11px] tabular-nums opacity-70 flex-shrink-0">不限时段</span>
                </div>
                <div className="text-xs opacity-75">显示所有美食</div>
              </div>
            </button>

            {/* 时间段选项 */}
            {Object.values(TIME_OF_DAY_INFO).map((timeInfo) => (
              <button
                key={timeInfo.id}
                onClick={() => handleSelect(timeInfo.id)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                  selectedTimeOfDay === timeInfo.id
                    ? `${timeInfo.color} bg-opacity-20 dark:bg-opacity-30`
                    : 'hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-base flex-shrink-0">{timeInfo.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium flex items-center gap-2">
                    <span>{timeInfo.name}</span>
                    {currentTimeOfDay === timeInfo.id && (
                      <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        当前
                      </span>
                    )}
                    <span className="ml-auto text-[11px] tabular-nums opacity-70 flex-shrink-0">
                      {formatHourRange(timeInfo.hourRange)}
                    </span>
                  </div>
                  <div className="text-xs opacity-75">{timeInfo.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
