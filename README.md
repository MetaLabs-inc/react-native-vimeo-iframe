# React Native Vimeo Iframe

React Native Vimeo Iframe is a library to render Vimeo videos in a React Native app.
This component allows you to embed a Vimeo video in your app and have full access to
the Vimeo player JS API (more information https://developer.vimeo.com/player/js-api).

## Installation

1. Go through the instructions for installing the
   `React Native Webview` library: https://github.com/react-native-webview/react-native-webview.
2. Run `npm install react-native-vimeo-iframe` or `yarn add react-native-vimeo-iframe` within your project.
3. Compile and build to make sure everything is set up properly.

## Usage

```
  const videoCallbacks = {
    timeupdate: (data: any) => console.log('timeupdate: ', data),
    play: (data: any) => console.log('play: ', data),
    pause: (data: any) => console.log('pause: ', data),
    fullscreenchange: (data: any) => console.log('fullscreenchange: ', data),
    ended: (data: any) => console.log('ended: ', data),
    controlschange: (data: any) => console.log('controlschange: ', data),
  };

  return (
     <Vimeo
            videoId={'712158285'}
            params={'api=1&autoplay=0'}
            handlers={videoCallbacks}
          />
  )
```

## Supported listeners

```
'controlschange', // The visibility of the controls changed.
'fullscreenchange', // The orientation was changed.
'audioprocess', // A entrada do buffer de ScriptProcessorNode está pronta para ser processada
'canplay', // The browser can play the file, but estimates that there will not be enough data to play the file without interruption to reload the buffer.
'canplaythrough', // The browser estimates that it will be able to play the file without interruption until the end.
'complete', // OfflineAudioContext rendering is finished.
'durationchange', // The duration attribute has been updated.
'emptied', // Absence of content. For example, this event is sent if the media has been loaded (or partially) and the load() method has been called to reload the content.
'ended', // Playback ended due to end of content
'loadeddata', // The first frame of media has been loaded.
'loadedmetadata', // The metadata has been loaded.
'pause', // Playback has been paused.
'play', // Playback has started.
'playing', // Playback is ready to start after being paused, or delayed due to lack of data.
'ratechange', // Playback rate has changed.
'seeked', // Search operation completed.
'seeking', // Search operation started.
'stalled', // The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
'suspend', // Media data loading has been suspended.
'timeupdate', // The time indicated by the currentTime attribute has been updated.
'volumechange', // The volume has changed.
'waiting'
```

## Available Props

| Name         | Type                     | Default   | Description                                                                      |
| ------------ | ------------------------ | --------- | -------------------------------------------------------------------------------- |
| `handlers`   | `{ [key: string]: any }` | {}        | Listeners to be attached in the Vimeo Player                                     |
| `videoId`    | `string`                 | undefined | The video id which will be rendered                                              |
| `params`     | `string`                 | undefined | Extra params to be attached on the vimeo player url                              |
| `reference`  | `string`                 | undefined | In order to support private videos you can specify the reference prop            |
| `otherProps` | `WebViewProps`           | {}        | To customize the webview that wraps the player, you can specify additional props |

## Example

If you want to see `MetaLabs-inc/react-native-vimeo-iframe` in action, just move into the [example](/example) folder and run `yarn && cd ios && pod install && cd .. && yarn ios` or `yarn && yarn android`. By seeing its source code, you will have a better understanding of the library usage.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Marcoo09"><img src="https://avatars.githubusercontent.com/Marcoo09" width="100px;" alt=""/><br /><sub><b>Marco Fiorito</b></sub></a></td>
    <td align="center"><a href="https://github.com/douglasrosa0110"><img src="https://avatars.githubusercontent.com/douglasrosa0110" width="100px;" alt=""/><br /><sub><b>Douglas Rosa</b></sub></a></td>
    <td align="center"><a href="https://github.com/felipe-najson"><img src="https://avatars.githubusercontent.com/felipe-najson" width="100px;" alt=""/><br /><sub><b>Felipe Najson</b></sub></a></td>
    <td align="center"><a href="https://github.com/yjb94"><img src="https://avatars.githubusercontent.com/yjb94" width="100px;" alt=""/><br /><sub><b>JB Paul</b></sub></a></td>
    <td align="center"><a href="https://github.com/SalmanK81099"><img src="https://avatars.githubusercontent.com/SalmanK81099" width="100px;" alt=""/><br /><sub><b>Salman Khan</b></sub></a></td>
  </tr>
</table>

## Acknowledgements

- [@Myagi](https://github.com/Myagi) for `react-native-vimeo`, I based on that library to make that library with the latest versions of react-native.
