import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { Vimeo } from '../../src/index';

const App = () => {
  const videoCallbacks = { 
    timeupdate: (data: any) => console.log('timeupdate: ', data),
    play: (data: any) => console.log('play: ', data),
    pause: (data: any) => console.log('pause: ', data),
    fullscreenchange: (data: any) => console.log('fullscreenchange: ', data),
    ended: (data: any) => console.log('ended: ', data),
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Vimeo
          videoId={'76979871'}
          handlers={Object.keys(videoCallbacks).map((name) => ({ name, callback: videoCallbacks[name] }))}
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
