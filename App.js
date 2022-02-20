import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  Viro360Image,
  ViroARTrackingTargets,
  ViroARImageMarker
} from '@viro-community/react-viro';

import BackgroundImage from './assets/westlake_towers.jpeg';
import WeWorkImage from './assets/wework_title.png';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }


  function onBackgroundPhotoLoadEnd(){
    console.log('background photo load end');
  }



  ViroARTrackingTargets.createTargets({
    "firstImage" : {
      source : require ('./assets/bg.jpeg'),
      orientation : "Up",
      physicalWidth : 0.165
    },
  });

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARImageMarker target={"firstImage"} >
        <Viro360Image source={BackgroundImage} onLoadEnd={onBackgroundPhotoLoadEnd}/>
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
