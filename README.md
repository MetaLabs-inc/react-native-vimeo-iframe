# React Native Vimeo Iframe

React Native Vimeo Iframe is a library to render Vimeo videos in a React Native app.
This component allows you to embed a Vimeo video in your app and have full access to
the Vimeo player JS API (more information https://developer.vimeo.com/player/js-api).

## Installation

1. Go through the instructions for installing the
   `React Native Webview` library: https://github.com/react-native-webview/react-native-webview.
2. Run `yarn add react-native-web-video` within your project.
3. Compile and build to make sure everything is set up properly.

## Usage

```
        <Vimeo
          videoId={'76979871'}
          onReady={() => console.log('Video is ready')}
          onPlay={() => console.log('Video is playing')}
          onPlayProgress={(data) => console.log('Video progress data:', data)}
          onFinish={() => console.log('Video is finished')}
          loop={false}
          autoPlay={false}
          controls={true}
          speed={false}
          time={'0m0s'}
        />
```

## How it works

Internally, a webview loads a HTML page. This HTML page loads your
Vimeo video in an iFrame, then uses the Froogaloop JS library provided by Vimeo to pass event
information to your application.

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
    <td align="center"><a href="https://github.com/felipe-najson"><img src="https://avatars.githubusercontent.com/felipe-najson" width="100px;" alt=""/><br /><sub><b>Douglas Rosa</b></sub></a></td>
  </tr>
</table>

## Acknowledgements

- [@Myagi](https://github.com/Myagi) for `react-native-vimeo`, I based on that library to make that library with the latest versions of react-native.
