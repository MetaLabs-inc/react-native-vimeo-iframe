import {ViewStyle} from 'react-native';

export interface LayoutProps {
  videoId: string;
  loop: boolean;
  autoPlay: boolean;
  controls: boolean;
  speed?: boolean;
  onReady?: () => void;
  onPlay?: () => void;
  onPlayProgress?: (data: any) => void;
  onPause?: () => void;
  onFinish?: () => void;
  scalesPageToFit?: boolean;
  style?: ViewStyle;
}
