import React from 'react'
import { 
  Text, 
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import * as firebase from 'firebase'
import Colors from '../constants/Colors'
import LogoIcon from '../constants/LogoIcon'
import HelpIcon from '../constants/HelpIcon'
import {
  iosID, 
} from 'react-native-dotenv';

export default class SettingsScreen extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      signedIn: false
    }
  }

  static navigationOptions = ({ navigation}) => ({
    title: 'Settings',
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.navigate( 'Scores' )}
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
  })

  componentDidMount() {
    // watch for user auth changes, either null or obj
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user);
        this.setState({ signedIn: true })
        AsyncStorage.setItem('user', JSON.stringify(user))
      } else {
        AsyncStorage.setItem('user', false)
      }
    })
  }

  // on unmount, stop listening for user auth change
  componentWillUnmount() {
    this.authSubscription()
  }

  signInWithGoogleAsync = async () => {
    try {
      // add client id later for android
      //androidClientId: YOUR_CLIENT_ID_HERE,
      const result = await Expo.Google.logInAsync({
        iosClientId: iosID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        const { idToken, accessToken} = result;
        // Build Firebase credential with the Google access token and idToken.
        // need both to not get invalid id_token
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

        // Sign in with credential from Google user
        firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
          // show errors here.
          console.log(error);
        });
      } else {
        console.log("cancelled sign in");
      }
    } catch(e) {
      console.log(e);
    }
  }

  // test later
  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Logged OUT");
      this.setState({ signedIn: false })
    }).catch(function(error) {
      // An error happened.
      console.log("Error in signing out");
    });
  }

  render() {
    const {
      signedIn
    } = this.state

    return (
      <TouchableOpacity style={styles.row}
        onPress={ 
          !signedIn 
          ? () => this.signInWithGoogleAsync()
          : () => this.signOut()
        }
      >
        {
          signedIn
          ? <Text style={styles.text}>Logout</Text>
          : <Text style={styles.text}>Sign In with Google</Text>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    backgroundColor: Colors.backgroundMain
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Merriweather-Bold',
    fontSize: 20
  }
})