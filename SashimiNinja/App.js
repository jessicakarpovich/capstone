import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Button } from 'react-native';
import {Key, Domain, ID, iosID} from 'react-native-dotenv';
//import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import Expo from 'expo';

export default class App extends React.Component {

  // to test db connection and retrieval
  constructor(props) {
    super(props);

    // set state, hiragana is array of objects
    this.state = {
      hiragana: []
    };
    // bind function with retrieval logic
    this.getHiragana = this.getHiragana.bind(this);
    this.signInWithGoogleAsync = this.signInWithGoogleAsync.bind(this);
  }

  componentDidMount() {
    // init firebase, use env vars
    const fbConfig = {
      apiKey: Key,
      authDomain: Domain,
      projectId: ID
    };

    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp(fbConfig);
    const db = firebase.firestore();

    // Disable deprecated features
    db.settings({
      timestampsInSnapshots: true
    });

    // get hiragana right away, later add code to save it to asyncstorage
    this.getHiragana(db);

    // watch for user auth changes, either null or obj
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("Success");
      }
    });
  }

  // on unmount, stop listening for user auth change
  componentWillUnmount() {
    this.authSubscription();
  }

  // function to pull in hiragana from db
  getHiragana(db) {
    // specify collection and doc, update doc id when db is populated
    let hiraganaDoc = db.collection("hiragana").doc("bC7F87A7wWhMAoxgpBhK");
    let hArray;

    // use arrow function to have correct "this"
    hiraganaDoc.get().then((doc) => {
      // check for data, if exists, save it to state
      if (doc.exists) {
          hArray = doc.data().array;
          console.log(hArray);
          this.setState({hiragana: hArray});
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }// catch errors
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  async signInWithGoogleAsync() {
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
    }).catch(function(error) {
      // An error happened.
      console.log("Error in signing out");
    });
  }

  render() {

    // in render, display kana
    // test google log in
    return (
      <View style={styles.container}>
        <Button onPress={this.getHiragana} title="Get hiragana"></Button>
        <Text>{ JSON.stringify(this.state.hiragana) }</Text>
        <Button onPress={ this.signInWithGoogleAsync } title="Login"></Button>
        <Button onPress={this.signOut} title="Sign Out"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/////// leaving for reference later on how to get test scores
function storeHighScore(user, score) {
  if (user != null) {
    firebase.database().ref('users/' + user.uid).set({
      highscore: score
    });
  }
}
