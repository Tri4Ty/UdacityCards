import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';

import { addDeck } from '../Actions';
import { white, gray, black, red } from '../utils/colors';

class AddDeck extends Component {
	state = {
		deckName: ''
	}

	onPress = (deckName) => {
		this.props.dispatch(addDeck(deckName));
		this.setState({ deckName: '' });
		this.props.navigation.navigate(
			'DeckDetail',
			{
				deckId: deckName.replace(/ /g,''),
				deckName: deckName
			}
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>What is the title of your new deck?</Text>
				<TextInput
					style={[styles.input, {alignSelf: 'stretch'}]}
					placeholder={'New Deck Title'}
					onChangeText={(text) => this.setState({deckName: text})}
					value={this.state.deckName}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={ () => this.onPress(this.state.deckName) }
				>
					<Text style={{color: white}}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	text: {
		fontWeight: 'bold',
		fontSize: 38,
		textAlign: 'center'
	},
	input: {
		height: 40,
		borderRadius: 4,
		borderColor: gray,
		borderWidth: 1,
		padding: 5,
		marginTop: 25,
		marginBottom: 10
	},
	button: {
		width: 100,
		padding: 10,
		alignItems: 'center',
		backgroundColor: black,
		borderRadius: 4,
		borderWidth: 0.5,
		padding: 5
	}
});

export default connect()(AddDeck);