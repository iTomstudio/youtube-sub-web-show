import type { GA4Config, GA4EventParams, IAnalytics } from '@/types/analytics'

class AnalyticsService implements IAnalytics {
  private config: GA4Config | null = null
  private isInitialized = false

  /**
   * 初始化 GA4
   */
  async initialize(config: GA4Config): Promise<void> {
    if (this.isInitialized) {
      console.warn('[Analytics] Already initialized')
      return
    }

    if (!config.enabled || !config.measurementId) {
      console.log('[Analytics] Analytics disabled or no measurement ID')
      return
    }

    this.config = config
    await this.loadGAScript()
    this.configureGA4()
    this.isInitialized = true

    if (config.debugMode) {
      console.log('[Analytics] Initialized with ID:', config.measurementId)
    }

    // 初始化完成后，追踪当前页面
    this.trackPageView(window.location.pathname, document.title)
  }

  /**
   * 加载 GA4 脚本
   */
  private loadGAScript(): Promise<void> {
    return new Promise((resolve) => {
      // 初始化 dataLayer（必须在脚本加载前）
      window.dataLayer = window.dataLayer || []

      // 定义 gtag 函数（标准方式）
      function gtag(...args: any[]) {
        window.dataLayer?.push(arguments)
      }
      window.gtag = gtag as any

      // 初始化 GA4（记录时间戳）
      window.gtag('js', new Date())

      // 加载 GA4 脚本标签
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config?.measurementId}`
      script.onload = () => {
        if (this.config?.debugMode) {
          console.log('[Analytics] GA4 script loaded successfully')
        }
        resolve()
      }
      script.onerror = () => {
        console.error('[Analytics] Failed to load GA4 script')
        resolve()
      }

      document.head.appendChild(script)
    })
  }

  /**
   * 配置 GA4
   */
  private configureGA4(): void {
    if (!window.gtag || !this.config) return

    const configParams: Record<string, any> = {
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
    }

    if (this.config.anonymizeIp) {
      configParams.anonymize_ip = true
    }

    window.gtag('config', this.config.measurementId, configParams)
  }

  /**
   * 追踪页面浏览
   */
  trackPageView(path: string, title: string): void {
    if (!this.isInitialized || !window.gtag) return

    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    })

    if (this.config?.debugMode) {
      console.log('[Analytics] Page view tracked:', path, title)
    }
  }

  /**
   * 追踪自定义事件
   */
  trackEvent(eventName: string, params?: GA4EventParams): void {
    if (!this.isInitialized || !window.gtag) return

    window.gtag('event', eventName, params || {})

    if (this.config?.debugMode) {
      console.log('[Analytics] Event tracked:', eventName, params)
    }
  }

  /**
   * 追踪异常
   */
  trackException(description: string, fatal = false): void {
    if (!this.isInitialized) return

    this.trackEvent('exception', {
      description,
      fatal,
    })
  }

  /**
   * 设置用户 ID
   */
  setUserId(userId: string): void {
    if (!this.isInitialized || !window.gtag) return

    window.gtag('config', this.config?.measurementId || '', {
      user_id: userId,
    })
  }

  /**
   * 设置用户属性
   */
  setUserProperties(properties: Record<string, string | number>): void {
    if (!this.isInitialized || !window.gtag) return

    window.gtag('set', 'user_properties', properties)
  }

  /**
   * 检查是否已初始化
   */
  isReady(): boolean {
    return this.isInitialized
  }

  /**
   * 获取当前配置（仅用于调试）
   */
  getConfig(): GA4Config | null {
    return this.config
  }
}

// 导出单例
export const analyticsService = new AnalyticsService()

// 在开发环境中，将 analyticsService 暴露到 window 对象，方便调试
if (import.meta.env.DEV) {
  ;(window as any).analyticsService = analyticsService
}
