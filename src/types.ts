import { WebViewProps } from 'react-native-webview'

export type CallbackType = (data?: any) => void
export interface LayoutProps extends WebViewProps {
  loop?: boolean
  autoPlay?: boolean
  controls?: boolean
  speed?: boolean
  time?: `${number}h${number}m${number}s`
  handlers?: { [key: string]: any }
  getVimeoPlayer?: any
  videoId: string
  params?: string
  reference?: string
}

export const PlayerEvents = [
  'controlschange',
  'fullscreenchange',
  'audioprocess',
  'canplay',
  'canplaythrough',
  'complete',
  'durationchange',
  'emptied',
  'ended',
  'loadeddata',
  'loadedmetadata',
  'pause',
  'play',
  'playing',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
] as const

export type PlayerEvent = typeof PlayerEvents[number]
