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
import * as firebase from 'firebase';

export default class ScoresScreen extends React.Component {

  constructor( props ) {
    super( props )
    this.state = {
      dbScores: [],
      appScores: [],
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
    this.loadAppScores()
    this.loadUser()
  }

  loadUser = () => {

    AsyncStorage.getItem('user')
    // load user, parse data, store if valid
    .then((user) => {
      user = JSON.parse(user)

      if ( user ) {
        // sometimes, scores is an empty object
        // for comparison to work, send an empty array instead
        if ( !Array.isArray(this.state.scores) )
          this.compareScoreData( user, [] )
        else 
          this.compareScoreData( user, this.state.scores )

      } else {
        // save the score
        this.loadAppScores()
      }
    })
  }

  // load scores from AsyncStorage
  loadAppScores = async () => {
    try {
      temp = await AsyncStorage.getItem('scores');
      // if available, set to state
      if (temp !== null) {
        this.setState({scores: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting recent scores", err);
    }
  }

  compareScoreData = (user, scores) => {
    const db = firebase.firestore();

    // Disable deprecated features
    db.settings({
      timestampsInSnapshots: true
    });

    // see if user is logged in
    if ( user ) {
      const userRef = db.collection('users').doc(user.uid)
      userRef.get().then((doc) => {
        
        // check for score data, if exists, continue
        if (doc.exists && doc.data().array.length > 0) {
          const dbScores = doc.data().array
          const dbLength = dbScores.length
          const scoresLength = scores.length

          dbScores[dbLength-1].date = this._keyExtractor( dbScores[dbLength-1] )
          scores[scoresLength-1].date = this._keyExtractor( scores[scoresLength-1] )

          // // if db array has a newer date, load db data
          if ( dbScores[dbLength-1].date > scores[scoresLength-1].date ) {
            console.log('hjvv')
            this.setState({ scores: dbScores })
          }

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }// catch errors
      }).catch((error) => {
          console.log("Error getting document:", error);
      })
    } else {
      return { isNewer: false }
    }
  }

  _keyExtractor = ( item, index ) => {
    if ( typeof(item.date) !== 'object') {
      return item.date
    } else {
      return item.date.toDate().toISOString()
    }
  }

  _renderItem = ({ item, index }) => {
    // split fraction
    const fraction = item.score.split('/')
    const num = parseFloat(fraction[0])
    const denom = parseFloat(fraction[1])
    // round percent
    const percent = ( ( num / denom) * 100 ).toFixed( 2 )
    
    // if timestamp, convert to ISOString to work with the rest of the logic
    // for some reason, the last value saved to Firestore is stored as Timestamp obj
    if (typeof(item.date) == 'object') {
      item.date = item.date.toDate().toISOString()
    }

    // get day and time
    day = item.date.split('T')
    time = day ? day[1].split('.') : false

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

    const reversedScores = scores.length > 0 ? scores.reverse() : scores
    return (
      <View>
        {
          mes
          ? <Text style={styles.text}>{mes}</Text>
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
  text: {
    textAlign: 'center',
    fontFamily: 'Merriweather-Bold',
    fontSize: 20
  }
})