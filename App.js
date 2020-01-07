import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import store from './store';
import maps from './data/maps.json';

const INITIAL_STATE = {
    maps: maps,
    activeMap: null,
    storyProgress: null,
};

const initialStore = createStore(store, INITIAL_STATE, applyMiddleware(thunk));

import MapListScreen from './components/screens/MapListScreen';
import EventScreen from './components/screens/EventScreen';
import EventSelectScreen from './components/screens/EventSelectScreen';
import SetupScreen from './components/screens/SetupScreen';
import ChapterSelectScreen from './components/screens/ChapterSelectScreen';
import ChapterScreen from './components/screens/ChapterScreen';
import Icon from './components/Icon';
import StoryIcon from './components/StoryIcon';

import ImageCollection from './utils/ImageCollection';
import polyfills from './utils/polyfills';

const EventNavigator = createStackNavigator({
  Event: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => {
      const event = navigation.getParam('event', null);

      return {
        title: event.title,
      };
    },
  },
  EventSelect: { 
    screen: EventSelectScreen,
    navigationOptions: {
      title: 'Events',
    },
  },
}, {
  initialRouteName: 'EventSelect',
  navigationOptions:  ({ navigation }) => {
    const tabBarVisible = navigation.state.index > 0 ? false : true;
    
    return {
      tabBarVisible,
    }
  },
});

const SetupNavigator = createStackNavigator({
  Setup: {
    screen: SetupScreen,
    navigationOptions: {
      title: 'Setup',
    },
  },
});

const StoryNavigator = createStackNavigator({
  ChapterSelect: {
    screen: ChapterSelectScreen,
    navigationOptions: {
      title: 'Chapters',
    },
  },
  Chapter: {
    screen: ChapterScreen,
    navigationOptions: ({ navigation }) => {
      const chapter = navigation.getParam('chapter', null);

      return {
        title: chapter.title,
      };
    },
  }
 }, {
  initialRouteName: 'ChapterSelect',
  navigationOptions:  ({ navigation }) => {
    const tabBarVisible = navigation.state.index > 0 ? false : true;
    
    return {
      tabBarVisible,
    }
  },
});


const MapNavigator = createBottomTabNavigator({
  SetupNavigator: {
    screen: SetupNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="treasure-map"
          color={ tintColor }
          size={ 30 }/>
      ),
      tabBarLabel: 'Setup',
    },
  },
  EventNavigator: {
    screen: EventNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="poker-hand"
          color={ tintColor }
          size={ 30 }/>
      ),
      tabBarLabel: 'Events',
    },
  },
  StoryNavigator: {
    screen: StoryNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <StoryIcon
          name="bookmarklet"
          color={ tintColor }
          size={ 30 }/>
      ),
      tabBarLabel: 'Chapters',
    },
  },
}, {
  initialRouteName: 'SetupNavigator',
  tabBarOptions: {
    inactiveTintColor: 'rgba(0, 0, 0, 0.5)',
    activeTintColor: '#831915',
    tabStyle: {
      paddingTop: 5,
    },
  },
});

const MainNavigator = createSwitchNavigator({
  Map: { screen: MapNavigator },
  MapList: { screen: MapListScreen },
}, {
  initialRouteName: 'MapList',
});

export default App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const loadResourcesAsync = async () => {
    const imgAssets = Object.values(ImageCollection).map(mapAssets =>
      [ ...Object.values(mapAssets) ]).reduce((acc, val) => acc.concat(val), []);

    return Promise.all([
      Asset.loadAsync(imgAssets),
      Font.loadAsync({
        'ncaa-wyoming-cowboys': require('./assets/fonts/NCAAWyomingCowboys.otf'),
        'myriad-pro-condensed': require('./assets/fonts/MyriadProCondensed.ttf'),
        'myriad-pro-condensed-bold': require('./assets/fonts/MyriadProCondensed-Bold.ttf'),
        'im-fell-english': require('./assets/fonts/ImFellEnglish.ttf'),
        'im-fell-english-bold': require('./assets/fonts/ImFellEnglish-Bold.ttf'),
        'im-fell-english-italic': require('./assets/fonts/ImFellEnglish-Italic.ttf'),
        'icons': require('./assets/fonts/icons.ttf'),
      })
    ]);
  };

  if (!loadingComplete) {
    return (
      <AppLoading
        startAsync={ loadResourcesAsync }
        onFinish={ () => setLoadingComplete(true) }
        onError={ e => console.warn(e) }/>
    );
  }
  else {
    const AppContainer = createAppContainer(MainNavigator);

    return (
      <Provider store={ initialStore }>
        <AppContainer/>
      </Provider>
    );
  }
};
