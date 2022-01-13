import { StyleProp, ViewStyle } from 'react-native'

export type BooleanType = boolean | 1 | 0;
export type CallbackType = (data?: any) => void;
export interface LayoutProps {
  loop?: BooleanType
  autoPlay?: BooleanType
  controls?: BooleanType
  speed?: BooleanType
  time?: `${number}h${number}m${number}s`
  handlers?: { [key: string]: any }
  scalesPageToFit?: boolean
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  getVimeoPlayer?: any
  url: string
}

export const PlayerEvents = [
  'controlschange', // The visibility of the controls changed.
  'fullscreenchange', // The orientation was changed.
  'audioprocess', // A entrada do buffer de ScriptProcessorNode está pronta para ser processada
  'canplay', // O navegador pode reproduzir o arquivo, mas estima que não haverá dados suficientes para reproduzir o arquivo sem interrupções para recarregar o buffer.
  'canplaythrough', // O navegador estima que poderá reproduzir o arquivo sem interrupções até o final.
  'complete', // A renderização de OfflineAudioContext foi finalizada.
  'durationchange', // O atributo duration foi atualizado.
  'emptied', // Ausencia de conteúdo. Por exemplo, este evento é enviado se a mídia foi carregada (ou parcialmente) e o método load() foi chamado para recarregar o conteúdo.
  'ended', // A reprodução foi finalizada devido ao fim do conteúdo
  'loadeddata', // O primeiro frame de mídia foi carregado.
  'loadedmetadata', // Os metadados foram carregados.
  'pause', // A reprodução foi pausada.
  'play', // A reprodução foi iniciada.
  'playing', // A reprodução está pronta para iniciar depois de ser pausada, ou atrasada devido a falta de dados.
  'ratechange', // A taxa de reprodução foi alterada.
  'seeked', // Operação de busca finalizada.
  'seeking', // Operação de busca iniciada.
  'stalled', // The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
  'suspend', // Media data loading has been suspended.
  'timeupdate', // The time indicated by the currentTime attribute has been updated.
  'volumechange', // The volume has changed.
  'waiting' // Playback has stopped because of a temporary lack of data.
] as const;

export type PlayerEvent = typeof PlayerEvents[number];