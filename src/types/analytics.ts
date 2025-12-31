/**
 * GA4 事件参数类型
 */
export interface GA4EventParams {
  page_title?: string
  page_path?: string
  event_category?: string
  event_label?: string
  value?: number
  file_name?: string
  entry_count?: number
  theme?: string
  column?: string
  action?: string
  view_type?: string
  description?: string
  fatal?: boolean
  [key: string]: string | number | boolean | undefined
}

/**
 * GA4 初始化配置
 */
export interface GA4Config {
  measurementId: string
  enabled: boolean
  debugMode?: boolean
  anonymizeIp?: boolean
}

/**
 * 分析器接口
 */
export interface IAnalytics {
  initialize: (config: GA4Config) => Promise<void>
  trackPageView: (path: string, title: string) => void
  trackEvent: (eventName: string, params?: GA4EventParams) => void
  trackException: (description: string, fatal?: boolean) => void
  setUserId: (userId: string) => void
  setUserProperties: (properties: Record<string, string | number>) => void
  isReady: () => boolean
}

/**
 * 扩展 Window 接口，添加 gtag 和 dataLayer
 */
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'consent' | 'js',
      target: string | Date,
      params?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

export {}
