import { useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import type { GameState, FoodItem } from '../types';
import { FOOD_DATA } from '../data';

interface UseFoodSpinnerProps {
  retryCount: number;
  maxRetries: number;
  onGameStateChange: (state: GameState) => void;
  onWinnerChange: (winnerId: string | null) => void;
  onDisplayItemChange: (item: FoodItem) => void;
  onRetryCountChange: (count: number) => void;
  onSearchClear: () => void;
}

/**
 * 美食随机选择逻辑 Hook
 * 处理随机选择美食的核心逻辑和动画
 */
export const useFoodSpinner = ({
  retryCount,
  maxRetries,
  onGameStateChange,
  onWinnerChange,
  onDisplayItemChange,
  onRetryCountChange,
  onSearchClear,
}: UseFoodSpinnerProps) => {
  const timeoutRef = useRef<number | null>(null);

  /**
   * 开始随机选择美食
   */
  const handleStart = useCallback(() => {
    // 检查是否超过最大重试次数
    if (retryCount >= maxRetries) {
      onGameStateChange('angry');
      return;
    }

    // 开始选择动画
    onGameStateChange('spinning');
    onWinnerChange(null);
    onRetryCountChange(prev => prev + 1);
    onSearchClear(); // 清空搜索以便看到结果

    let speed = 50; // 初始动画速度
    let counter = 0;
    const totalSpins = 20 + Math.floor(Math.random() * 10); // 随机旋转次数

    /**
     * 触发五彩纸屑庆祝效果
     */
    const triggerConfetti = () => {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    };
    
    /**
     * 执行单次旋转动画
     */
    const spin = () => {
      // 随机选择一个美食
      const randomIndex = Math.floor(Math.random() * FOOD_DATA.length);
      const nextItem = FOOD_DATA[randomIndex];
      
      onDisplayItemChange(nextItem);
      counter++;

      if (counter < totalSpins) {
        // 逐渐减慢速度
        if (counter > totalSpins - 8) speed += 40;
        else if (counter > totalSpins - 4) speed += 80;
        
        timeoutRef.current = window.setTimeout(spin, speed);
      } else {
        // 动画结束，显示结果
        onWinnerChange(nextItem.id);
        onGameStateChange('won');
        triggerConfetti();
      }
    };

    spin();
  }, [
    retryCount,
    maxRetries,
    onGameStateChange,
    onWinnerChange,
    onDisplayItemChange,
    onRetryCountChange,
    onSearchClear,
  ]);

  /**
   * 清理定时器
   */
  const cleanup = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  return {
    handleStart,
    cleanup,
  };
};