import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import reducer from '../Reducer';
import { deleteDeck } from '../Actions';
import { mergeDeckData } from '../utils/api';
import { white, gray, black, red } from '../utils/colors';

let mapStateToProps = (reducer) => {
	let {
		decks = []
	} = reducer;

	return {
		decks
	};
}

class Deck extends Component {
	onDelete = (deckId) => {
		this.props.dispatch(deleteDeck(deckId));
		this.props.navigation.navigate('AllDecks');
	}

	componentDidUpdate(prevProps) {
		let { deckId } = this.props.navigation.state.params;

		if (this.props['decks'][deckId] && prevProps['decks'][deckId] &&
			prevProps['decks'][deckId]['questions'].length !== this.props['decks'][deckId]['questions'].length) {
			// a question was added ... persisted the modified data
			mergeDeckData('decks', this.props.decks);
		}
	}

	render() {
		let deckTitle = '';
		let questionCount = 0
		let noQuestions = true;
		let { deckId } = this.props.navigation.state.params;
		let deck = this.props.decks[deckId];

		if (deck) {
			deckTitle = deck.title;
			questionCount = deck.questions.length;
			noQuestions = (questionCount === 0) ? true : false;
		}

		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.deckTitle}>{ deckTitle }</Text>
					<Text style={styles.count}>{ questionCount } cards</Text>
				</View>

				<View>
					<TouchableOpacity style={styles.button}
						onPress={ () => this.props.navigation.navigate(
						  'AddQuestion',
						  {
							  deckId: deckId,
							  deckName: deckTitle
						  }
						)}
					>
						<Text style={{color: black, textAlign: 'center'}}>Add Card</Text>
					</TouchableOpacity>
					{ !noQuestions &&
						<TouchableOpacity
							style={[styles.button, {backgroundColor: black}]}
							onPress={ () => this.props.navigation.navigate(
								'Quiz',
								{
									deckId: deckId,
									deckName: deckTitle
								}
							)}
						>
							<Text style={{color: white, textAlign: 'center'}}>Start Quiz</Text>
						</TouchableOpacity>
					}
					<TouchableOpacity onPress={ () => this.onDelete(deckId)}>
						<Text style={styles.link}>Delete Deck</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: white
	},
	deckTitle: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 26
	},
	count: {
		textAlign: 'center',
		color: gray,
		fontSize: 20,
		marginTop: 10
	},
	button: {
		width: 200,
		padding: 10,
		margin: 5,
		borderColor: black,
		borderRadius: 4,
		borderWidth: 0.5
	},
	link: {
		marginTop: 20,
		textDecorationLine: 'underline',
		textAlign: 'center',
		color: red
	}
});

export default connect(mapStateToProps)(Deck);