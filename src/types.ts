import { StyleProp, ViewStyle } from 'react-native'

export type CallbackType = (data?: any) => void
export interface LayoutProps {
  loop?: boolean
  autoPlay?: boolean
  controls?: boolean
  speed?: boolean
  time?: `${number}h${number}m${number}s`
  handlers?: { [key: string]: any }
  scalesPageToFit?: boolean
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  getVimeoPlayer?: any
  videoId: string
  params?: string
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
