import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Button } from 'react-native';
import {Key, Domain, ID} from 'react-native-dotenv';

export default class App extends React.Component {

  // to test db connection and retrieval
  constructor(props) {
    super(props);

    // set state, hiragana is array of objects
    this.state = {
      hiragana: []
    }
    // bind function with retrieval logic
    this.getHiragana = this.getHiragana.bind(this);

  }

  componentDidMount() {
    // get hiragana right away, later add code to save it to asyncstorage
    this.getHiragana();
  }

  // function to pull in hiragana from db
  getHiragana() {
    // specify collection and doc
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

  render() {
    // in render, display kana
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button onPress={this.getHiragana} title="Get hiragana"></Button>
        <Text>{ JSON.stringify(this.state.hiragana) }</Text>
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