import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet, 
  Dimensions } from 'react-native';
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

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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