import type { GA4EventParams } from '@/types/analytics'
import { analyticsService } from '@/services/analytics'

export function useAnalytics() {
  /**
   * 追踪页面浏览
   */
  const trackPageView = (path: string, title: string): void => {
    analyticsService.trackPageView(path, title)
  }

  /**
   * 追踪字幕上传事件
   */
  const trackSubtitleUpload = (fileName: string, entryCount: number): void => {
    analyticsService.trackEvent('subtitle_upload', {
      file_name: fileName,
      entry_count: entryCount,
      event_category: 'subtitle',
      event_label: 'file_upload',
    })
  }

  /**
   * 追踪字幕清除事件
   */
  const trackSubtitleClear = (): void => {
    analyticsService.trackEvent('subtitle_clear', {
      event_category: 'subtitle',
      event_label: 'clear_action',
    })
  }

  /**
   * 追踪主题切换事件
   */
  const trackThemeChange = (newTheme: string): void => {
    analyticsService.trackEvent('theme_change', {
      theme: newTheme,
      event_category: 'user_preference',
      event_label: 'theme_switch',
    })
  }

  /**
   * 追踪列显示/隐藏事件
   */
  const trackColumnToggle = (
    columnName: 'furigana' | 'translation',
    isVisible: boolean
  ): void => {
    analyticsService.trackEvent('column_toggle', {
      column: columnName,
      action: isVisible ? 'show' : 'hide',
      event_category: 'ui_interaction',
      event_label: `${columnName}_toggle`,
    })
  }

  /**
   * 追踪移动端视图切换
   */
  const trackMobileViewSwitch = (
    viewType: 'furigana' | 'text' | 'translated'
  ): void => {
    analyticsService.trackEvent('mobile_view_switch', {
      view_type: viewType,
      event_category: 'mobile_interaction',
      event_label: 'view_switch',
    })
  }

  /**
   * 追踪异常
   */
  const trackException = (description: string, fatal = false): void => {
    analyticsService.trackException(description, fatal)
  }

  /**
   * 通用事件追踪
   */
  const trackEvent = (eventName: string, params?: GA4EventParams): void => {
    analyticsService.trackEvent(eventName, params)
  }

  return {
    trackPageView,
    trackSubtitleUpload,
    trackSubtitleClear,
    trackThemeChange,
    trackColumnToggle,
    trackMobileViewSwitch,
    trackException,
    trackEvent,
  }
}
