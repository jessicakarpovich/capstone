import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';

/****** Display kanji and phrase of the day to the user *******/
/****** Update the content each new day the user logs in *******/
/****** Once you cycle through all the array indecies for kanji/phrase, *******/
/****** start over from index 0 *******/
export default class HomeScreen extends React.Component {

  // date: date stored in AsyncStorage for reference of the last day
  // -> only has the day value, obtained through date.getDay() (0-6)
  // dayIndex: track what day it is, starts from 0-endless
  // -> internal counter for displaying next data
  // kIndex and pIndex: calculated using the dayIndex
  // -> to display the kanji/phrase based on each array length
  // loaded: false until data is fully loaded, ready for display 
  state = {
    kanjiArray: null,
    phrasesArray: null,
    date: null,
    dayIndex: null,
    kIndex: null,
    pIndex: null,
    loaded: false,
  }

  // set logo icon and remove header bottom border
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate( 'Scores' )}
        >
          <LogoIcon />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: Colors.backgroundMain,
        borderBottomWidth: 0,
      },
    }
  };

  // get data from AsyncStorage 
  componentDidMount = async () => {
    await this.getData();
    this.calcKanjiPhrase();
  }

  getData = async () => {
    // create temp variable to store data into
    let temp;

    // try getting the kanji array from async storage
    try {
      temp = await AsyncStorage.getItem('kanji');
      // if available, set to state
      if (temp !== null) {
        this.setState({kanjiArray: JSON.parse(temp)});
      }
    } catch (err) {
      // console.log("Error getting kanji array", err);
    }

    // try getting the phrases array
    try {
      temp = await AsyncStorage.getItem('phrases');
      // if available, set to state
      if (temp !== null) {
        this.setState({phrasesArray: JSON.parse(temp)});
      }
    } catch (err) {
      // console.log("Error getting phrases array", err);
    }

    // try getting the date (day of the week as int 0-6)
    try {
      temp = await AsyncStorage.getItem('date');
      // if available, set to state
      if (temp !== null) {
        this.setState({date: JSON.parse(temp)});
      }
    } catch (err) {
      // console.lsog("Error getting date", err);
    }

    // try getting dayIndex
    try {
      temp = await AsyncStorage.getItem('dayIndex');
      // if available, set to state
      if (temp !== null) {
        this.setState({dayIndex: JSON.parse(temp)});
      }
    } catch (err) {
      // console.log("Error getting day index", err);
    }
  }

  // calc kanji/phrase to display using date and current date
  calcKanjiPhrase = async () => {
    // get current date
    let temp = new Date();
    let now = temp.getDay();

    // get day and day counter gotten from asyncstorage
    let date = this.state.date;
    let index = this.state.dayIndex;
    // initially, set kanjiArray and phrasesArray vars to null
    let kLength = null;
    let pLength = null;

    // if today is a different day from stored day, update it 
    if (now != date) {
      // if date has changed, update values used to choose kanji and phrase
      // add one to day index counter
      index = index+1;
      // set new day index and date
      this.setState({dayIndex: index});
      this.setState({date: date});
      // set these values to async storage too
      AsyncStorage.setItem('date', JSON.stringify(now));
      AsyncStorage.setItem('dayIndex', JSON.stringify(index));
    }
    // set kanji and phrases array indecies to dayIndex at first
    let kanjiIndex = index;
    let pIndex = index;

    // if kanji array has loaded, 
    if (this.state.kanjiArray) {
      // get the length
      kLength = this.state.kanjiArray.length;
    }
    // if phrases array has loaded,
    if (this.state.phrasesArray) {
      // set the length
      pLength = this.state.phrasesArray.length;
    }

    // logic to choose which kanji and phrase to show
    // if array length is greater than 0, 
    if (kLength > 0) {
      // calculate remainder
      kanjiIndex = index % kLength;
    }
    if (pLength > 0) {
      pIndex = index % pLength;
    }
    // set kanji and phrase index
    await this.setState({kIndex: kanjiIndex});
    await this.setState({pIndex: pIndex});

    // set loaded to true once done
    this.setState({loaded: true});
  }

  render() {
    const {
      loaded,
      kanjiArray,
      kIndex,
      phrasesArray,
      pIndex
    } = this.state

    // check that everything is loaded to avoid undefined
    // when trying to access kanji at kIndex in array
    if (!loaded || kanjiArray === null) {
      // set timeout for data to refresh
      setTimeout( this.calcKanjiPhrase, 5000)
      return (
        <ActivityIndicator size='large' />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentCont}>
          <Text style={styles.title}>Kanji of the Day</Text>
          <Text style={styles.character}>{kanjiArray[kIndex].kanji}</Text>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Kunyomi: </Text>
            <Text style={styles.labelText}>{kanjiArray[kIndex].kunyomi }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Onyomi: </Text>
            <Text style={styles.labelText}>{kanjiArray[kIndex].onyomi }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Meaning: </Text>
            <Text style={styles.labelText}>{kanjiArray[kIndex].meaning }</Text>
          </View>
        </View>

        <View style={styles.contentCont}>
          <Text style={styles.title}>Phrase of the Day</Text>
          <Text style={styles.phrase}>{phrasesArray[pIndex].hiragana }</Text>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Romaji: </Text>
            <Text style={styles.labelText}>{phrasesArray[pIndex].romaji }</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.boldLabelText}>Meaning: </Text>
            <Text style={styles.labelText}>{phrasesArray[pIndex].meaning }</Text>
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
    fontSize: 34,
    fontFamily: 'Merriweather-Black'
  },
  boldLabelText: {
    fontSize: 17,
    fontFamily: 'Merriweather-Black'
  },
  labelText: {
    fontSize: 17,
    fontFamily: 'Merriweather-Regular'
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
