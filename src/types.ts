import { StyleProp, ViewStyle } from 'react-native'

export interface LayoutProps {
  videoId: string
  loop: boolean
  autoPlay: boolean
  controls: boolean
  speed?: boolean
  time?: string
  onReady?: () => void
  onPlay?: () => void
  onPlayProgress?: (data: any) => void
  onPause?: () => void
  onFinish?: () => void
  onVolumeChange?: () => void
  onError?: () => void
  scalesPageToFit?: boolean
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  getVimeoPlayer?: any
}

export enum PlayerEvents {
  PLAY = 'play',
  PAUSE = 'pause',
  SET_TIME = 'set_time',
  GET_DURATION = 'get_duration',
}
export interface PlayerActions {
  type?: PlayerEvents
  time?: number
  callback?: any
}
