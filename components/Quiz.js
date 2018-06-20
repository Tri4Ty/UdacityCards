import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import reducer from '../Reducer';
import Card from './Card';
import { white, green, black, gray, red } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

let mapStateToProps = (reducer) => {
	let {
		decks = []
	} = reducer;

	return {
		decks
	};
}

class Quiz extends Component {
	state = {
		questions: [],
		currentCard: 0,
		correct: 0,
		quizComplete: false
	}

	onAnswer = (correctAnswer) => {
		let lastCardAnswered = this.state.currentCard + 1 === this.state.questions.length;
		let nextCard = (lastCardAnswered) ? this.state.currentCard : this.state.currentCard + 1;
		let newScore = correctAnswer ? this.state.correct + 1 : this.state.correct;

		this.setState({
			currentCard: nextCard,
			correct: newScore,
			quizComplete: lastCardAnswered
		});

		if (lastCardAnswered) {
			// reset the daily reminder to study
			clearLocalNotification()
				.then(setLocalNotification())
		}
	}

	onDone = (id, name) => {
		this.props.navigation.navigate(
			'DeckDetail',
			{
				deckId: id,
				deckName: name
			}
		)
	}

	onRestart = () => {
		this.setState({
			currentCard: 0,
			correct: 0,
			quizComplete: false
		});
	}

	componentDidMount() {
		let { deckId } = this.props.navigation.state.params;
		let deck = this.props.decks[deckId];

		this.setState({ questions: deck.questions });
	}

	render() {
		let {
			questions,
			currentCard,
			correct,
			quizComplete
		} = this.state;
		let { deckId } = this.props.navigation.state.params;
		let deck = this.props.decks[deckId];

		let currentQuestion = '';
		let currentAnswer = '';

		if (questions.length > 0 && !quizComplete) {
			currentQuestion = questions[currentCard].question;
			currentAnswer = questions[currentCard].answer;
		}

		return (
			<View style={styles.mainContainer}>
				{ !quizComplete &&
					<Text>{ currentCard + 1 }/{ questions.length }</Text>
				}
				<View style={styles.centeredContainer}>
					{ quizComplete ? (
						<View>
							<Text style={styles.text}>Final Score: { (correct/questions.length)*100 }%</Text>
							<TouchableOpacity
								onPress={ () => this.onDone(deckId, deck.title) }
							>
								<Text style={[styles.link, {color: black}]}>Done</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={ () => this.onRestart() }
							>
								<Text style={[styles.link, {color: red}]}>Restart Quiz</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.centeredContainer}>
							<Card
								question={ currentQuestion }
								answer={ currentAnswer }
							/>
							<View>
								<TouchableOpacity
									style={[styles.button, {backgroundColor: green}]}
									onPress={ () => this.onAnswer(true) }
								>
									<Text>Correct</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.button, {backgroundColor: red}]}
									onPress={ () => this.onAnswer(false) }
								>
									<Text>Incorrect</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: white,
		padding: 10
	},
	centeredContainer: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: white
	},
	button: {
		width: 200,
		padding: 10,
		margin: 5,
		borderColor: black,
		borderRadius: 4,
		borderWidth: 0.5
	},
	text: {
		fontWeight: 'bold',
		fontSize: 28
	},
	link: {
		marginTop: 20,
		textDecorationLine: 'underline',
		textAlign: 'center',
	}
});

export default connect(mapStateToProps)(Quiz);