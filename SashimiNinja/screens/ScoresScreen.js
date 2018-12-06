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
        // save the score
        // this.setState({ user: user }, () => {
        //   const scores = 
        // this.loadAppScores()
        console.log(this.state.scores)
        // const dbData = 
        this.compareScoreData( user, this.state.scores )
        // console.log(dbData)
        // if db data is newer, load it instead
        // if ( dbData && dbData.isNewer )
        //   this.setState({ scores: dbData })

      } else {
        // save the score
        this.loadAppScores()
      }
    })
  }

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

    if ( user ) {
      const userRef = db.collection('users').doc(user.uid)
      userRef.get().then((doc) => {
        
        // check for data, if exists, continue
        if (doc.exists) {
          const dbScores = doc.data().array
          const dbLength = dbScores.length

          // if db array is longer or has a newer date, load db data
          if (dbLength > scores.length
            || 
            ( dbLength === scores.length
              && dbScores[dbLength-1].date > scores[dbLength-1].date) ) {
                // return { isNewer: true, scores: dbScores }
                this.setState({ scores: dbScores })
              }
          // otherwise return false to load app data
          else {
            // return { isNewer: false }
          }

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          // return { isNewer: false }
        }// catch errors
      }).catch((error) => {
          console.log("Error getting document:", error);
          // return { isNewer: false }
      })
    } else {
      return { isNewer: false }
    }
  }

  _keyExtractor = ( item, index ) => {
    if (typeof(item.date) !== 'object') {
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

    if (typeof(item.date) == 'object') {
      // console.log(item.date)
      item.date = item.date.toDate().toISOString()
      console.log(item.date)
    }

    // get day and time
    day = item.date.split('T')
    console.log(day)
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
          {/* <Text>{item.date}</Text> */}
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
    console.log(this.state.scores)
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