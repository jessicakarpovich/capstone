import React from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class TestScreen extends React.Component {
  // num ofquest is # of questions user requested, default 15
  // language is lang of question
  // content array is for knowing what Hiragana, Katakana, Kanji to display
  // currently Hiragna a-n is selected by default
  // last row is for kanji, kanji currently only has one level
  state = {
    numOfQuest: "15",
    language: "jp",
    content: [
      true, false, false,
      false, false, false,
      false,
    ],
  };


  static navigationOptions = {
    title: 'Test',
    headerLeft: (
      <LogoIcon />
    ),
    headerRight: (
      <HelpIcon />
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  };

  // watch for user changes on textarea input and update state value
  changeNumofQuest = (e) => {
    this.setState({numOfQuest: e});
  }

  // function to update selected content from hiragna, katakana, and kanjji options listed
  selectContent = (e) => {
    // grab the current array of bool values
    let tempArray = this.state.content;
    // set the selected item in array to opposite of what it was, then update
    tempArray[e] = !this.state.content[e];
    this.setState({content: tempArray});
  }

  // function to update user selected language
  selectLang = (e) => {
    this.setState({lang: e});
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'never'}>
        <View style={styles.centerColumn}>
          <Text style={styles.promptText}>Select test content:</Text>
          <View style={styles.centerColumn}>
            <Text style={styles.categoryText}>Hiragana</Text>
            <View style={styles.row}>
              <TouchableOpacity  
                onPress={() => this.selectContent(0)}
                style={
                  this.state.content[0]
                  ? styles.categoryBtnActive
                  : styles.categoryBtn }>
                <Text style={
                  this.state.content[0]
                  ? styles.btnTextActive
                  : styles.btnText }>あーん</Text>  
              </TouchableOpacity>
              <TouchableOpacity  
                onPress={() => this.selectContent(1)}
                style={
                  this.state.content[1]
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
                }>
                <Text style={
                  this.state.content[1]
                  ? styles.btnTextActive
                  : styles.btnText}>がーぱ</Text> 
              </TouchableOpacity>
              <TouchableOpacity  
                onPress={() => this.selectContent(2)}
                style={
                  this.state.content[2]
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
                }>
                <Text style={
                  this.state.content[2]
                  ? styles.btnTextActive
                  : styles.btnText}>きゃーぴゃ</Text> 
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centerColumn}>
            <Text style={styles.categoryText}>Katakana</Text>
            <View style={styles.row}>
            <TouchableOpacity  
                onPress={() => this.selectContent(3)}
                style={
                  this.state.content[3]
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
                }>
                <Text style={
                  this.state.content[3]
                  ? styles.btnTextActive
                  : styles.btnText}>アーン</Text>  
              </TouchableOpacity>
              <TouchableOpacity  
                onPress={() => this.selectContent(4)}
                style={
                  this.state.content[4]
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
                }>
                <Text style={
                  this.state.content[4]
                  ? styles.btnTextActive
                  : styles.btnText}>ガーパ</Text> 
              </TouchableOpacity>
              <TouchableOpacity  
                onPress={() => this.selectContent(5)}
                style={
                  this.state.content[5]
                  ? styles.categoryBtnActive
                  : styles.categoryBtn}>
                <Text style={
                  this.state.content[5]
                  ? styles.btnTextActive
                  : styles.btnText}>キャーピャ</Text> 
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.categoryText}>Kanji</Text>
            <View style={styles.row}>
              <TouchableOpacity  
                onPress={() => this.selectContent(6)}
                style={
                  this.state.content[6]
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
                }>
                <Text style={
                  this.state.content[6]
                  ? styles.btnTextActive
                  : styles.btnText}>Level 1</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.promptText}>Number of questions:</Text>
          <View>
            <TextInput 
              keyboardType = 'numeric'
              value={this.state.numOfQuest}
              onChangeText={this.changeNumofQuest}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.centerColumn}>
          <Text style={styles.promptText}>Questions in:</Text>
          <View style={styles.row}>
            <TouchableOpacity  
              onPress={() => this.selectLang('en')}
              style={styles.categoryBtn}>
              <Text style={styles.btnText}>English/Romaji</Text> 
            </TouchableOpacity>
            <TouchableOpacity  
              onPress={() => this.selectLang('jp')}
              style={styles.categoryBtnActive}>
              <Text style={styles.btnTextActive}>Japanese</Text> 
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          onPress={() => console.log("preparing questions")}
          title="Mission Start"
          style={styles.submitBtn}>
          <Text style={styles.btnTextActive}>Mission Start</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
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
  promptText: {
    color: Colors.altColor,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 28,
    textAlign: 'center',
  },
  categoryBtn: {
    marginHorizontal: 20,
  },
  categoryBtnActive: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.tintColor,
    marginHorizontal: 20,
  },
  btnText: {
    fontSize: 20,
    color: Colors.tabIconDefault,
    padding: 4,
  },
  btnTextActive: {
    fontSize: 20,
    color: '#000',
    padding: 4,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#000",
    marginVertical: 20,
  },
  submitBtn: {
    backgroundColor: Colors.navBkgd,
    padding: 2,
    borderRadius: 6,
  },
});
