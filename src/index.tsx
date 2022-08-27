import React, { useCallback, useRef } from 'react'
import { WebView } from 'react-native-webview'

import template from './template'
import { LayoutProps, PlayerEvents } from './types'

export const Vimeo: React.FC<LayoutProps> = ({
  handlers: handlersArr,
  videoId,
  params,
  reference,
  ...otherProps
}) => {
  const webRef = useRef<WebView>()
  const url: string = params
    ? `https://player.vimeo.com/video/${videoId}?${params}`
    : `https://player.vimeo.com/video/${videoId}`

  const handlers: any = {}

  const registerHandlers = useCallback(() => {
    PlayerEvents.forEach((name) => {
      if (handlersArr) handlers[name] = handlersArr[name]
    })
  }, [handlers, handlersArr])

  registerHandlers()

  const onBridgeMessage = useCallback(
    (event: any) => {
      const payload: { name: string; data: any } = JSON.parse(
        event.nativeEvent.data
      )

      let bridgeMessageHandler = handlers[payload?.name]
      if (bridgeMessageHandler) bridgeMessageHandler(payload?.data)
    },
    [handlers]
  )

  return (
    <WebView
      allowsFullscreenVideo={true}
      source={{ uri: url,headers: { Referer: reference }, }}
      javaScriptEnabled={true}
      ref={webRef as any}
      onMessage={onBridgeMessage}
      scrollEnabled={false}
      onNavigationStateChange={(a) => console.log(a?.url)}
      injectedJavaScript={template(url)}
      {...otherProps}
    />
  )
}
