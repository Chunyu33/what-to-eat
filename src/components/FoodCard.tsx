
import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FoodItem } from '../types';

interface FoodCardProps {
  item: FoodItem;
  variant?: 'hero' | 'list';
  isHighlighted?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, variant = 'list', isHighlighted }) => {
  
  if (variant === 'hero') {
    // Extract specific bg color for the blob decoration, default to orange if complex
    const bgClass = item.color.split(' ').find(c => c.startsWith('bg-')) || 'bg-orange-100';

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={twMerge(
          "flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl border-4 text-center w-full max-w-sm mx-auto relative overflow-hidden transition-colors duration-300",
          // Light mode base
          "bg-white border-white/50",
          // Dark mode base
          "dark:bg-slate-800 dark:border-slate-700"
        )}
      >
         {/* Decorative Background Blob - Adapts to dark mode by being more subtle */}
         <div className={clsx(
           "absolute top-0 left-0 w-full h-32 opacity-30 dark:opacity-10 transition-colors", 
           bgClass
         )}></div>

        <div className="z-10 flex flex-col items-center w-full">
          <motion.div 
            className="text-8xl md:text-9xl mb-6 filter drop-shadow-lg"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {item.emoji}
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-gray-100 mb-3 tracking-tight transition-colors">
            {item.name}
          </h2>
          
          {/* Tag: Uses original colors in light mode, but adjusted for dark mode visibility */}
          <span className={twMerge(
            "px-4 py-1.5 rounded-full text-sm font-bold mb-4 transition-all",
            item.color,
            // Dark mode overrides for better contrast on dark background
            "dark:bg-opacity-20 dark:border dark:border-opacity-20"
          )}>
            {item.category}
          </span>
          
          <p className="text-gray-500 dark:text-gray-400 font-medium px-4 leading-relaxed transition-colors">
            “{item.description}”
          </p>
        </div>
      </motion.div>
    );
  }

  // Standard List Variant
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={twMerge(
        "relative flex flex-col items-center p-3 rounded-xl border transition-all duration-300 cursor-default group",
        // Base styles
        "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm",
        // Border styles
        "border-transparent dark:border-slate-700",
        // Hover styles
        "hover:bg-white dark:hover:bg-slate-700 hover:shadow-md",
        // Highlight styles (Winner)
        isHighlighted 
          ? "bg-white dark:bg-slate-700 ring-2 ring-orange-500 shadow-lg scale-105 z-10 border-orange-200 dark:border-orange-500/50 opacity-100" 
          : "opacity-80 grayscale-[0.3] hover:grayscale-0 hover:opacity-100"
      )}
    >
      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{item.emoji}</div>
      <h3 className={clsx(
        "font-bold text-sm text-center truncate w-full transition-colors",
        isHighlighted ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"
      )}>
        {item.name}
      </h3>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate max-w-full">
        {item.category}
      </p>
    </motion.div>
  );
};
