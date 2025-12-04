/**
 * 时间段相关工具函数
 */

export const TimeOfDay = {
  MORNING: 'morning',      // 早餐 (6:00-11:00)
  NOON: 'noon',           // 中午 (11:00-14:00)
  AFTERNOON_TEA: 'afternoon_tea', // 下午茶 (14:00-17:00)
  EVENING: 'evening',     // 晚上 (17:00-21:00)
  LATE_NIGHT: 'late_night' // 宵夜 (21:00-6:00)
} as const;

export type TimeOfDay = typeof TimeOfDay[keyof typeof TimeOfDay];

export interface TimeOfDayInfo {
  id: TimeOfDay;
  name: string;
  emoji: string;
  description: string;
  color: string;
  hourRange: [number, number];
}

export const TIME_OF_DAY_INFO = {
  [TimeOfDay.MORNING]: {
    id: TimeOfDay.MORNING,
    name: '早上',
    emoji: '🌅',
    description: '美好的一天从早餐开始',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    hourRange: [6, 11] as [number, number]
  },
  [TimeOfDay.NOON]: {
    id: TimeOfDay.NOON,
    name: '中午',
    emoji: '☀️',
    description: '午餐时间，补充能量',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    hourRange: [11, 14] as [number, number]
  },
  [TimeOfDay.AFTERNOON_TEA]: {
    id: TimeOfDay.AFTERNOON_TEA,
    name: '下午茶',
    emoji: '🍰',
    description: '茶歇时光，放松一下',
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    hourRange: [14, 17] as [number, number]
  },
  [TimeOfDay.EVENING]: {
    id: TimeOfDay.EVENING,
    name: '晚上',
    emoji: '🌙',
    description: '晚餐时刻，享受美味',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    hourRange: [17, 21] as [number, number]
  },
  [TimeOfDay.LATE_NIGHT]: {
    id: TimeOfDay.LATE_NIGHT,
    name: '宵夜',
    emoji: '🌃',
    description: '夜深了，来点宵夜',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    hourRange: [21, 6] as [number, number]
  }
} as const;

/**
 * 获取当前时间段
 */
export const getCurrentTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 11) return TimeOfDay.MORNING;
  if (hour >= 11 && hour < 14) return TimeOfDay.NOON;
  if (hour >= 14 && hour < 17) return TimeOfDay.AFTERNOON_TEA;
  if (hour >= 17 && hour < 21) return TimeOfDay.EVENING;
  return TimeOfDay.LATE_NIGHT;
};

/**
 * 根据时间段获取对应的美食数据
 */
export const getFoodByTimeOfDay = <T extends { timeOfDay?: TimeOfDay[] }>(
  foods: T[],
  timeOfDay?: TimeOfDay
): T[] => {
  const targetTimeOfDay = timeOfDay || getCurrentTimeOfDay();
  
  return foods.filter(food => 
    !food.timeOfDay || food.timeOfDay.includes(targetTimeOfDay)
  );
};