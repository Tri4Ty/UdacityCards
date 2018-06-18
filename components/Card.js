import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import { white, red } from '../utils/colors';

export default class Card extends Component {
	state = {
		showAnswer: false
	}

	onToggleCard = () => {
		let showAnswer = !this.state.showAnswer;

		this.setState({
			showAnswer: showAnswer
		});
	}

	render() {
		let { showAnswer } = this.state;

		return (
			<View style={styles.container}>
				{ showAnswer ? (
					<View>
						<Text style={styles.text}>{ this.props.answer }</Text>
						<TouchableOpacity
							onPress={ () => this.onToggleCard() }
						>
							<Text style={styles.link}>Question</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View>
						<Text style={styles.text}>{ this.props.question }</Text>
						<TouchableOpacity
							onPress={ () => this.onToggleCard() }
						>
							<Text style={styles.link}>Answer</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: white
	},
	text: {
		fontWeight: 'bold',
		fontSize: 28
	},
	link: {
		marginTop: 20,
		textDecorationLine: 'underline',
		textAlign: 'center',
		fontWeight: 'bold',
		color: red
	}
});