import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Vimeo } from '../../src/index'
import { styles } from './styles'

const App = () => {
  const videoCallbacks = {
    timeupdate: (data: any) => console.warn('timeupdate: ', data),
    play: (data: any) => console.warn('play: ', data),
    pause: (data: any) => console.warn('pause: ', data),
    fullscreenchange: (data: any) => console.warn('fullscreenchange: ', data),
    ended: (data: any) => console.warn('ended: ', data),
    controlschange: (data: any) => console.warn('controlschange: ', data),
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>React Native Vimeo Iframe</Text>
        <View style={styles.videosContainer}>
          <Vimeo
            videoId={'712158285'}
            params={'api=1&autoplay=0'}
            handlers={videoCallbacks}
          />
          <Vimeo
            videoId={'712158996'}
            params={'autoplay=0'}
            handlers={videoCallbacks}
          />
          <Vimeo
            videoId={'712159936'}
            params={'api=1&autoplay=0'}
            handlers={videoCallbacks}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default App
