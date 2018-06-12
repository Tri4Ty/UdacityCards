import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { white, gray, black, red } from '../utils/colors';

onPress = () => {
	console.log('button pressed')
}


const AddDeck = () => (
	<View style={styles.container}>
		<Text>What is the title of your new deck?</Text>
		<TextInput
			style={styles.input}
			placeholder={'New Deck Title'}
		/>
		<TouchableOpacity
			style={styles.button}
			onPress={this.onPress}
		>
			<Text style={{color: white}}>Create Deck</Text>
		</TouchableOpacity>

	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	input: {
		height: 40,
		borderColor: gray,
		borderWidth: 1,
		padding: 5,
		marginBottom: 10
	},
	button: {
		alignItems: 'center',
		backgroundColor: black,
		padding: 5
	}
});

export default AddDeck;