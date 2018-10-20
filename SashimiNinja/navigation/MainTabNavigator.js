import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import main screens
import HomeScreen from '../screens/HomeScreen';
import ReviewScreen from '../screens/ReviewScreen';
import TestScreen from '../screens/TestScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import SettingsScreen from '../screens/SettingsScreen';

//import detail screens
import { ReviewRowScreen, ReviewDetailScreen } from '../screens/ReviewScreen';
import { TestDetailScreen, TestCompleteScreen } from '../screens/TestScreen';
import { KanaChart } from '../screens/ResourcesScreen';

import Colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: { activeTintColor: Colors.tintColor},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'
      }
    />
  ),
};

// specify main and detail screens here to have nested
// stack nav inside tab nav
const ReviewStack = createStackNavigator({
  Review: ReviewScreen,
  Row: ReviewRowScreen,
  Detail: ReviewDetailScreen,
},
{
  initialRouteName: 'Review',
});

ReviewStack.navigationOptions = {
  tabBarLabel: 'Review',
  tabBarOptions: { activeTintColor: Colors.tintColor},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-book${focused ? '' : '-outline'}` : 'md-book'}
    />
  ),
};

const TestStack = createStackNavigator({
  Test: TestScreen,
  Detail: TestDetailScreen,
  Complete: TestCompleteScreen,
},
{
    initialRouteName: 'Test',
});

TestStack.navigationOptions = {
  tabBarLabel: 'Test',
  tabBarOptions: { activeTintColor: Colors.tintColor},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-create${focused ? '' : '-outline'}` : 'md-create'}
    />
  ),
};

const ResourcesStack = createStackNavigator({
  Resources: ResourcesScreen,
  Chart: KanaChart,
});

ResourcesStack.navigationOptions = {
  tabBarLabel: 'Resources',
  tabBarOptions: { activeTintColor: Colors.tintColor},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-clipboard${focused ? '' : '-outline'}` : 'md-clipboard'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: { activeTintColor: Colors.tintColor},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ReviewStack,
  TestStack,
  ResourcesStack,
  SettingsStack,
});
