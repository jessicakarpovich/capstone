import React from 'react';
import { 
  View,
  StyleSheet, 
  Text, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  ScrollView, 
  AsyncStorage, 
  Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';
import HelpIcon from '../constants/HelpIcon';
import { StackActions, NavigationActions } from 'react-navigation';

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
    this.setState({language: e});
  }

  validateInput = () => {
    let isValid = true;
    // check that num of ?s is not negative, then round to int
    if (this.state.numOfQuest > 0) {
      this.setState({numOfQuest: Math.round(this.state.numOfQuest)});
    } else {
      isValid = false;
    }
    // check that whole array is not false,
    // if it is, it means user hasn't selected content, test shouldn't start
    if (this.state.content.every( (val, i, arr) => val === arr[0] ) && !this.state.content[0]) {
      isValid = false;
    }

    // if all is valid, generate array of content
    if (isValid) {
      this.generateContentArray();
    }
  }

  generateContentArray = async () => {
    let contentArray = [];
    let temp;

    // load character arrays
    // try getting the hiragana array from async storage
    try {
      temp = await AsyncStorage.getItem('hiragana');
      // if available, set to state
      if (temp !== null) {
        this.setState({hArray: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting kanji array", err);
    }

    // try getting the katakana array from async storage
    try {
      temp = await AsyncStorage.getItem('katakana');
      // if available, set to state
      if (temp !== null) {
        this.setState({kArray: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting kanji array", err);
    }

    // try getting the kanji array from async storage
    try {
      temp = await AsyncStorage.getItem('kanji');
      // if available, set to state
      if (temp !== null) {
        this.setState({kanjiArray: JSON.parse(temp)});
      }
    } catch (err) {
      console.log("Error getting kanji array", err);
    }

    // grab data loaded from async storage
    let hArray = this.state.hArray;
    let kArray = this.state.kArray;
    let kanjiArray = this.state.kanjiArray;

    // based on the values of this.state.content at each index
    // create an array of Japanese content (a-n, ga-pa, etc.)
    // use concat() to add to array values, not to create an array of arrays
    this.state.content.forEach(function(value, i) {
      switch (i) {
        case 0:
        // if at index 0, the value is true, 
        // add first part of hiragana array to contentArray
          if (value) {
            contentArray = contentArray.concat(hArray.slice(0, 46));
          }
          break;
        case 1:
          if (value) {
            contentArray = contentArray.concat(hArray.slice(46, 71));
          }
          break;
        case 2:
          if (value) {
            contentArray = contentArray.concat(hArray.slice(71, 104));
          }
          break;
        case 3:
        // if at index 0, the value is true, 
        // add first part of katakana array to contentArray
          if (value) {
            contentArray = contentArray.concat(kArray.slice(0, 46));
          }
          break;
        case 4:
          if (value) {
            contentArray = contentArray.concat(kArray.slice(46, 71));
          }
          break;
        case 5:
          if (value) {
            contentArray = contentArray.concat(kArray.slice(71, 104));
          }
          break;
        case 6:
        if (value) {
          contentArray = contentArray.concat(kanjiArray);
        }
        break;
      }
    });
    this.props.navigation.navigate('Detail', {
      content: contentArray, 
      lang: this.state.language, 
      num: this.state.numOfQuest
    });
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
              value={`${this.state.numOfQuest}`}
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
              style={
                this.state.language == 'en'
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
              }>
              <Text style={
                this.state.language == 'en'
                ? styles.btnTextActive
                : styles.btnText
              }>English/Romaji</Text> 
            </TouchableOpacity>
            <TouchableOpacity  
              onPress={() => this.selectLang('jp')}
              style={
                this.state.language == 'jp'
                  ? styles.categoryBtnActive
                  : styles.categoryBtn
              }>
              <Text style={
                this.state.language == 'jp'
                ? styles.btnTextActive
                : styles.btnText
              }>Japanese</Text> 
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          onPress={this.validateInput}
          style={styles.submitBtn}>
          <Text style={styles.btnTextActive}>Mission Start</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


export class TestDetailScreen extends React.Component {

  static navigationOptions = ({ navigation}) => ({
    title: 'Mission in Progress',
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  });

  // NOTE: current character is an int
  constructor(props) {
    super(props);
    this.state = {
      contentArray: this.props.navigation.state.params.content,
      language: this.props.navigation.state.params.lang,
      totalQuest: this.props.navigation.state.params.num,
      currentQuest: null,
      currentCharacter: null,
      answers: null,
      numCorrect: 0,
    };
  }

  // set current character to be a random character in range of character array
  // wait for state to be set before generating answers
  componentDidMount = async () => {
    await this.setState({ currentCharacter: this.generateRandomCharacter()});
    this.setState({ currentQuest: 0});
    // generate answers
    this.generateAnswers();
  }

  // function to get random integer including startIndex as part of range
  // endIndex is excluded
  generateRandomNumber = (startIndex, endIndex) => {
    startIndex = Math.ceil(startIndex);
    endIndex = Math.floor(endIndex);
    return Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;
  }

  // get randInt and use it to get randCharacter as an int
  generateRandomCharacter = () => {
    let randInt = this.generateRandomNumber(0, this.state.contentArray.length);
    return randInt;
  }

  // need to generate 3 fake answers to mix with corret answer
  generateAnswers = () => {
    let ans1 = this.generateRandomCharacter();
    let ans2 = this.generateRandomCharacter();
    let ans3 = this.generateRandomCharacter();

    const {
      contentArray,
      currentCharacter
    } = this.state

    // grab the actual characters at the answer indecies
    // we need them to check for similar answer duplicates
    // e.g.: あ vs ア, both have the same romaji, eliminate
    let char1 = contentArray[ans1]
    let char2 = contentArray[ans2]
    let char3 = contentArray[ans3]

    console.log(char1)
    console.log(char2)
    console.log(char3)
    console.log(contentArray[currentCharacter])

    // make sure answers don't overlap
    while (ans1 === ans2 || ans1 === ans3 || ans1 === currentCharacter) {
      ans1 = this.generateRandomCharacter();
    }
    while (ans2 === ans1 || ans2 === ans3 || ans2 === currentCharacter) {
      ans2 = this.generateRandomCharacter();
    }
    while (ans3 === ans1 || ans3 === ans2 || ans3 === currentCharacter) {
      ans3 = this.generateRandomCharacter();
    }

    // array for answers
    let ansArray = [ans1, ans2, ans3, currentCharacter];
    // create array with 4 indexes
    let indexArray = [0, 1, 2, 3];
    // create an array for scrambled answers
    let randArray = new Array(4);

    // get a rand int based on array length
    // get the value stored at the random index
    // delete the value saved in randArray from ansArray to not have duplicates
    for (let i=0; i < randArray.length; i++) {
      randNum = Math.floor(Math.random()*indexArray.length);
      randArray[i] = ansArray[randNum];
      indexArray.splice(randNum, 1);
      ansArray.splice(randNum, 1);
    }

    // set index values to state to display to user
    this.setState({answers: randArray});
  }

  // check user answer against current character
  checkUserAnswer = async (ans) => {
    let cur = this.state.currentQuest + 1;

    if (cur < this.state.totalQuest) {
      // if this is not the last question, and the answer is correct
      if (this.state.currentCharacter === this.state.answers[ans]) {

        // update # correct, current #, and get a new question
        await this.setState({ numCorrect: this.state.numCorrect+1});
        await this.setState({ currentQuest: this.state.currentQuest+1});
        await this.setState({ currentCharacter: this.generateRandomCharacter()});

        // generate answers
        this.generateAnswers();
      } 
      else {
        // if incorrect ans, add 1 to current # and generate new question
        await this.setState({ currentQuest: this.state.currentQuest+1});
        await this.setState({ currentCharacter: this.generateRandomCharacter()});

        // generate answers
        this.generateAnswers();
      }
    } 
    // if last question
    else if (cur === this.state.totalQuest) {
      // if answer is correct, update # correct and current #
        if (this.state.currentCharacter === this.state.answers[ans]) {
          await this.setState({ numCorrect: this.state.numCorrect+1});
          await this.setState({ currentQuest: this.state.currentQuest+1});
        }
      // navigate to screen with score
      this.props.navigation.navigate('Complete', {
        correct: this.state.numCorrect, 
        total: this.state.totalQuest,
      });
   }
  }

  // set diff instruct text based on lang value
  // display character or kanji, based on character values
  render() {
    const {
      currentQuest,
      totalQuest,
      language,
      contentArray,
      currentCharacter,
      answers,
    } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.centerColumn}>
          <Text>Question {currentQuest+1} / {totalQuest}</Text>
          <Text>
            {
              language == 'en'
              ? 'Select the corresponding character'
              : 'Select the matching romaji/meaning'
            }
          </Text>
          <Text style={styles.character}>
          { language == 'en'
            ? (contentArray.length > 0 && contentArray[currentCharacter]
              ? contentArray[currentCharacter].character
                ? contentArray[currentCharacter].romaji
                : contentArray[currentCharacter].kanji
                ? contentArray[currentCharacter].meaning
                  : ''
              : ''

            )
            : (contentArray.length > 0 && contentArray[currentCharacter]
              ? contentArray[currentCharacter].character
                ? contentArray[currentCharacter].character
                : contentArray[currentCharacter].kanji
                ? contentArray[currentCharacter].kanji
                  : ''
              : ''
            )
          }
          </Text>
          {
            answers 
            // removing this seems to solve no answer displayed bug
            // && this.state.currentCharacter
            ? <View>
                <TouchableOpacity style={styles.choices}
                  onPress={() => this.checkUserAnswer(0)}>
                  <Text style={styles.choicesText}>
                  {
                    language == 'en'
                    ? (contentArray[answers[0]].romaji
                      ? contentArray[answers[0]].character
                      : contentArray[answers[0]].kanji
                    )
                    : (contentArray[answers[0]].romaji
                      ? contentArray[answers[0]].romaji
                      : contentArray[answers[0]].meaning
                    )
                  }</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choices}
                  onPress={() => this.checkUserAnswer(1)}>
                  <Text style={styles.choicesText}>
                  {
                    language == 'en'
                    ? (contentArray[answers[1]].romaji
                      ? contentArray[answers[1]].character
                      : contentArray[answers[1]].kanji
                    )
                    : (contentArray[answers[1]].romaji
                      ? contentArray[answers[1]].romaji
                      : contentArray[answers[1]].meaning
                    )
                  }</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choices}
                  onPress={() => this.checkUserAnswer(2)}>
                  <Text style={styles.choicesText}>
                  {
                    language == 'en'
                    ? (contentArray[answers[2]].romaji
                      ? contentArray[answers[2]].character
                      : contentArray[answers[2]].kanji
                    )
                    : (contentArray[answers[2]].romaji
                      ? contentArray[answers[2]].romaji
                      : contentArray[answers[2]].meaning
                    )
                  }</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choicesBottom}
                  onPress={() => this.checkUserAnswer(3)}>
                  <Text style={styles.choicesText}>
                  {
                    language == 'en'
                    ? (contentArray[answers[3]].romaji
                      ? contentArray[answers[3]].character
                      : contentArray[answers[3]].kanji
                    )
                    : (contentArray[answers[3]].romaji
                      ? contentArray[answers[3]].romaji
                      : contentArray[answers[3]].meaning
                    )
                  }</Text>
                </TouchableOpacity>
              </View>
            : ''
          }
        </View>
      </View>
    );
  }
}

export class TestCompleteScreen extends React.Component {

  static navigationOptions = ({ navigation}) => ({
    title: 'Mission Complete',
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  });

  constructor(props) {
    super(props);
      this.state = {
        correct: null,
        total: null,
      };
  }

  componentDidMount = () => {
    // get # correct and total, calc percent and round
    this.setState({ correct: this.props.navigation.state.params.correct });
    this.setState({ total: this.props.navigation.state.params.total });
  }

  navigate = () => {
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('Test');
  }

  render() {
    const percent = ((this.state.correct / this.state.total) * 100).toFixed(2)

    return (
      <View style={styles.container}>
        <Text>Congrats!</Text>
        <Text>{this.state.correct} / {this.state.total}</Text>
        <Text>{percent}%</Text>
        <TouchableOpacity 
          onPress={this.navigate}
          style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// before navigating, reset screen state to avoid errors
const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Test'})
  ]
})

// get width to have answers stretch the width of the screen
const width = Dimensions.get('window').width;

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
  character: {
    fontSize: 160,
    marginTop: 76,
    marginBottom: 76,
  },
  choices: {
    width: width,
    paddingVertical: 10,
    borderBottomColor: Colors.tabIconDefault,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  choicesBottom: {
    width: width,
    paddingVertical: 10,
  },
  choicesText: {
    fontSize: 20,
    textAlign: 'center',
  },
  closeBtn: {
    backgroundColor: Colors.blue,
    padding: 2,
    borderRadius: 6,
    marginTop: 80,
  },
  closeBtnText: {
    fontSize: 20,
    color: '#fff',
    padding: 4,
  },
});
