import React from 'react';
import { Image, } from 'react-native';

// this class is for the shuriken icon on the top left to access the high scores
// add clickable qualities later
export default class LogoIcon extends React.Component {
    render() {
      return (
        <Image
        source={require('../assets/noun_Shuriken.png')}
        style={{ width: 40, height: 40, marginLeft: 22.5}}
      />
      );
    }
  }