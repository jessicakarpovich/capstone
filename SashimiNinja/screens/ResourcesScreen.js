import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet, 
  Dimensions ,
  Switch,
  Platform
} from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import {
  Key, 
} from 'react-native-dotenv';
import { 
  ProviderTypes, 
  TranslatorFactory,
  TranslatorConfiguration
} from 'react-native-power-translator';

export default class ResourcesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Resources',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate( 'Scores' )}
        >
          <LogoIcon />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: Colors.navBkgd,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      translator: null,
      translation: null,
      isEng: true,
      searchInput: 'おはようございます',
    }
  }

  translate = () => {
    // select English or Japanese based on lang toggle
    const lang = 
      this.state.isEng
      ? 'en'
      : 'ja'

    // set up config for translator using Google
    TranslatorConfiguration.setConfig(ProviderTypes.Google, Key, lang);

    // set translate variable to state
    const translator = TranslatorFactory.createTranslator() 
    
    // use Google Translate to translate seach query
    translator.translate(this.state.searchInput)
      .then(translated => {

        this.setState({ translation: translated })
        this.setState({ isTranslated: true })
      })
      .catch( err => {
        console.log( err )
      })

  }

  // watch for user changes on textarea input and update state value
  changeSearchInput = (e) => {
    this.setState({searchInput: e});
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <Text
            style={{
              fontFamily: 'Merriweather-Regular',
              textAlign: 'center'
            }}
          >Enter what you want to translate to: </Text>
          <View 
            style={[
              styles.row, 
              styles.contentContainer,
              { justifyContent: 'space-around' }
            ]}>
            <Text style={{ fontWeight: 'bold' }}>Japanese</Text>
            <Switch 
              onValueChange={ ( newValue ) => this.setState({ isEng: newValue })}
              value={ this.state.isEng }
              style={{ backgroundColor: Colors.tintColor, borderRadius: 17 }}
            />
            <Text style={{ fontWeight: 'bold' }}>English</Text>
          </View>
          <View>
            <TextInput 
              keyboardType = 'default'
              value={`${this.state.searchInput}`}
              onChangeText={this.changeSearchInput}
              style={styles.textInput}
            />
          </View>
        </View>
        <TouchableOpacity 
          onPress={this.translate}
          style={styles.translateBtn}>
          <Text style={styles.translateBtnText}>Translate</Text>
        </TouchableOpacity>
        {
          !this.state.isTranslated 
          ? undefined
          : this.state.isTranslated && this.state.translation
            ?<View 
              style={{ 
                display: 'flex', 
                flexDirection: 'row',
                paddingTop: 20,
                paddingBottom: 60
            }}>
              <Text 
                style={{
                  fontWeight: 'bold',
                }}
              >
                Translation: 
              </Text>
              <Text>{this.state.translation}</Text>
            </View>
            : <Text
                style={{
                  paddingTop: 20,
                  paddingBottom: 60,
                  fontWeight: 'bold',
                }}
              >No Matches Found
              </Text>
        }
        <View style={styles.borderBottom} />
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
            <Text 
              style={[
                styles.linkText,
                { marginBottom: 20 }
              ]}
            >Where to Start?</Text>
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
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#000",
    marginVertical: 20,
    paddingVertical: 10,
    paddingLeft: 5,
  },
  translateBtn: {
    backgroundColor: Colors.blue,
    padding: 2,
    borderRadius: 6,
    marginVertical: 10,
  },
  translateBtnText: {
    fontSize: 20,
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : ''
  },
  kanaLabel: {
    fontSize: 34,
    paddingVertical: 30,
    fontFamily: 'Merriweather-Regular'
  },
  boldText: {
    paddingTop: 20,
    paddingBottom: 5,
    fontFamily: 'Merriweather-Black'
  },
  linkText: {
    color: Colors.blue,
    paddingVertical: 5,
    fontFamily: 'Merriweather-Regular'
  },
});