import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet, 
  Dimensions,
  AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';

export default class ResourcesScreen extends React.Component {
  static navigationOptions = {
    title: 'Resources',
    headerLeft: (
      <LogoIcon />
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      kanjiArray: null,
      phrasesArray: null,
      translation: null,
    }
  }

  // get data from AsyncStorage 
  componentDidMount = async () => {
    await this.getData();
    
    let translated = false;
    translated = await this.checkKanjiMatch('おはようございます', translated);
    if (!translated)
      translated = await this.checkPhrasesMatch('おはようございます', translated);

    console.log(this.state.translation)
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
      console.log("Error getting kanji array", err);
    }

    // try getting the phrases array
    try {
      temp = await AsyncStorage.getItem('phrases');
      // if available, set to state
      if (temp !== null) {
        this.setState({phrasesArray: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting phrases array", err);
    }
  }

  checkKanjiMatch = async (value, translated) => {
    let match = this.state.kanjiArray.filter(o => o.kanji === value);
    if (match.length > 0) {

      await this.setState({ translation: match[0].meaning });

      translated = true;
      return translated;
    }
  }

  checkPhrasesMatch = async (value, translated) => {
    let match = this.state.phrasesArray.filter(o => o.hiragana === value);
    if (match.length > 0) {

      await this.setState({ translation: match[0].meaning });

      translated = true;
      return translated;
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>{ this.state.translation ? this.state.translation : 'No Matches Found'}</Text>

        <TouchableOpacity 
          style={[styles.borderBottom, styles.centerColumn]}
          onPress={() => this.props.navigation.navigate('Chart', { type: 'Hiragana' } )}
        >
          <Text style={styles.kanaLabel}>Hiragana</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.borderBottom, styles.centerColumn]}
          onPress={() => this.props.navigation.navigate('Chart', { type: 'Katakana' } )}  
        >
          <Text style={styles.kanaLabel}>Katakana</Text>
        </TouchableOpacity>
        <View style={styles.centerColumn}>
          <Text style={styles.boldText}>Getting Started with Japanese</Text>
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.iwillteachyoualanguage.com/learn/japanese')}
          >
            <Text style={styles.linkText}>Breakdown of the Japanese Language</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://nihongoshark.com/the-japanese-writing-system/')}
          >
            <Text style={styles.linkText}>Overview of the Writing System</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.fluentin3months.com/easy-japanese/')}
          >
            <Text style={styles.linkText}>Where to Start?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export class KanaChart extends React.Component {
  static navigationOptions = {
    title: 'Kana Chart',
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      type: null,
    }
  }

  componentDidMount = async () => {
    await this.setState({ type: this.props.navigation.state.params.type});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      {
        this.state.type === 'Hiragana'
        ? <Image 
          style={{width: width, height: height}}
          source={require('./../assets/hiragana_table.png')}
          />
        : <Image 
          style={{width: width, height: height}}
          source={require('./../assets/katakana_table.png')}
          />
      }
      </ScrollView>
    );
  }
}

// get width to have answers stretch the width of the screen
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  contentContainer: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  centerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width,
  },
  kanaLabel: {
    fontSize: 34,
    paddingVertical: 30,
  },
  boldText: {
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 5,
  },
  linkText: {
    color: Colors.blue,
    paddingVertical: 5,
  },
});