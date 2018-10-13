import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { AppLoading, Asset, Font, Icon } from 'expo';
// to access db
import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  Key, 
  Domain, 
  databaseURL, 
  ID, 
  iosID, 
  hDoc, kDoc, kanji_Doc} from 'react-native-dotenv';

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  }; 

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
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

    // get hiragana, save it to asyncstorage
    this.getHiragana(db);
    // get katakana, save it to asyncstorage
    this.getKatakana(db);
    // get kanji, save it to asyncstorage
    this.getKanji(db);
  }

  // function to pull in hiragana from db
  getHiragana = (db) => {
    // specify collection and doc
    let hiraganaDoc = db.collection("hiragana").doc(hDoc);
    let hArray;

    // use arrow function to have correct "this"
    hiraganaDoc.get().then((doc) => {
      // check for data, if exists, save it 
      if (doc.exists) {
          hArray = doc.data().array;
          AsyncStorage.setItem('hiragana', JSON.stringify(hArray));
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }// catch errors
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  // function to pull in katakana from db
  getKatakana = (db) => {
    // specify collection and doc
    let katakanaDoc = db.collection("katakana").doc(kDoc);
    let kArray;

    // use arrow function to have correct "this"
    katakanaDoc.get().then((doc) => {
      // check for data, if exists, save it 
      if (doc.exists) {
          kArray = doc.data().array;
          AsyncStorage.setItem('katakana', JSON.stringify(kArray));
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }// catch errors
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  // function to pull in kanji from db
  getKanji = (db) => {
    let kanjiDoc = db.collection("kanji").doc(kanji_Doc);
    let kanjiArray;

    kanjiDoc.get().then((doc) => {
      if (doc.exists) {
          kanjiArray = doc.data().array;
          AsyncStorage.setItem('kanji', JSON.stringify(kanjiArray));
      } else {
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
