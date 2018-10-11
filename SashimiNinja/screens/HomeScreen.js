import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  // for now hardcode it to display home, 
  // later test displaying logged in username if reasonable
  static navigationOptions = {
    headerTitle: <Text>Home</Text>,
    headerLeft: (
      <LogoIcon />
    ),
    headerStyle: {
      backgroundColor: Colors.backgroundMain,
      borderBottomWidth: 0,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Pull in kanji and phrase of the day here</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundMain,
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
