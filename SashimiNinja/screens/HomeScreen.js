import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

  // date is the date stored in AsyncStorage for reference
  // dayIndex is to track what day it is, starts from 0
  // kIndex and pIndex are calculated using the dayIndex
  // to display a different kanji/phrase based on length of each array
  state = {
    kanjiArray: [],
    phrasesArray: [],
    date: 0,
    dayIndex: 0,
    kIndex: 0,
    pIndex: 0,
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
  componentDidMount() {
    // get kanji array from AsyncStorage
    AsyncStorage.getItem('kanji')
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
      })
    // get phrases array from AsyncStorage
    AsyncStorage.getItem('phrases')
      .then((phrasesArray) => {
        // check for valid data
        if (phrasesArray) {
          try {
            // parse it to JSON
            let temp = JSON.parse(phrasesArray);
            this.setState({phrasesArray: temp});
          } catch(e) {
            console.log("Error in retrieving array. " + e.message);
          }
        }
      })
    // get date from AsyncStorage
    AsyncStorage.getItem('date', (err, date) => {
      // check for valid data
      if (date !== null) {
        // parse it to JSON
        let temp = JSON.parse(date);
        this.setState({date: temp});
      } if (err) {
        console.log(err); 
      }
    })
    // get dayIndex from AsyncStorage
    AsyncStorage.getItem('dayIndex')
      .then((index) => {
        // check for valid data
        if (index) {
          try {
            this.setState({dayIndex: JSON.parse(index)});
          } catch(e) {
            console.log("Error in retrieving date. " + e.message);
          }
        }
      })

    // calc dayIndex, kIndex, and pIndex
    this.calcKanjiPhrase();
  }

  calcKanjiPhrase = async () => {
    // get current date
    let temp = new Date();
    let now = temp.getDay();
    let index = this.state.dayIndex;

    // if today is a different day from stored day, update it 
    if (now != this.state.date) {
      // if date has changed, update values used to choose kanji and phrase
      console.log("Not");

      // TO-DO: complete the logic to update values
      // test with different dates to make sure it works
      index++;
      this.setState({dayIndex: index});

    }
    let kLength = this.state.kanjiArray.length;
    let kanjiIndex = 0;
    let pLength = this.state.phrasesArray.length;
    let pIndex = 0;

    // logic to choose which kanji and phrase to show
    if (index < kLength) {
      kanjiIndex = index;
    } else {
      kanjiIndex = index % kLength;
    }
    if (index < pLength) {
      pIndex = index;
    } else {
      pIndex = index % pLength;
    }
    this.setState({kIndex: kanjiIndex});
    this.setState({pIndex: pIndex});
  }

  render() {
    // later look into simplifying this
    // currently keeping to avoid undefined errors on render
    let kanjiArray = [{}];
    let phrasesArray = [{}];
    let kIndex = 0;
    let pIndex = 0;
    if (this.state.kanjiArray.length > 0) {
      kanjiArray = this.state.kanjiArray;
    }
    if (this.state.kIndex) {
      kIndex = this.state.kIndex;
    }
    if (this.state.phrasesArray.length > 0) {
      phrasesArray = this.state.phrasesArray;
    }
    if (this.state.pIndex) {
      pIndex = this.state.pIndex;
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentCont}>
          <Text style={styles.title}>Kanji of the Day</Text>
          <Text style={styles.character}>{kanjiArray[kIndex].kanji}</Text>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Kunyomi: </Text>
            <Text style={styles.labelText}>{ kanjiArray[kIndex].kunyomi }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Onyomi: </Text>
            <Text style={styles.labelText}>{ kanjiArray[kIndex].onyomi }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Meaning: </Text>
            <Text style={styles.labelText}>{ kanjiArray[kIndex].meaning }</Text>
          </View>
        </View>

        <View style={styles.contentCont}>
          <Text style={styles.title}>Phrase of the Day</Text>
          <Text style={styles.phrase}>{ phrasesArray[pIndex].hiragana }</Text>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Romaji: </Text>
            <Text style={styles.labelText}>{ phrasesArray[pIndex].romaji }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Meaning: </Text>
            <Text style={styles.labelText}>{ phrasesArray[pIndex].meaning }</Text>
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
