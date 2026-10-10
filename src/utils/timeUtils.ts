/**
 * 时间段相关工具函数
 *
 * ⚠️ 这里的区间是「决策窗口」，不是「用餐时间」。
 * 这个工具是让人**提前**决定吃什么的，所以时段边界要比饭点提前：
 * 比如早上窗口到 9:00 就结束（再晚你该想的是午饭了），而不是拖到 11:00。
 * 改边界时请对照「决策窗口」语义，不要直接对准饭点。
 */

export const TimeOfDay = {
  MORNING: 'morning',      // 早上 5:00-9:00，决定早餐
  NOON: 'noon',           // 中午 9:00-12:00，决定午餐
  AFTERNOON_TEA: 'afternoon_tea', // 下午茶 12:00-15:00，决定下午茶
  EVENING: 'evening',     // 晚上 15:00-20:00，决定晚餐
  LATE_NIGHT: 'late_night' // 宵夜 20:00-5:00，决定宵夜
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
    hourRange: [5, 9] as [number, number]
  },
  [TimeOfDay.NOON]: {
    id: TimeOfDay.NOON,
    name: '中午',
    emoji: '☀️',
    description: '午饭该定下来了',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    hourRange: [9, 12] as [number, number]
  },
  [TimeOfDay.AFTERNOON_TEA]: {
    id: TimeOfDay.AFTERNOON_TEA,
    name: '下午茶',
    emoji: '🍰',
    description: '茶歇时光，放松一下',
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    hourRange: [12, 15] as [number, number]
  },
  [TimeOfDay.EVENING]: {
    id: TimeOfDay.EVENING,
    name: '晚上',
    emoji: '🌙',
    description: '晚饭该定下来了',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    hourRange: [15, 20] as [number, number]
  },
  [TimeOfDay.LATE_NIGHT]: {
    id: TimeOfDay.LATE_NIGHT,
    name: '宵夜',
    emoji: '🌃',
    description: '夜深了，来点宵夜',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    hourRange: [20, 5] as [number, number]
  }
} as const;

/**
 * 获取当前时间段（按决策窗口划分）
 */
export const getCurrentTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 9) return TimeOfDay.MORNING;
  if (hour >= 9 && hour < 12) return TimeOfDay.NOON;
  if (hour >= 12 && hour < 15) return TimeOfDay.AFTERNOON_TEA;
  if (hour >= 15 && hour < 20) return TimeOfDay.EVENING;
  return TimeOfDay.LATE_NIGHT;
};

/**
 * 把时段区间格式化成 "05:00 - 09:00"，跨天的宵夜会显示成 "20:00 - 05:00"
 */
export const formatHourRange = (range: readonly [number, number]): string => {
  const format = (hour: number) => `${String(hour).padStart(2, '0')}:00`;
  return `${format(range[0])} - ${format(range[1])}`;
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
