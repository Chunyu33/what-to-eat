import React from 'react';
import { getCurrentTimeOfDay, TIME_OF_DAY_INFO } from '../utils/timeUtils';

/**
 * 当前时间段显示组件
 * 显示当前是早餐、中午、下午茶、晚上还是宵夜
 */
export const TimeDisplay: React.FC = () => {
  const currentTimeOfDay = getCurrentTimeOfDay();
  const timeInfo = TIME_OF_DAY_INFO[currentTimeOfDay];

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${timeInfo.color} border`}>
      <span className="text-base">{timeInfo.emoji}</span>
      <span>{timeInfo.name}</span>
    </div>
  );
};