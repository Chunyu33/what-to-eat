export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  description: string;
  color: string;
}

export type GameState = 'idle' | 'spinning' | 'won' | 'angry';
