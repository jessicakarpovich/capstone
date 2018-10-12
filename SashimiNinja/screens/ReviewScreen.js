import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import KanaLabels from '../constants/KanaLabels';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

// initail review screen with options for
// Hiragana, Katakana and Kanji
// each option presents rows of where to start
// upon selecting a row, you get details of one character at a time
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
        rowLabeles: [],
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

  componentDidMount() {
    // if user asked for Hiragana,
    if (this.state.type == 'Hiragana') {
      // set the labels with Hiragana labels
      this.setState({rowLabeles: KanaLabels.hiraganaRowTitles});
    }
  }

  // rowBtns allow the user to jump to a specific row
  render() {
    let rowBtns = this.state.rowLabeles.map((label, i) => {
      return (
        <TouchableOpacity 
          style={styles.largeBtn}
          key={label}
          onPress={() => this.props.navigation.navigate('Detail', {type: 'Hiragana', i: i})}>
            <Text>{ label }</Text>
        </TouchableOpacity>);
      });

    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>Start from:</Text>
        <ScrollView>{rowBtns}</ScrollView>
      </View>
    );
  }
}


export class ReviewDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    // use type to know Hiragana/Katakana/Kanji
    // use index to know row
    // use indecies with index to get first character in row
    // use characterIndex to keep track of current character
      this.state = {
        type: this.props.navigation.state.params.type,
        index: this.props.navigation.state.params.i,
        indecies: KanaLabels.kanaIndecies,
        characterIndex: 0,
      };
  }

  componentDidMount() {
    this.setState({ characterIndex: this.state.indecies[this.state.index]});
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
        <Text style={styles.centerText}>{this.state.type} - {this.state.characterIndex}</Text>
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