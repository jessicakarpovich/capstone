import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import { MonoText } from '../components/StyledText';
import { app } from 'firebase';

export default class HomeScreen extends React.Component {

  // date is the date stored in AsyncStorage for reference
  // dayIndex is to track what day it is, starts from 0
  // kIndex and pIndex are calculated using the dayIndex
  // to display a different kanji/phrase based on length of each array
  state = {
    kanjiArray: null,
    phrasesArray: null,
    date: null,
    dayIndex: null,
    kIndex: null,
    pIndex: null,
    loaded: false,
  }

  // for now hardcode it to display home, 
  // later test displaying logged in username if reasonable
  static navigationOptions = {
    title: 'Home',
    headerLeft: (
      <LogoIcon />
    ),
    headerStyle: {
      backgroundColor: Colors.backgroundMain,
      borderBottomWidth: 0,
    },
  };

  // get data from AsyncStorage 
  async componentDidMount() {
    await this.getData();
    this.calcKanjiPhrase();
  }

  getData = async () => {
    let temp;
    // get kanji array from AsyncStorage
    /*AsyncStorage.getItem('kanji')
      .then((kanjiArray) => {
        // check for valid data
        if (kanjiArray) {
          try {
            // parse it to JSON
            let temp = JSON.parse(kanjiArray);
            this.setState({kanjiArray: temp});
          } catch(e) {
            console.log("Error in retrieving character array. " + e.message);
          }
        }
      })*/
    try {
      temp = await AsyncStorage.getItem('kanji');
      if (temp !== null) {
        this.setState({kanjiArray: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting kanji array", err);
    }
    try {
      temp = await AsyncStorage.getItem('phrases');
      if (temp !== null) {
        this.setState({phrasesArray: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting phrases array", err);
    }
    try {
      temp = await AsyncStorage.getItem('date');
      if (temp !== null) {
        this.setState({date: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting date", err);
    }
    // get date from AsyncStorage
    /*AsyncStorage.getItem('date', (err, date) => {
      // check for valid data
      if (date !== null) {
        // parse it to JSON
        let appDate = JSON.parse(date);
        this.setState({date: appDate});
      } if (err) {
        console.log(err); 
      }
    })*/
    try {
      temp = await AsyncStorage.getItem('dayIndex');
      if (temp !== null) {
        console.log(temp);
        this.setState({dayIndex: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting day index", err);
    }
    // get dayIndex from AsyncStorage
    /*AsyncStorage.getItem('dayIndex')
      .then((index) => {
        // check for valid data
        if (index) {
          try {
            dayIndex = JSON.parse(index);
            this.setState({dayIndex: dayIndex});
          } catch(e) {
            console.log("Error in retrieving date. " + e.message);
          }
        }
      })*/
    

    //this.setState({loaded: true});
  }

  calcKanjiPhrase = () => {
    // get current date
    let temp = new Date();
    let now = temp.getDay();
    let date = this.state.date;
    let index = this.state.dayIndex;
    let kLength = null;
    let pLength = null;

    // if today is a different day from stored day, update it 
    if (now != date) {
      console.log(now);
      console.log(date);
      // if date has changed, update values used to choose kanji and phrase
      console.log("Not");
      // TO-DO: complete the logic to update values
      // test with different dates to make sure it works
      index = index+1;
      this.setState({dayIndex: index});
      this.setState({date: date});

      AsyncStorage.setItem('date', JSON.stringify(now));
      AsyncStorage.setItem('dayIndex', JSON.stringify(index));
    }
    if (this.state.kanjiArray) {
      kLength = this.state.kanjiArray.length;
      console.log("sadsa");
      console.log(kLength);
    }
    let kanjiIndex = index;
    if (this.state.phrasesArray) {
      pLength = this.state.phrasesArray.length;
    }
    let pIndex = index;

    // logic to choose which kanji and phrase to show
    if (index < kLength) {
      kanjiIndex = index;
    } else if (kLength > 0) {
      kanjiIndex = index % kLength;
      console.log("daw");
      console.log(index);
      console.log(kLength);
      console.log(kanjiIndex);
    }
    if (index < pLength) {
      pIndex = index;
    } else if (pLength > 0) {
      pIndex = index % pLength;
    }
    this.setState({kIndex: kanjiIndex});
    this.setState({pIndex: pIndex});

    this.setState({loaded: true});
  }

  render() {
    //if (!this.state.kanjiArray || !this.state.kIndex) {
    if (!this.state.loaded) {
      //console.log(this.state.kanjiArray);
      //console.log(this.state.kIndex);
      return (
        <Text>Hello</Text>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentCont}>
          <Text style={styles.title}>Kanji of the Day</Text>
          <Text style={styles.character}>{this.state.kanjiArray[this.state.kIndex].kanji}</Text>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Kunyomi: </Text>
            <Text style={styles.labelText}>{ this.state.kanjiArray[this.state.kIndex].kunyomi }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Onyomi: </Text>
            <Text style={styles.labelText}>{ this.state.kanjiArray[this.state.kIndex].onyomi }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Meaning: </Text>
            <Text style={styles.labelText}>{ this.state.kanjiArray[this.state.kIndex].meaning }</Text>
          </View>
        </View>

        <View style={styles.contentCont}>
          <Text style={styles.title}>Phrase of the Day</Text>
          <Text style={styles.phrase}>{ this.state.phrasesArray[this.state.pIndex].hiragana }</Text>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Romaji: </Text>
            <Text style={styles.labelText}>{ this.state.phrasesArray[this.state.pIndex].romaji }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Meaning: </Text>
            <Text style={styles.labelText}>{ this.state.phrasesArray[this.state.pIndex].meaning }</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundMain,
  },
  contentCont: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 34,
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
    marginVertical: 6,
  },
  phrase: {
    fontSize: 30,
    marginVertical: 10,
  }
});
