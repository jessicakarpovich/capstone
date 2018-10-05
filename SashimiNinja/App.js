import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class App extends React.Component {

  

  render() {
    let hiragana = db.collection("hiragana").doc("1XVxg9OHvYcNAlf8kZKx");
    //<Text>{ hiragana }</Text>

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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

// init firebase
const fbConfig = {
  apiKey: "AIzaSyCgjYfnJW54uqwL0FyGlqchLrJnl63uJVs",
  authDomain: "sashimininja36.firebaseapp.com",
  projectId: "sashimininja36"
};

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(fbConfig);
const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});