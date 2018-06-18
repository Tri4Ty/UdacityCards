import { AsyncStorage } from 'react-native';
import { STORAGE_KEY } from './GlobalConstants';

export function getAllDecks() {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then( (results) => {
			return JSON.parse(results);
		});
}

export function mergeDeckData(key, value) {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[key] = undefined
			delete data[key]
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value))
		})
}

export function deleteDeckData() {
	return AsyncStorage.removeItem(STORAGE_KEY);
}