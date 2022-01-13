# React Native Vimeo Iframe
Library to render videos in a React Native app as a webview.
This component allows you to embed a video in your app and listen actions.

## Installation
1. Go through the instructions for installing the
   `React Native Webview` library: https://github.com/react-native-webview/react-native-webview.
2. Run `yarn add react-native-web-video` within your project.
3. Compile and build to make sure everything is set up properly.

## Usage
```
  const videoId = 76979871;
  const params: string = `api=1&autoplay=0`;
  const url: string = `https://player.vimeo.com/video/${videoId}?${params}`;
  const videoCallbacks = { 
    timeupdate: (data: any) => console.log('timeupdate: ', data),
    play: (data: any) => console.log('play: ', data),
    pause: (data: any) => console.log('pause: ', data),
    fullscreenchange: (data: any) => console.log('fullscreenchange: ', data),
    ended: (data: any) => console.log('ended: ', data),
    controlschange: (data: any) => console.log('controlschange: ', data),
  };

  return (
    <WebVideo url={url} handlers={videoCallbacks} />
  )
```

## Supported listeners
```
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
'waiting'
```

Internally, a webview loads a HTML page. This HTML page loads your
Vimeo video in an iFrame, then uses the Froogaloop JS library provided by Vimeo to pass event
information to your application.

## Example
If you want to see `conquer-plus/react-native-web-video` in action, just move into the [example](/example) folder and run `yarn && cd ios && pod install && cd .. && yarn ios` or `yarn && yarn android`. By seeing its source code, you will have a better understanding of the library usage.

## Contributors
<table>
  <tr>
    <td align="center"><a href="https://github.com/Marcoo09"><img src="https://avatars.githubusercontent.com/Marcoo09" width="100px;" alt=""/><br /><sub><b>Marco Fiorito</b></sub></a></td>
    <td align="center"><a href="https://github.com/douglasrosa0110"><img src="https://avatars.githubusercontent.com/douglasrosa0110" width="100px;" alt=""/><br /><sub><b>Douglas Rosa</b></sub></a></td>
  </tr>
</table>