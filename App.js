import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome } from '@expo/vector-icons'

import Decks from './decks/Decks';
import AddDeck from './decks/AddDeck';
import { black, white } from './utils/colors';

function AppStatusBar ({backgroundColor, ...props}) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = createBottomTabNavigator({
	AllDecks: {
		screen: Decks,
		navigationOptions: {
			tabBarLabel: 'All Decks',
			tabBarIcon: ({ tintColor }) => <FontAwesome name='list' size={30} color={tintColor} />
		}
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck',
			tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={30} color={tintColor} />
		}
	},
}, {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: black,
		style: {
			height: 56,
			backgroundColor: white,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
		  <AppStatusBar backgroundColor={black} barStyle="light-content" />
		  <Tabs />
	  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
