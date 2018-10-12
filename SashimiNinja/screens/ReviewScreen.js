import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

// initail review screen with options for
// Hiragana, Katakana and Kanji
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

  // pass character type to row screen
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>Please select what to review.</Text>

        <TouchableOpacity 
          style={styles.largeBtn} 
          onPress={() => this.props.navigation.navigate('Row', {type: 'Hiragana'})}>
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

// TO-DO:
// figure out how to pass props to detail screen to select between kana/kanji
// use it to display correct rows
// for kanji, hardcode it to level 1 until db connection fully integrated
export class ReviewRowScreen extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        type: this.props.navigation.state.params.type,
      };
  }

  // instead of button to view scores, it has back button
  // use the param to set the title in nav
  static navigationOptions = ({ navigation}) => ({
    title: 'Review - ' + navigation.state.params.type,
    headerRight: (
      <HelpIcon />
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>Start from:</Text>

        <TouchableOpacity 
          style={styles.largeBtn} 
          onPress={() => this.props.navigation.navigate('Detail', {type: 'Hiragana', index: 4})}>
            <Text style={styles.largeBtnText}>Hiragana</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export class ReviewDetailScreen extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        type: this.props.navigation.state.params.type,
        index: this.props.navigation.state.params.index,
      };
  }

  // TO-DO: figure out how to change title when user starts next row
  static navigationOptions = ({ navigation}) => ({
    title: 'Review - ' + navigation.state.params.type,
    headerRight: (
      <HelpIcon />
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  });

  // use index from state to display correct character
  // use type to know what information to show
  // have if check for kana/kanji
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>{this.state.type} - {this.state.index}</Text>
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