import {
	ADD_DECK,
	DELETE_DECK,
	ADD_QUESTION,
	SET_DECKS
} from './Actions';

function decks (state = {}, action) {
	switch (action.type) {
		case ADD_DECK :
			let newDeck = action.data;
			let deckId = newDeck.title.replace(/ /g,'');
			let modifiedDecks = (state.decks ? JSON.parse(JSON.stringify(state.decks)) : {});
			modifiedDecks[deckId] = newDeck;

			return {
				...state,
				decks: modifiedDecks
			}
		case ADD_QUESTION :
			let id = action.data.id;
			let question = {
				question: action.data.question,
				answer: action.data.answer
			};

			// get the deck in question
			let updatedDeck = JSON.parse(JSON.stringify(state.decks[id]));
			updatedDeck['questions'].push(question);

			let updatedDecks = JSON.parse(JSON.stringify(state.decks));
			updatedDecks[id] = updatedDeck;

			return {
				...state,
				decks: updatedDecks
			}
		case SET_DECKS :
			let decks = action.data;

			return {
				...state,
				decks: decks
			}
		case DELETE_DECK :
			let existingDecks = (state.decks ? JSON.parse(JSON.stringify(state.decks)) : {});
			delete existingDecks[action.data];

			return {
				...state,
				decks: existingDecks
			}
		default :
			return state
	}
}

export default decks