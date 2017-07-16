import PushNotification from 'react-native-push-notification';

import Config from '@bibilgi/config';

import { WebService } from '@bibilgi/providers';

class NotificationService {

	token = undefined;

	init() {
		PushNotification.configure({
		    // (optional) Called when Token is generated (iOS and Android)
		    onRegister: this.register.bind(this),

		    // (required) Called when a remote or local notification is opened or received
		    onNotification: this.onNotification.bind(this),

		    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
		    senderID: Config.PUSH_NOTIFICATION.senderID,

		    // IOS ONLY (optional): default: all - Permissions to register.
		    permissions: Config.PUSH_NOTIFICATION.permissions,

		    // Should the initial notification be popped automatically
		    // default: true
		    popInitialNotification: true,

		    /**
		      * (optional) default: true
		      * - Specified if permissions (ios) and token (android and ios) will requested or not,
		      * - if not, you must call PushNotificationsHandler.requestPermissions() later
		      */
		    requestPermissions: true,
		});
	}

	register(token) {
		this.token = token.token;
		this.sendToken();
		console.log(this.token + ' : token kaydedildi')
	}

	onNotification(notification) {
		console.log(notification);
	}

	sendToken() {
		WebService.saveDevice(this.token);
	}
}

module.exports = new NotificationService();
