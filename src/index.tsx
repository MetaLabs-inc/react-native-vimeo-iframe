import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'

import webplayer from './template'
import { LayoutProps, PlayerActions, PlayerEvents } from './types'

export const Vimeo: React.FC<LayoutProps> = ({
  videoId,
  onReady,
  onPlay,
  onPlayProgress,
  onPause,
  onFinish,
  scalesPageToFit,
  loop,
  controls,
  autoPlay,
  speed = false,
  style,
  onVolumeChange,
  onError,
  containerStyle,
  getVimeoPlayer,
}) => {
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const ref = useRef<WebView>()

  const [autoPlayValue, setAutoPlay] = useState<boolean>(autoPlay)
  const toggleAutoPlay = useCallback(() => setAutoPlay(!autoPlayValue), [
    autoPlayValue,
  ])

  const handlers: any = {}

  const player = useCallback(
    (action: PlayerActions) => {
      const handler = ref?.current?.injectJavaScript

      if (handler) {
        switch (action.type) {
          case PlayerEvents.PLAY:
            if (isPlaying) return
            handler('play();')
            setPlaying(true)
            break
          case PlayerEvents.PAUSE:
            if (!isPlaying) return
            handler('await pause();')
            setPlaying(false)
            break
          case PlayerEvents.SET_TIME:
            handler(`setTime(${action.time});`)
            break
          case PlayerEvents.GET_DURATION:
            handler(`
            const videoDuration = getDuration();
            const callback = ${action.callback};
            callback(videoDuration);
          `)
            break
          default:
            break
        }
      }
    },
    [ref, isPlaying]
  )

  const onReadyDefault = useCallback(() => {
    onReady && setTimeout(onReady)
  }, [onReady])

  const registerHandlers = useCallback(() => {
    registerBridgeEventHandler('ready', onReadyDefault)
    registerBridgeEventHandler('play', onPlay)
    registerBridgeEventHandler('playProgress', onPlayProgress)
    registerBridgeEventHandler('pause', onPause)
    registerBridgeEventHandler('finish', onFinish)
    registerBridgeEventHandler('volumeChange', onVolumeChange)
    registerBridgeEventHandler('error', onError)
  }, [
    onReadyDefault,
    onPlay,
    onPlayProgress,
    onError,
    onVolumeChange,
    onPause,
    onFinish,
  ])

  const registerBridgeEventHandler = (eventName: string, handler: any) => {
    handlers[eventName] = handler
  }

  useEffect(() => {
    registerHandlers()
  }, [registerHandlers, videoId, scalesPageToFit])

  const onBridgeMessage = useCallback(
    (event: any) => {
      const message = event.nativeEvent.data
      let payload
      try {
        payload = JSON.parse(message)
        if (payload?.name === 'finish') {
          toggleAutoPlay()
        }
      } catch (err) {
        return
      }

      let bridgeMessageHandler = handlers[payload?.name]
      if (bridgeMessageHandler) bridgeMessageHandler(payload?.data)
    },
    [toggleAutoPlay]
  )

  useEffect(() => {
    getVimeoPlayer && getVimeoPlayer(player)
  }, [getVimeoPlayer, player])

  return (
    <WebView
      source={{
        html: webplayer(videoId, loop, autoPlayValue, controls, speed),
      }}
      javaScriptEnabled={true}
      ref={ref as any}
      onMessage={onBridgeMessage}
      bounces={false}
      scrollEnabled={false}
      scalesPageToFit={scalesPageToFit}
      onError={(error) => console.error(error)}
      style={[
        {
          marginTop: -8,
          marginLeft: -10,
        },
        style,
      ]}
      containerStyle={containerStyle}
      setBuiltInZoomControls={false}
      setDisplayZoomControls={false}
      automaticallyAdjustContentInsets
      onNavigationStateChange={(a) => console.log(a?.url)}
    />
  )
}
