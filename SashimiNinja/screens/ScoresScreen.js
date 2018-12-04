import React from 'react';
import { 
  Text, 
  View, 
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class ScoresScreen extends React.Component {

  constructor( props ) {
    super( props )
    this.state = {
      scores: []
    }
  }

  static navigationOptions = ({ navigation}) => ({
    title: 'Recent Scores',
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <LogoIcon />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate( 'Resources' )}
      >
        <HelpIcon />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  });

  componentDidMount() {
    this.loadScores()
  }

  loadScores = async () => {
    try {
      temp = await AsyncStorage.getItem('scores');
      // if available, set to state
      if (temp !== null) {
        this.setState({scores: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting recent scores", err);
    }
    // load from db too
  }

  _keyExtractor = ( item, index ) => item.date

  _renderItem = ({ item, index }) => {
    // split fraction
    const fraction = item.score.split('/')
    const num = parseFloat(fraction[0])
    const denom = parseFloat(fraction[1])
    // round percent
    const percent = ( ( num / denom) * 100 ).toFixed( 2 )

    // get day and time
    const day = item.date.split('T')
    const time = day[1].split('.')

    return(
      <View style={styles.row}>
        <View style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <Text style={{
            fontFamily: 'Merriweather-Bold'
          }}>{index+1}. {day[0]}: </Text>
          <Text style={{
            fontFamily: 'Merriweather-Regular'
          }}>{time[0]}</Text>
        </View>
        <Text style={{
          fontFamily: 'Apple SD Gothic Neo',
          color: Colors.tabIconDefault
        }}>{percent}%</Text>
      </View>
    )
  }

  render() {
    const {
      scores
    } = this.state

    const mes = 
      scores.length < 1
      ? 'No scores yet, complete a test for your score to appear here'
      : false

    const reversedScores = scores.reverse()

    return (
      <View>
        {
          mes
          ? <Text>{mes}</Text>
          : <FlatList
              data={reversedScores}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Colors.backgroundMain
  },
})