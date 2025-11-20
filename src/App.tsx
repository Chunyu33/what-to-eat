import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { FOOD_DATA } from './data';
import { Header } from './components/Header';
import { MainStage } from './components/MainStage';
import { ActionButton } from './components/ActionButton';
import { FoodListButton } from './components/FoodListButton';
import { FoodListPopup } from './components/FoodListPopup';
import { AngryMode } from './components/AngryMode';
import { useDarkMode } from './hooks/useDarkMode';
import type { GameState, FoodItem } from './types';

// 最大重试次数常量
const MAX_RETRIES = 5;

/**
 * 主应用组件
 * 今天吃什么 - 美食随机选择器
 */
const App: React.FC = () => {
  // 状态管理
  const [gameState, setGameState] = useState<GameState>('idle');
  const [displayItem, setDisplayItem] = useState<FoodItem | null>(null);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFoodListOpen, setIsFoodListOpen] = useState(false);

  // 使用自定义 Hooks
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  // Refs for animation loop
  const timeoutRef = useRef<number | null>(null);

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
   * 开始随机选择美食
   */
  const handleStart = useCallback(() => {
    if (retryCount >= MAX_RETRIES) {
      setGameState('angry');
      return;
    }

    setGameState('spinning');
    setWinnerId(null);
    setRetryCount(prev => prev + 1);
    setSearchTerm(''); // Clear search on spin so we can see the winner in list

    let speed = 50;
    let counter = 0;
    const totalSpins = 20 + Math.floor(Math.random() * 10);
    
    const spin = () => {
      // Pick completely random item
      const randomIndex = Math.floor(Math.random() * FOOD_DATA.length);
      const nextItem = FOOD_DATA[randomIndex];
      
      setDisplayItem(nextItem);
      counter++;

      if (counter < totalSpins) {
        if (counter > totalSpins - 8) speed += 40;
        else if (counter > totalSpins - 4) speed += 80;
        
        timeoutRef.current = window.setTimeout(spin, speed);
      } else {
        setWinnerId(nextItem.id);
        setGameState('won');
        triggerConfetti();
      }
    };

    spin();
  }, [retryCount]);

  // 初始化：随机选择一个美食作为初始显示
  useEffect(() => {
    setDisplayItem(FOOD_DATA[Math.floor(Math.random() * FOOD_DATA.length)]);
    
    // 清理定时器
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 搜索过滤逻辑
  const filteredFood = FOOD_DATA.filter(item => 
    item.name.includes(searchTerm) || 
    item.category.includes(searchTerm) ||
    item.description.includes(searchTerm)
  );

  // 处理美食库弹窗关闭
  const handleFoodListClose = useCallback(() => {
    setIsFoodListOpen(false);
    setSearchTerm('');
  }, []);

  // 处理愤怒模式重置
  const handleAngryModeReset = useCallback((firstFood: FoodItem) => {
    setRetryCount(0);
    setGameState('idle');
    setWinnerId(null);
    setDisplayItem(firstFood);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500 ease-in-out bg-gradient-to-b from-orange-50 via-orange-50/50 to-rose-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 font-sans relative selection:bg-orange-200 dark:selection:bg-orange-900 flex flex-col overflow-hidden">
      
      {/* 顶部导航栏 */}
      <Header
        isDarkMode={isDarkMode}
        retryCount={retryCount}
        maxRetries={MAX_RETRIES}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* 主舞台区域 */}
      <MainStage
        displayItem={displayItem}
        gameState={gameState}
      />

      {/* 主要操作按钮 */}
      <ActionButton
        gameState={gameState}
        onStart={handleStart}
      />

      {/* 美食库触发按钮 */}
      <FoodListButton
        filteredCount={filteredFood.length}
        onOpen={() => setIsFoodListOpen(true)}
      />

      {/* 美食库弹窗 */}
      <FoodListPopup
        isOpen={isFoodListOpen}
        filteredFood={filteredFood}
        searchTerm={searchTerm}
        winnerId={winnerId}
        onClose={handleFoodListClose}
        onSearchChange={setSearchTerm}
        onClearSearch={() => setSearchTerm('')}
      />

      {/* 愤怒模式覆盖层 */}
      <AngryMode
        isVisible={gameState === 'angry'}
        onReset={handleAngryModeReset}
        firstFood={FOOD_DATA[0]}
      />
    </div>
  );
};

export default App;