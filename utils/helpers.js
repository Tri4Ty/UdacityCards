import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

import { NOTIFICATION_KEY } from './GlobalConstants';

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createLocalNotification() {
	return {
		title: 'Study Time',
		body: "Please do not forget to study for your quiz today!",
		ios: {
			sound: true
		}
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(8)
							tomorrow.setMinutes(57)

							Notifications.scheduleLocalNotificationAsync(
								createLocalNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}