import React, { useCallback, useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';

import webplayer from '../lib/template';
import { LayoutProps, PossiblePlayerActions } from '../lib/types';

export const Vimeo: React.FC<LayoutProps> = ({
  videoId,
  onReady,
  onPlay,
  onPlayProgress,
  onPause,
  onFinish,
  onVolumeChange,
  onError,
  scalesPageToFit,
  loop,
  controls,
  autoPlay,
  speed = false,
  style,
  containerStyle,
  getVimeoPlayer,
}) => {
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [autoPlayValue, setAutoPlay] = useState<boolean>(autoPlay);
  const ref = useRef<WebView>();
  const handlers: any = {};

  const player = useCallback((action: PossiblePlayerActions) => {
    const handler = ref.current.injectJavaScript;

    switch(action.type) {
      case 'play':
        if (isPlaying) return;
        handler('play();');
        setPlaying(true);
        break;
      case 'pause':
        if (!isPlaying) return;
        handler('await pause();');
        setPlaying(false);
        break;
      case 'set_time':
        handler(`setTime(${action.time});`);
        break;
      case 'get_duration':
        registerBridgeEventHandler('duration', action.callback);
        handler('getDuration();');
        break;
      default:
        break;
    }
  }, [ref, isPlaying]);

  const toggleAutoPlay = useCallback(() => {
    setAutoPlay(!autoPlayValue);
  }, [autoPlayValue]);

  const onReadyDefault = useCallback(() => {
    onReady && setTimeout(onReady);
  }, [onReady]);

  const registerHandlers = useCallback(() => {
    registerBridgeEventHandler('ready', onReady || onReadyDefault);
    registerBridgeEventHandler('play', onPlay);
    registerBridgeEventHandler('playProgress', onPlayProgress);
    registerBridgeEventHandler('pause', onPause);
    registerBridgeEventHandler('finish', onFinish);
    registerBridgeEventHandler('volumeChange', onVolumeChange);
    registerBridgeEventHandler('error', onError);
  }, [
    onReady,
    onReadyDefault,
    onPlay,
    onPlayProgress,
    onPause,
    onFinish,
  ]);

  const registerBridgeEventHandler = useCallback((eventName: string, handler: any) => {
    handlers[eventName] = handler;
  }, [handlers]);

  const onBridgeMessage = useCallback((event: any) => {
    const message = event.nativeEvent.data;
    const payload = JSON.parse(message);
    try {
      if (payload?.name === 'finish') toggleAutoPlay();
    } catch (err) {
      return;
    }
    const handler = handlers[payload.name];
    handler && handler(payload.data);
  }, [toggleAutoPlay]);

  useEffect(() => {
    registerHandlers();
  }, [registerHandlers, videoId, scalesPageToFit]);

  useEffect(() => {
    getVimeoPlayer && getVimeoPlayer(player);
  }, [getVimeoPlayer, player]);

  return (
    <WebView
      source={{
        html: webplayer(videoId, loop, autoPlayValue, controls, speed),
      }}
      javaScriptEnabled={true}
      ref={ref}
      onMessage={onBridgeMessage}
      scalesPageToFit={false}
      onNavigationStateChange={a => console.log(a.url)}
      onError={(error) => console.error(error)}
      scrollEnabled={false}
      style={style}
      containerStyle={containerStyle}
      setBuiltInZoomControls={false}
      setDisplayZoomControls={false}
      automaticallyAdjustContentInsets
      allowsFullscreenVideo
    />
  );
};
