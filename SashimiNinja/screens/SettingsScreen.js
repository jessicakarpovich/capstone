import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class SettingsScreen extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      signedIn: false
    }
  }

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
    const {
      signedIn
    } = this.state

    return (
      <TouchableOpacity style={styles.row}>
        {
          signedIn
          ? <Text style={styles.text}>Logout</Text>
          : <Text style={styles.text}>Sign In with Google</Text>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    backgroundColor: Colors.backgroundMain
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Merriweather-Bold',
    fontSize: 20
  }
})