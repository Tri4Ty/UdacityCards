import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';

import { addQuestion } from '../Actions';
import { white, gray, black } from '../utils/colors';

class AddQuestion extends Component {
	state = {
		question: '',
		answer: ''
	}

	onPress = (deckId, question, answer) => {
		this.props.dispatch(addQuestion(deckId, question, answer));
		this.setState({
			question: '',
			answer: ''
		});
		this.props.navigation.navigate(
			'DeckDetail',
			{
				deckId: deckId
			}
		);
	}

	render() {
		let { deckId } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
				<Text style={styles.text}>Question:</Text>
				<TextInput
					style={[styles.input, {alignSelf: 'stretch'}]}
					placeholder={'New Question'}
					onChangeText={(text) => this.setState({question: text})}
					value={this.state.question}
				/>
				<Text style={styles.text}>Answer:</Text>
				<TextInput
					style={[styles.input, {alignSelf: 'stretch'}]}
					placeholder={'Answer'}
					onChangeText={(text) => this.setState({answer: text})}
					value={this.state.answer}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={ () => this.onPress(deckId, this.state.question, this.state.answer) }
				>
					<Text style={{color: white, textAlign: 'center'}}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'flex-start',
		padding: 20
	},
	text: {
		fontWeight: 'bold',
		fontSize: 24,
		marginBottom: 10
	},
	input: {
		height: 40,
		borderRadius: 4,
		borderColor: gray,
		borderWidth: 1,
		padding: 5,
		marginBottom: 20
	},
	button: {
		width: 100,
		padding: 10,
		backgroundColor: black,
		borderRadius: 4,
		borderWidth: 0.5,
		padding: 5,
		marginTop: 25
	}
});

export default connect()(AddQuestion);