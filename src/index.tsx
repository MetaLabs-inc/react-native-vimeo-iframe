import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import { HandlerType, LayoutProps, PlayerEvents } from './types'

export const Vimeo: React.FC<LayoutProps> = ({
  videoId,
  handlers: handlersArr,
  scalesPageToFit,
  loop = false,
  controls = true,
  autoPlay = false,
  speed = true,
  containerStyle,
  time = '0m0s',
}) => {
  const webRef = useRef<WebView>();
  const [autoPlayValue, setAutoPlay] = useState<boolean>(Boolean(autoPlay))
  const muted = Platform.OS === 'android' && autoPlayValue
  const toggleAutoPlay = useCallback(() => setAutoPlay(!autoPlayValue), [
    autoPlayValue,
  ]);

  const url: string = `https://player.vimeo.com/video/${videoId}?api=1&autoplay=${Number(autoPlay)}&loop=${Number(loop)}&controls=${Number(controls)}&speed=${Number(speed)}&muted=${Number(muted)}#t=${time}`;
  const handlers: any = {}

  const registerHandlers = useCallback(() => {
    PlayerEvents.forEach(name => {
      handlers[name] = handlersArr?.filter((handler: HandlerType) => handler.name === name)[0]?.callback;
    });
  }, [handlersArr]);

  useEffect(() => {
    registerHandlers()
  }, [videoId, scalesPageToFit])

  const onBridgeMessage = useCallback(
    (event: any) => {
      const payload: { name: string, data: any } = JSON.parse(event.nativeEvent.data);
      
      let bridgeMessageHandler = handlers[payload?.name]
      if (bridgeMessageHandler) bridgeMessageHandler(payload?.data)
    },
    [toggleAutoPlay, handlers]
  )

  return (
    <WebView
      allowsFullscreenVideo={true}
      source={{ uri: url }}
      javaScriptEnabled={true}
      ref={webRef as any}
      onMessage={onBridgeMessage}
      bounces={false}
      scrollEnabled={false}
      scalesPageToFit={scalesPageToFit}
      onError={(error) => console.error(error)}
      containerStyle={containerStyle}
      setBuiltInZoomControls={false}
      setDisplayZoomControls={false}
      automaticallyAdjustContentInsets
      onNavigationStateChange={(a) => console.log(a?.url)}
      injectedJavaScript={`
        const getOrientation = () => {
          const orientation = document.fullscreenElement  ? 'landscape' : 'portrait';
          return orientation;
        };
        
        const sendEvent = (name, data) => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ name, data }));
        };

        (() => {
          setTimeout(() => {
            const video = document.querySelector('video');

            window.addEventListener("fullscreenchange", (e) => {
              const orientation = getOrientation();
              sendEvent('fullscreenchange', { e, orientation });
            }, false);
            
            video.addEventListener("timeupdate", (e) => {
              const percent = Math.round((e.target.currentTime / e.target.duration)*100).toFixed();
              sendEvent('timeupdate', { currentTime: e.target.currentTime, duration: e.target.duration, percent });
            });

            video.addEventListener('audioprocess', (e) => sendEvent('audioprocess', e));
            video.addEventListener('canplay', (e) => sendEvent('canplay', e));
            video.addEventListener('canplaythrough', (e) => sendEvent('canplaythrough', e));
            video.addEventListener('complete', (e) => sendEvent('complete', e));
            video.addEventListener('durationchange', (e) => sendEvent('durationchange', e));
            video.addEventListener('emptied', (e) => sendEvent('emptied', e));
            video.addEventListener('ended', (e) => sendEvent('ended', e));
            video.addEventListener('loadeddata', (e) => sendEvent('loadeddata', e));
            video.addEventListener('loadedmetadata', (e) => sendEvent('loadedmetadata', e));
            video.addEventListener('pause', (e) => sendEvent('pause', e));
            video.addEventListener('play', (e) => sendEvent('play', e));
            video.addEventListener('playing', (e) => sendEvent('playing', e));
            video.addEventListener('ratechange', (e) => sendEvent('ratechange', e));
            video.addEventListener('seeked', (e) => sendEvent('seeked', e));
            video.addEventListener('seeking', (e) => sendEvent('seeking', e));
            video.addEventListener('stalled', (e) => sendEvent('stalled', e));
            video.addEventListener('suspend', (e) => sendEvent('suspend', e));
            video.addEventListener('timeupdate', (e) => sendEvent('timeupdate', e));
            video.addEventListener('volumechange', (e) => sendEvent('volumechange', e));
            video.addEventListener('waiting', (e) => sendEvent('waiting', e));
          }, 1000);
        })();
      `}
    />
  )
}