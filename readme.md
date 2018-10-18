*Jessica Karpovich - *Web Application Integration*

## Capstone Project - Sashimi Ninja ##
Sashimi Ninja is a web/mobile app for studying Japanese with a focus on Hiragana, Katakana, beginning level Kanji and commonly used words.

[Project Specs](docs/readme.md)

### Technologies Used

- [expo](https://expo.io/): ^30.0.1
- [firebase](https://firebase.google.com/): ^5.5.3
- [react](https://reactjs.org/): 16.3.1
- [react-native](https://facebook.github.io/react-native/): https://github.com/expo/react-native/archive/sdk-30.0.0.tar.gz
- [react-native-dotenv](https://github.com/zetachang/react-native-dotenv): ^0.2.0
- [react-navigation](https://reactnavigation.org/): ^2.17.0

#### Expo
Expo is used to abstract the individual project setup for iOS and Android. After installing the Expo app on a mobile device, you can run `expo start` from the project directory, scan the QR code on the screen, and use the app on your device. Besides that, if you have an iOS(Xcode) or Android(AndroidStudio) simulator set up, you can click run on ___ simulator and it will open the app on your computer.

#### Firebase

Firebase is used to store and retrieve data from the FireStore database. For now, the db structure is as follows:

- hiragana
  - documentId
    - array
      - object
        - character
        - romaji
- katakana
  - documentId
    - array
      - object
        - character
        - romaji
- kanji
  - documentId
    - array
      - object
        - kanji
        - kunyomi
        - onyomi
        - meaning
- phrases
  - documentId
    - array
      - object
        - hiragana
        - romaji
        - meaning

#### React Native Dotenv

React Native Dotenv is used to load our environment variables from the .env file. These variables are used to access the Firebase database and retrieve the content for the app. Without it, the app will not work.

Here is an example .env file needed for this app. Do note that all values need to be replaced with the values pertaining to your project in Firebase.

```
Key="YourKeyString"
Domain="yourprojectname.firebaseapp.com"
databaseURL="https://yourprojectname.firebaseio.com"
ID="yourprojectname"
iosID="youriosid.apps.googleusercontent.com"

hDoc="YourDocumentIDForHiraganaContent"
kDoc="YourDocumentIDForKatakanaContent"
kanji_Doc="YourDocumentIDForKanjiContent"
```
#### React Navigation

React Navigation is used for the TabBar at the bottom of each screen and for the stack navigation between screens in a single tab. The way both are used can be found in: `navigation/MainTabNavigator.js`.

### Instructions on Local Setup

First of all, download the zip or clone a copy of the repo, either from the dev branch or the master branch. Code in master is complete, tested, and released. Code in dev, is tested and working.

On your local computer, unzip the folder and open up a terminal.

Then cd into the project folder.
```
$ cd Downloads/capstone-dev/SashimiNinja/
$ npm install
$ expo start
````
[npm](https://www.npmjs.com/) install will get you the necessary packages and [expo start](#expo) will start the app, providing options on how to view it.

However, to use the app you will need to create a .env file inside of the SashimiNinja folder. An example of what it should look like is given above at [React Native Dotenv](#react-native-dotenv)

