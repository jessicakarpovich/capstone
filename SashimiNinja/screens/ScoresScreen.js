import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class ScoresScreen extends React.Component {
  static navigationOptions = ({ navigation}) => ({
    title: 'Scores',
    headerLeft: (
      <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <LogoIcon />
        </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  });

  render() {
    return (
      <View>
        <Text>Recent Scores</Text>
      </View>
    );
  }
}