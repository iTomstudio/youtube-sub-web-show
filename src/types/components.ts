export interface NavLink {
  name: string
  path: string
  icon?: string
}

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface Metric {
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface YouTubeChannel {
  id: string
  name: string
  subscribers: number
  views: number
  videoCount: number
}
