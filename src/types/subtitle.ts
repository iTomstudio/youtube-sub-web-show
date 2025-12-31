export interface Subtitle {
  index: number
  startTime: string
  endTime: string
  text: string
  translatedText: string
  furiganaText: string
}

export interface SubtitleData {
  version: string
  exportedAt: string
  totalEntries: number
  subtitles: Subtitle[]
}
