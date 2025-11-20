import React from 'react';

/**
 * 页脚组件
 * 显示版权信息和作者声明
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        Made with ❤️ by Evan © {currentYear}
      </p>
      <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
        解决今天吃什么的世界难题
      </p>
    </footer>
  );
};