import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import KanaLabels from '../constants/KanaLabels';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';
import { Icon } from 'expo';

/*****  initail review screen with options for                          ******/
/*****  Hiragana, Katakana and Kanji                                    ******/
/*****  each option presents rows of where to start                     ******/
/*****  upon selecting a row, you get details of one character at a time ******/
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
        <TouchableOpacity 
          style={styles.largeBtn}
          onPress={() => this.props.navigation.navigate('Row', {type: 'Katakana'})}>
          <Text style={styles.largeBtnText}>Katakana</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.largeBtn}
          onPress={() => this.props.navigation.navigate('Row', {type: 'Kanji'})}>
          <Text style={styles.largeBtnText}>Kanji</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


/****** Screen with rows based on type: Hiragana, Katakana, Kanji *****/
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
    else if (this.state.type == 'Katakana') {
      // set the labels with Katakana labels
      this.setState({rowLabeles: KanaLabels.katakanaRowTitles});
    }
    // only planning to include 1 kanji level so hardcode it for now
    else {
      this.setState({rowLabeles: ["Level 1"]});
    }
  }

  // rowBtns allow the user to jump to a specific row
  render() {
    let rowBtns = this.state.rowLabeles.map((label, i) => {
      return (
        <TouchableOpacity 
          style={styles.rowBtn}
          key={label}
          onPress={() => this.props.navigation.navigate('Detail', {type: this.state.type, i: i})}>
            <Text style={styles.rowBtnText}>{ label }</Text>
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


/****** Detail screen for each character                        *****/
/****** back and next buttons allow user to go through full set, ******/
/******  regardless of what row was initially selected           ******/
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
        characterArray: [],
      };
  }

  componentDidMount() {
    this.setState({ characterIndex: this.state.indecies[this.state.index]});

    // get array from AsyncStorage
    AsyncStorage.getItem(this.state.type.toLowerCase())
      .then((characterArray) => {
        // check for valid data
        if (characterArray) {
          try {
            // parse it to JSON
            let temp = JSON.parse(characterArray);
            this.setState({characterArray: temp});
          } catch(e) {
            console.log("Error in retrieving character array. " + e.message);
          }
        }
      })
  }

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
    let data = {};
    // initially disable back and next buttons, 
    // then enable based on characterIndex
    let backDisabled = false;
    let nextDisabled = false;
    if (this.state.characterArray.length > 0) {
      data = this.state.characterArray[this.state.characterIndex];
    }
    if (this.state.characterIndex == 0) {
      backDisabled = true;
    } else if (this.state.characterIndex == this.state.characterArray.length-1) {
      nextDisabled = true;
    }

    // if kana, display kana data
    if (this.state.type !== 'Kanji') {
      if (!data.romaji)
        data.romaji = "";
      data.romaji = data.romaji.toUpperCase();
      return (
        <View style={styles.container}>
          <View style={styles.rowCenter}>
            <Text style={styles.regularText}>{this.state.type} </Text>
            <Text style={styles.regularText}>{data.romaji}</Text>
          </View>
          <View style={styles.rowAround}>
            <Icon.Ionicons
              name='ios-arrow-back'
              size={60}
              style={styles.icon}
              disabled={backDisabled}
              onPress={this.viewPrevious}
            />
            <Text style={styles.character}>{ data.character }</Text>
            <Icon.Ionicons
              name='ios-arrow-forward'
              size={60}
              style={styles.icon}
              disabled={nextDisabled}
              onPress={this.viewNext}
            />
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Romaji: </Text>
            <Text style={styles.labelText}>{ data.romaji }</Text>
          </View>
        </View>
      );
    } else {
      // else, show kanji data with readings
      return (
        <View style={styles.container}>
          <View style={styles.rowCenter}>
            <Text style={styles.regularText}>{this.state.type} - </Text>
            <Text style={styles.regularText}>{data.meaning}</Text>
          </View>
          <View style={styles.rowAround}>
            <Icon.Ionicons
              name='ios-arrow-back'
              size={60}
              style={styles.icon}
              disabled={backDisabled}
              onPress={this.viewPrevious}
            />
            <Text style={styles.character}>{ data.kanji }</Text>
            <Icon.Ionicons
              name='ios-arrow-forward'
              size={60}
              style={styles.icon}
              disabled={nextDisabled}
              onPress={this.viewNext}
            />
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Kunyomi: </Text>
            <Text style={styles.labelText}>{ data.kunyomi }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Onyomi: </Text>
            <Text style={styles.labelText}>{ data.onyomi }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Meaning: </Text>
            <Text style={styles.labelText}>{ data.meaning }</Text>
          </View>
        </View>
      );
    }
  }

  viewPrevious = () => {
    // check that there is a previous character
    if (this.state.characterIndex > 0) {
      this.setState({characterIndex: this.state.characterIndex-1});
    }
  }

  viewNext = () => {
    // check that there is a next character
    if (this.state.characterIndex !== this.state.characterArray.length-1) {
      this.setState({characterIndex: this.state.characterIndex+1});
    }
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
  rowBtn: {
    height: 66,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowBtnText: {
    fontSize: 30,
    marginLeft: 24,
  },
  icon: {
    color: Colors.altColor,
  },

  centerText: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  

  regularText: {
    fontSize: 20,
  },
  boldLabelText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  labelText: {
    fontSize: 17,
  },
  character: {
    fontSize: 180,
    marginTop: 76,
    marginBottom: 76,
  },
});