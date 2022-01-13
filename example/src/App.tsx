import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { WebVideo } from '../../src/index';

const App = () => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <WebVideo 
          url={url}
          handlers={videoCallbacks}
        />
      </View>
    </SafeAreaView>
  )
}

import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
})

export default App
