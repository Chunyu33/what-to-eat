import { useState, useEffect } from 'react';

/**
 * 暗色模式管理 Hook
 * 处理暗色模式的状态切换和 DOM 类名管理
 */
export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 初始化：检查系统偏好设置
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // 切换暗色模式
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};