import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class ReviewScreen extends React.Component {
  static navigationOptions = {
    title: 'Review',
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
      <View style={styles.container}>
        <Text style={styles.centerText}>Please select what to review.</Text>

        <TouchableOpacity style={styles.largeBtn}>
          <Text style={styles.largeBtnText}>Hiragana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeBtn}>
          <Text style={styles.largeBtnText}>Katakana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeBtn}>
          <Text style={styles.largeBtnText}>Kanji</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  largeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  largeBtnText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  }
});
