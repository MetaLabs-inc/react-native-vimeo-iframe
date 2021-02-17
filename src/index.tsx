import React, {useCallback, useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {WebView} from 'react-native-webview';
import webplayer from './template';
import {LayoutProps} from './types';

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
}) => {
  const [isReady, setReady] = useState<boolean>();

  const [autoPlayValue, setAutoPlay] = useState<boolean>(autoPlay);
  const toggleAutoPlay = useCallback(() => setAutoPlay(!autoPlayValue), [
    autoPlayValue,
  ]);

  const handlers: any = {};
  const registerHandlers = () => {
    registerBridgeEventHandler('ready', onReady ?? onReadyDefault);
    registerBridgeEventHandler('play', onPlay);
    registerBridgeEventHandler('playProgress', onPlayProgress);
    registerBridgeEventHandler('pause', onPause);
    registerBridgeEventHandler('finish', onFinish);
  };

  const registerBridgeEventHandler = (eventName: string, handler: any) => {
    handlers[eventName] = handler;
  };

  useEffect(() => {
    registerHandlers();
  }, [videoId, scalesPageToFit]);

  const onBridgeMessage = (event: any) => {
    const message = event.nativeEvent.data;
    let payload;
    try {
      payload = JSON.parse(message);
      if (payload?.name === 'finish') {
        toggleAutoPlay();
      }
    } catch (err) {
      return;
    }
    let handler = handlers[payload.name];
    if (handler) handler(payload.data);
  };

  const onReadyDefault = () => {
    setReady(true);
    if (onReady) setTimeout(onReady);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleAutoPlay}>
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
    </TouchableWithoutFeedback>
  );
};
