import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './Reducer'
import Deck from './components/Deck';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import Quiz from './components/Quiz';
import { black, white } from './utils/colors';
import { setLocalNotification } from './utils/helpers';

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

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	DeckDetail: {
		screen: Deck,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.deckName} Details`,
			headerTintColor: black
		})
	},
	AddQuestion: {
		screen: AddQuestion,
		navigationOptions: ({ navigation }) => ({
			title: `New Card (${navigation.state.params.deckName})`,
			headerTintColor: black
		})
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.deckName} Quiz`,
			headerTintColor: black
		})
	}
})

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}

  	render() {
    	return (
			<Provider store={createStore(reducer)}>
				<View style={styles.container}>
		  			<AppStatusBar backgroundColor={black} barStyle="light-content" />
		  			<MainNavigator />
	  			</View>
			</Provider>
    );
  }
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1
  	},
});
