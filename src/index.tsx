import React, { useCallback, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

import webplayer from '../lib/template';
import { LayoutProps } from '../lib/types';

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
}) => {
  const [autoPlayValue, setAutoPlay] = useState<boolean>(autoPlay);
  const handlers: any = {};

  const toggleAutoPlay = useCallback(() => {
    setAutoPlay(!autoPlayValue);
  }, [autoPlayValue]);

  const onReadyDefault = useCallback(() => {
    onReady && setTimeout(onReady);
  }, []);

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

  return (
    <WebView
      source={{
        html: webplayer(videoId, loop, autoPlayValue, controls, speed),
      }}
      javaScriptEnabled={true}
      bounces={false}
      onMessage={onBridgeMessage}
      scalesPageToFit={scalesPageToFit}
      onError={(error) => console.error(error)}
      style={[
        {
          marginTop: -8,
          marginLeft: -10,
        },
        style,
      ]}
    />
  );
};
