import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import reducer from '../Reducer';
import { getAllDecks, mergeDeckData } from '../utils/api';
import { setDecks } from '../Actions';
import { white, black, gray } from '../utils/colors';

let mapStateToProps = (reducer) => {
	let {
		decks = []
	} = reducer;

	return {
		decks
	};
}

class Decks extends Component {
	componentDidMount() {
		getAllDecks()
			.then((entries) => {
				if (entries) {
					this.props.dispatch(setDecks(entries));
				}
			});
	}

	componentDidUpdate(prevProps) {
		let { decks } = this.props;
		if (!prevProps.decks || Object.keys(prevProps.decks).length !== Object.keys(this.props.decks).length) {
			// a deck was added or removed ... persisted the modified data
			mergeDeckData('decks', this.props.decks);
		}
	}

	onDeckPressed(id, title) {
		this.props.navigation.navigate(
			'DeckDetail',
			{
				deckId: id,
				deckName: title
			}
		);
	}

	render() {
		let { decks } = this.props;
		let noDecks = (
			<View>
				<Text style={styles.noDeck}>No Decks</Text>
			</View>
		);
		let deckObjs = Object.keys(decks).map( (deckId) => {
			return (
				<TouchableOpacity
					key={deckId}
					style={styles.deck}
					onPress={ () => this.props.navigation.navigate(
						'DeckDetail',
						{
							deckId: deckId,
							deckName: decks[deckId].title
						}
					) }
				>
					<Text style={styles.deckTitle}>{ decks[deckId].title }</Text>
					<Text style={styles.count}>{ decks[deckId].questions.length } cards</Text>
				</TouchableOpacity>
			);
		});

		return (
			<View style={styles.container}>
				{ (Object.keys(decks).length > 0) ? deckObjs : noDecks }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	deck: {
		padding: 20,
		margin: (5, 15),
		borderColor: black,
		borderRadius: 4,
		borderWidth: 0.5,
		backgroundColor: white
	},
	deckTitle: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 26
	},
	noDeck: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 38
	},
	count: {
		textAlign: 'center',
		color: gray,
		fontSize: 20
	}
});

export default connect(mapStateToProps)(Decks);