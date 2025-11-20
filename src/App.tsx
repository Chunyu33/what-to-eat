
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Utensils, RefreshCw, Zap, Search, Moon, Sun, X } from 'lucide-react';
import { FOOD_DATA } from './data';
import { FoodCard } from './components/FoodCard';
import type { GameState, FoodItem } from './types';


const MAX_RETRIES = 5;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [displayItem, setDisplayItem] = useState<FoodItem | null>(null);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Refs for animation loop
  const timeoutRef = useRef<number | null>(null);

  // Initialize
  useEffect(() => {
    setDisplayItem(FOOD_DATA[Math.floor(Math.random() * FOOD_DATA.length)]);
    
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // Filter logic
  const filteredFood = FOOD_DATA.filter(item => 
    item.name.includes(searchTerm) || 
    item.category.includes(searchTerm) ||
    item.description.includes(searchTerm)
  );

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

  return (
    <div className="min-h-screen transition-colors duration-500 ease-in-out bg-gradient-to-b from-orange-50 via-orange-50/50 to-rose-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 font-sans relative selection:bg-orange-200 dark:selection:bg-orange-900 flex flex-col overflow-hidden">
      
      {/* Top Bar */}
      <header className="flex-none px-4 py-3 flex items-center justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm sticky top-0 z-30 border-b border-orange-100/50 dark:border-slate-700/50 transition-colors">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg shadow-md shadow-orange-500/20">
            <Utensils size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-800 dark:text-white">今天吃什么</span>
        </div>

        <div className="flex items-center gap-3">
           <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
           >
             {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
           </button>
           <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800/30">
            <Zap size={12} className="fill-current" />
            <span>{retryCount}/{MAX_RETRIES}</span>
          </div>
        </div>
      </header>

      {/* Main Stage Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-[350px] relative">
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Central Card */}
        <div className="relative z-10 w-full max-w-md mx-auto perspective-1000">
          <AnimatePresence mode="wait">
            {displayItem && (
               <FoodCard 
                 key={gameState === 'spinning' ? displayItem.id + Math.random() : displayItem.id} 
                 item={displayItem} 
                 variant="hero" 
               />
            )}
          </AnimatePresence>

          {/* Status Text */}
          <motion.div 
            className="text-center mt-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {gameState === 'idle' && <p className="text-gray-400 dark:text-gray-500 font-medium">准备好开始了吗？</p>}
            {gameState === 'spinning' && <p className="text-orange-500 font-bold animate-pulse">正在纠结中...</p>}
            {gameState === 'won' && <p className="text-green-600 dark:text-green-400 font-bold text-lg">就决定是它了！</p>}
          </motion.div>
        </div>

      </main>

      {/* Action Button Area */}
      <div className="flex-none p-6 flex justify-center z-30 pb-8">
         <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={gameState === 'spinning'}
            className="shadow-xl shadow-orange-500/30 dark:shadow-orange-500/10 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xl font-black py-4 px-16 rounded-full flex items-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed transition-all ring-4 ring-white dark:ring-slate-800"
          >
            {gameState === 'spinning' ? <RefreshCw className="animate-spin" /> : <Utensils className="animate-bounce" />}
            {gameState === 'idle' ? '开始随机' : gameState === 'spinning' ? '挑选...' : '换一个'}
          </motion.button>
      </div>

      {/* Inventory List with Search */}
      <div className="flex-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-orange-100 dark:border-slate-800 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 max-h-[40vh] flex flex-col transition-colors duration-300">
         {/* Drawer Header & Search */}
         <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
              美食库 ({filteredFood.length})
            </h3>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="搜索美食..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 text-sm rounded-full pl-9 pr-8 py-1.5 border-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/50 transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
         </div>

         {/* List Content */}
         <div className="overflow-y-auto p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filteredFood.length > 0 ? (
              filteredFood.map((item) => (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  variant="list"
                  isHighlighted={winnerId === item.id}
                />
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                未找到相关美食，换个词试试？
              </div>
            )}
         </div>
      </div>

      {/* ANGRY MODE OVERLAY */}
      <AnimatePresence>
        {gameState === 'angry' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-red-950 flex items-center justify-center text-center p-6 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
            </div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -2, 2, -2, 2, 0],
                opacity: 1 
              }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
              className="relative z-10 max-w-lg"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-8xl mb-6 filter drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]"
              >
                🤬
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-red-500 mb-4 tracking-tighter border-b-4 border-red-800 pb-4 inline-block">
                嘴这么挑，别吃了！
              </h2>
              <p className="text-red-300/80 text-lg md:text-xl font-mono mt-4">
                SYSTEM ERROR: PICKY_EATER_DETECTED<br/>
                ACTION: 饿着吧
              </p>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  setRetryCount(0);
                  setGameState('idle');
                  setWinnerId(null);
                  setDisplayItem(FOOD_DATA[0]);
                }}
                className="mt-12 px-8 py-3 bg-transparent border-2 border-red-500/50 text-red-400 rounded-lg hover:bg-red-900/50 hover:text-white hover:border-red-500 transition-all text-sm tracking-widest uppercase cursor-pointer"
              >
                我错了，再给次机会
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
