import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';

export default class TestScreen extends React.Component {
  state = {
    numOfQuest: 15,
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
      <View style={styles.container}>
        <View style={styles.centerColumn}>
          <Text style={styles.promptText}>Select test content:</Text>
          <View style={styles.centerColumn}>
            <Text style={styles.categoryText}>Hiragana</Text>
            <View style={styles.row}>
              <Button  
                onPress={() => console.log("ha-n")}
                title="あーん"
              />
              <Button  
                onPress={() => console.log("hga-pa")}
                title="がーぱ"
              />
              <Button  
                onPress={() => console.log("hkya-pya")}
                title="きゃーぴゃ"
              />
            </View>
          </View>
          <View style={styles.centerColumn}>
            <Text style={styles.categoryText}>Katakana</Text>
            <View style={styles.row}>
              <Button  
                onPress={() => console.log("ka-n")}
                title="アーン"
              />
              <Button  
                onPress={() => console.log("kga-pa")}
                title="ガーパ"
              />
              <Button  
                onPress={() => console.log("kkya-pya")}
                title="キャーピャ"
              />
            </View>
          </View>
          <View>
            <Text style={styles.categoryText}>Kanji</Text>
            <View style={styles.row}>
              <Button  
                onPress={() => console.log("kanji")}
                title="Level 1"
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.promptText}>Number of questions:</Text>
          <View>
            <TextInput 
              keyboardType = 'numeric'
              value={this.state.numOfQuest}
            />
          </View>
        </View>
        <View style={styles.centerColumn}>
          <Text style={styles.promptText}>Questions in:</Text>
          <View style={styles.row}>
            <Button  
              onPress={() => console.log("romaji")}
              title="English/Romaji"
            />
            <Button  
              onPress={() => console.log("nihongo")}
              title="Japanese"
            />
          </View>
        </View>
        <Button 
          onPress={() => console.log("preparing questions")}
          title="Mission Start"
        />
      </View>
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
  }
});
