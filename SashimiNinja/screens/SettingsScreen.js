import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation}) => ({
    title: 'Settings',
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.navigate( 'Scores' )}
      >
        <LogoIcon />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate( 'Resources' )}
      >
        <HelpIcon />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  });

  render() {
    return (
      <View>
        <Text>Hellp Settings</Text>
      </View>
    );
  }
}
