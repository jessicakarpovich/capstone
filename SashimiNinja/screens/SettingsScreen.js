import React from 'react';
import { Text, View, } from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerLeft: (
      <LogoIcon />
    ),
    headerRight: (
      <HelpIcon />
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  };

  render() {
    return (
      <View>
        <Text>Hellp Settings</Text>
      </View>
    );
  }
}
