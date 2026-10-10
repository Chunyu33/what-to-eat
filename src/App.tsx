import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import confetti from 'canvas-confetti';
import { FOOD_DATA } from './data';
import { Header } from './components/Header';
import { MainStage } from './components/MainStage';
import { ActionButton } from './components/ActionButton';
import { FoodListButton } from './components/FoodListButton';
import { FoodListPopup } from './components/FoodListPopup';
import { HistoryButton } from './components/HistoryButton';
import { HistoryPopup } from './components/HistoryPopup';
import { CelebrationModal } from './components/CelebrationModal';
import { Toast } from './components/Toast';
import { AngryMode } from './components/AngryMode';
import { Footer } from './components/Footer';
import { useDarkMode } from './hooks/useDarkMode';
import { useHistory } from './hooks/useHistory';
import { useToast } from './hooks/useToast';
import { shareFood } from './utils/share';
import { pickPraise } from './utils/praise';
import { getFoodByTimeOfDay, getCurrentTimeOfDay, TimeOfDay } from './utils/timeUtils';
import type { GameState, FoodItem } from './types';

// 最大重试次数常量
const MAX_RETRIES = 5;

// 复制成功提示的展示时长（毫秒）
const COPIED_TIP_DURATION = 2000;

// 排除"最近吃过的"之后，剩余可抽数量低于这个值就清空历史记录重来
const MIN_AVAILABLE_FOOD = 3;

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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  // 庆祝弹窗里的夸奖话术，每次打开时随机抽一句（不能在渲染时随机，否则每次重渲染都会变）
  const [praise, setPraise] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<TimeOfDay | 'all'>(getCurrentTimeOfDay());

  // 使用自定义 Hooks
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { history, addRecord, removeRecord, clearHistory } = useHistory();
  const { toast, showToast } = useToast();

  // Refs for animation loop
  const timeoutRef = useRef<number | null>(null);
  const copiedTimerRef = useRef<number | null>(null);

  /**
   * 触发五彩纸屑庆祝效果
   */
  const triggerConfetti = useCallback(() => {
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
  }, []);

  /**
   * 开始随机选择美食
   */
  const handleStart = useCallback(() => {
    // 防止在滚动动画进行中再次点击
    if (gameState === 'spinning') return;
    
    if (retryCount >= MAX_RETRIES) {
      setGameState('angry');
      return;
    }

    // 清理任何未完成的定时器
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 本时段的全部可选美食
    const pool = selectedTimeOfDay === 'all'
      ? FOOD_DATA
      : getFoodByTimeOfDay(FOOD_DATA, selectedTimeOfDay);

    // 避开最近决定过的：排除后不够 MIN_AVAILABLE_FOOD 道，说明记录快占满了，
    // 清空记录重来并提示用户，避免随机池被压得太小而失去意义
    const recentIds = new Set(history.map((record) => record.id));
    let availableFood = pool.filter((food) => !recentIds.has(food.id));
    if (availableFood.length < MIN_AVAILABLE_FOOD) {
      if (history.length > 0) {
        clearHistory();
        showToast('最近吃过的快占满了，已清空记录重新开始');
      }
      availableFood = pool;
    }
    // 兜底：池子为空就直接退出，避免随机出 undefined 让抽奖动画哑火
    if (availableFood.length === 0) return;

    // 重新抽取时收起"已复制"提示
    setIsCopied(false);

    // 使用React的批量更新来确保状态同步
    ReactDOM.flushSync(() => {
      setGameState('spinning');
      setWinnerId(null);
      setRetryCount(prev => prev + 1);
      setSearchTerm(''); // Clear search on spin so we can see the winner in list
    });

    let speed = 50;
    let counter = 0;
    const totalSpins = 20 + Math.floor(Math.random() * 10);

    const spin = () => {
      // 从过滤后的美食中随机选择
      const randomIndex = Math.floor(Math.random() * availableFood.length);
      const nextItem = availableFood[randomIndex];

      setDisplayItem(nextItem);
      counter++;

      if (counter < totalSpins) {
        // 从倒数第 8 次开始逐次拉长间隔，最后 4 次拉得更狠，做出"减速停住"的手感
        // 注意：条件更严格的必须写在前面，否则宽条件会吃掉窄条件（原代码这里写反了）
        if (counter > totalSpins - 4) speed += 80;
        else if (counter > totalSpins - 8) speed += 40;

        timeoutRef.current = window.setTimeout(spin, speed);
      } else {
        // 收尾也交给 ref 管理，切时段时才能一起取消
        timeoutRef.current = window.setTimeout(() => {
          setWinnerId(nextItem.id);
          setGameState('won');
          triggerConfetti();
        }, 50);
      }
    };

    // 直接调用而不是 requestAnimationFrame：标签页不可见时 rAF 会被挂起，
    // 会导致点了按钮却一直停在"挑选..."（动画哑火）
    spin();
  }, [retryCount, gameState, selectedTimeOfDay, triggerConfetti, history, clearHistory, showToast]);

  // 时段变化时，从该时段的池子里重新随机一条作为初始展示
  useEffect(() => {
    const pool = selectedTimeOfDay === 'all' 
      ? FOOD_DATA 
      : getFoodByTimeOfDay(FOOD_DATA, selectedTimeOfDay);
    setDisplayItem(pool[Math.floor(Math.random() * pool.length)]);
  }, [selectedTimeOfDay]);

  // 组件卸载时清理所有定时器（抽奖 + 复制提示）
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (copiedTimerRef.current) {
        window.clearTimeout(copiedTimerRef.current);
      }
    };
  }, []);

  // 时间段过滤逻辑
  const timeFilteredFood = selectedTimeOfDay === 'all' 
    ? FOOD_DATA 
    : getFoodByTimeOfDay(FOOD_DATA, selectedTimeOfDay);

  // 搜索过滤逻辑
  const filteredFood = timeFilteredFood.filter(item => 
    item.name.includes(searchTerm) || 
    item.category.includes(searchTerm) ||
    item.description.includes(searchTerm)
  );

  // 处理美食库弹窗关闭
  const handleFoodListClose = useCallback(() => {
    setIsFoodListOpen(false);
    setSearchTerm('');
  }, []);

  // 处理"就这个了"：写入历史记录、弹庆祝弹窗、放彩屑
  const handleConfirm = useCallback(() => {
    if (!displayItem) return;
    setIsCopied(false);
    setPraise(pickPraise());
    addRecord(displayItem);
    setIsCelebrating(true);
    triggerConfetti();
  }, [displayItem, addRecord, triggerConfetti]);

  // 关闭庆祝弹窗
  const handleCelebrationClose = useCallback(() => {
    setIsCelebrating(false);
  }, []);

  // 庆祝弹窗里"再抽一次"：关掉弹窗并重新抽取
  const handleSpinAgain = useCallback(() => {
    setIsCelebrating(false);
    handleStart();
  }, [handleStart]);

  // 处理"复制分享"：纯前端，把文案写进剪贴板
  const handleShare = useCallback(async () => {
    if (!displayItem) return;

    const succeeded = await shareFood(displayItem.name, displayItem.emoji);
    if (!succeeded) return;

    setIsCopied(true);
    if (copiedTimerRef.current) {
      window.clearTimeout(copiedTimerRef.current);
    }
    copiedTimerRef.current = window.setTimeout(() => setIsCopied(false), COPIED_TIP_DURATION);
  }, [displayItem]);

  // 处理愤怒模式重置
  const handleAngryModeReset = useCallback((firstFood: FoodItem) => {
    setRetryCount(0);
    setGameState('idle');
    setWinnerId(null);
    setIsCopied(false);
    setDisplayItem(firstFood);
  }, []);

  // 处理时间段过滤变化
  // 切时段时取消进行中的抽奖并重置状态，否则定时器被杀掉后会永久卡在 spinning
  const handleTimeOfDayChange = useCallback((timeOfDay: TimeOfDay | 'all') => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsCelebrating(false);
    setGameState('idle');
    setWinnerId(null);
    setSelectedTimeOfDay(timeOfDay);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500 ease-in-out bg-gradient-to-b from-orange-50 via-orange-50/50 to-rose-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 font-sans relative selection:bg-orange-200 dark:selection:bg-orange-900 flex flex-col overflow-hidden">
      
      {/* 顶部导航栏 */}
      <Header
        isDarkMode={isDarkMode}
        retryCount={retryCount}
        maxRetries={MAX_RETRIES}
        selectedTimeOfDay={selectedTimeOfDay}
        onToggleDarkMode={toggleDarkMode}
        onTimeOfDayChange={handleTimeOfDayChange}
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
        onConfirm={handleConfirm}
      />

      {/* 美食库 / 最近决定 入口 */}
      <div className="flex-none p-4 flex flex-wrap items-center justify-center gap-3 z-30">
        <FoodListButton
          filteredCount={filteredFood.length}
          onOpen={() => setIsFoodListOpen(true)}
        />
        <HistoryButton
          count={history.length}
          onOpen={() => setIsHistoryOpen(true)}
        />
      </div>

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

      {/* 历史记录弹窗 */}
      <HistoryPopup
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onRemove={removeRecord}
        onClear={clearHistory}
      />

      {/* 庆祝弹窗（含分享入口） */}
      <CelebrationModal
        isOpen={isCelebrating}
        item={displayItem}
        praise={praise}
        isCopied={isCopied}
        onClose={handleCelebrationClose}
        onShare={handleShare}
        onSpinAgain={handleSpinAgain}
      />

      {/* 轻提示 */}
      <Toast text={toast?.text} isVisible={!!toast} />

      {/* 愤怒模式覆盖层 */}
      <AngryMode
        isVisible={gameState === 'angry'}
        onReset={handleAngryModeReset}
        firstFood={FOOD_DATA[0]}
      />
      
      {/* 页脚 */}
      <Footer />
    </div>
  );
};

export default App;
