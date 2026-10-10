import { useState, useEffect, useCallback } from 'react';
import type { FoodItem, HistoryRecord } from '../types';

/** localStorage 存储键 */
const STORAGE_KEY = 'what-to-eat:history';

/** 最多保留的历史条数 */
const MAX_HISTORY = 10;

/**
 * 从 localStorage 读取历史记录
 * 数据损坏、格式不合法时直接丢弃，不影响主流程
 */
const loadHistory = (): HistoryRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (record): record is HistoryRecord =>
          !!record &&
          typeof record.id === 'string' &&
          typeof record.name === 'string' &&
          typeof record.emoji === 'string' &&
          typeof record.category === 'string' &&
          typeof record.decidedAt === 'number'
      )
      .slice(0, MAX_HISTORY);
  } catch {
    return [];
  }
};

/**
 * 历史记录 Hook
 * 只记录用户主动点过"就这个了"的美食，同一道菜去重并置顶
 */
export const useHistory = () => {
  const [history, setHistory] = useState<HistoryRecord[]>(loadHistory);

  // 变更后写回 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // 无痕模式或存储写满时静默失败，不影响功能
    }
  }, [history]);

  /** 新增一条记录（同一道菜只保留最新一次） */
  const addRecord = useCallback((item: FoodItem) => {
    setHistory((prev) => {
      const record: HistoryRecord = {
        id: item.id,
        name: item.name,
        emoji: item.emoji,
        category: item.category,
        decidedAt: Date.now(),
      };
      return [record, ...prev.filter((r) => r.id !== item.id)].slice(0, MAX_HISTORY);
    });
  }, []);

  /** 删除单条记录 */
  const removeRecord = useCallback((id: string) => {
    setHistory((prev) => prev.filter((r) => r.id !== id));
  }, []);

  /** 清空全部记录 */
  const clearHistory = useCallback(() => setHistory([]), []);

  return { history, addRecord, removeRecord, clearHistory };
};
