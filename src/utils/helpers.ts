/**
 * 格式化数字，添加逗号以提高可读性
 * @param num - 要格式化的数字
 * @returns 格式化后的数字字符串
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('zh-CN').format(num)
}

/**
 * 将大数字格式化为缩写形式 (例如 1.2K, 3.5M)
 * @param num - 要格式化的数字
 * @returns 缩写的数字字符串
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * 获取相对时间字符串 (例如 "2天前")
 * @param date - 要比较的日期
 * @returns 相对时间字符串
 */
export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 60) return `${diffMins}分钟前`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}小时前`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}天前`
  const diffWeeks = Math.floor(diffDays / 7)
  return `${diffWeeks}周前`
}
