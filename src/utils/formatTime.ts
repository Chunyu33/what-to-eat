/**
 * 时间展示工具
 */

/**
 * 把时间戳格式化成相对时间：刚刚 / 5 分钟前 / 3 小时前 / 2 天前 / 10 月 8 日
 * @param timestamp 毫秒时间戳
 */
export const formatRelativeTime = (timestamp: number): string => {
  const diff = Date.now() - timestamp;

  // 未来时间或系统时钟偏差，一律按"刚刚"处理
  if (diff < 60_000) return '刚刚';

  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes} 分钟前`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;

  const date = new Date(timestamp);
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日`;
};
