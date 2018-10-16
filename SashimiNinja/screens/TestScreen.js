import React from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class TestScreen extends React.Component {
  state = {
    numOfQuest: "15",
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

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'never'}>
        <View style={styles.centerColumn}>
          <Text style={styles.promptText}>Select test content:</Text>
          <View style={styles.centerColumn}>
            <Text style={styles.categoryText}>Hiragana</Text>
            <View style={styles.row}>
              <TouchableOpacity  
                onPress={() => console.log("ha-n")}
                style={styles.categoryBtnActive}>
                <Text style={styles.btnTextActive}>あーん</Text>  
              </TouchableOpacity>
              <TouchableOpacity  
                onPress={() => console.log("hga-pa")}
                style={styles.categoryBtn}>
                <Text style={styles.btnText}>がーぱ</Text> 
              </TouchableOpacity>
              <TouchableOpacity  
                onPress={() => console.log("hkya-pya")}
                style={styles.categoryBtn}>
                <Text style={styles.btnText}>きゃーぴゃ</Text> 
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centerColumn}>
            <Text style={styles.categoryText}>Katakana</Text>
            <View style={styles.row}>
            <TouchableOpacity  
                onPress={() => console.log("ka-n")}
                style={styles.categoryBtn}>
                <Text style={styles.btnText}>アーン</Text>  
              </TouchableOpacity>
              <TouchableOpacity  
                onPress={() => console.log("kga-pa")}
                style={styles.categoryBtn}>
                <Text style={styles.btnText}>ガーパ</Text> 
              </TouchableOpacity>
              <TouchableOpacity  
                onPress={() => console.log("kkya-pya")}
                style={styles.categoryBtn}>
                <Text style={styles.btnText}>キャーピャ</Text> 
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.categoryText}>Kanji</Text>
            <View style={styles.row}>
              <TouchableOpacity  
                onPress={() => console.log("kanji")}
                style={styles.categoryBtn}>
                <Text style={styles.btnText}>Level 1</Text> 
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
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.centerColumn}>
          <Text style={styles.promptText}>Questions in:</Text>
          <View style={styles.row}>
            <TouchableOpacity  
              onPress={() => console.log("romaji")}
              style={styles.categoryBtn}>
              <Text style={styles.btnText}>English/Romaji</Text> 
            </TouchableOpacity>
            <TouchableOpacity  
              onPress={() => console.log("nihongo")}
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
