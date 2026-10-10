import { TimeOfDay } from './utils/timeUtils';

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  description: string;
  color: string;
  timeOfDay?: TimeOfDay[]; // 适合的时间段，不填则表示全天适合
}

export type GameState = 'idle' | 'spinning' | 'won' | 'angry';

/** 历史记录条目：用户确认过的美食快照 */
export interface HistoryRecord {
  id: string;
  name: string;
  emoji: string;
  category: string;
  decidedAt: number; // 决定时的毫秒时间戳
}
