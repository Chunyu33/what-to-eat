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
