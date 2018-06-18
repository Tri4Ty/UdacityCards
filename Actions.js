export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_DECK = 'DELETE_DECK';
export const SET_DECKS = 'SET_DECKS';

export function addDeck (deckName) {
	let newDeck = {
		title: deckName,
		questions: []
	}
	return {
		type: ADD_DECK,
		data: newDeck
	}
}
export function setDecks (decks) {
	return {
		type: SET_DECKS,
		data: decks
	}
}

export function addQuestion (deckId, question, answer) {
	return {
		type: ADD_QUESTION,
		data: {
			id: deckId,
			question: question,
			answer: answer
		}
	}
}

export function deleteDeck (deckId) {
	return {
		type: DELETE_DECK,
		data: deckId
	}
}