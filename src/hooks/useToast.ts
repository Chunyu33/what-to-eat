import { useState, useRef, useCallback, useEffect } from 'react';

/** 提示自动消失时长（毫秒） */
const TOAST_DURATION = 3200;

interface ToastState {
  /** 每次调用递增的唯一标识，保证相同文案也能重新触发动画 */
  id: number;
  text: string;
}

/**
 * 轻提示 Hook（可复用）
 * 用法：
 *   const { toast, showToast } = useToast();
 *   showToast('已清空记录');
 *   <Toast text={toast?.text} isVisible={!!toast} />
 */
export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<number | null>(null);

  const showToast = useCallback((text: string) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setToast({ id: Date.now(), text });
    timerRef.current = window.setTimeout(() => setToast(null), TOAST_DURATION);
  }, []);

  // 卸载时清掉定时器，避免在已卸载组件上 setState
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return { toast, showToast };
};
