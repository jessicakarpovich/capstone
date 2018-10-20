import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  Linking,
  StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import LogoIcon from '../constants/LogoIcon';

export default class ResourcesScreen extends React.Component {
  static navigationOptions = {
    title: 'Resources',
    headerLeft: (
      <LogoIcon />
    ),
    headerStyle: {
      backgroundColor: Colors.navBkgd,
    },
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.centerColumn}>
          <Text style={styles.boldText}>Getting Started with Japanese</Text>
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.iwillteachyoualanguage.com/learn/japanese')}
          >
            <Text style={styles.linkText}>Breakdown of the Japanese Language</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://nihongoshark.com/the-japanese-writing-system/')}
          >
            <Text style={styles.linkText}>Overview of the Writing System</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.fluentin3months.com/easy-japanese/')}
          >
            <Text style={styles.linkText}>Where to Start?</Text>
          </TouchableOpacity>
        </View>
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
  },
  contentContainer: {
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
  boldText: {
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  linkText: {
    color: Colors.blue,
    paddingVertical: 5,
  },
});