import {
	AsyncStorage
} from 'react-native';

import {
	send
} from '@bibilgi/common';

import {
	NotificationService
} from '@bibilgi/services';

class WebService {
	/*
	 * Kullanıcının cihazını kaydetmek için kullanılır.
	 * @token: cihazın push token'ı
	*/
	async saveDevice(token) {
		token = token || 'WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB';
		send('Device', 'save', {
			deviceId: token,
			sendfreq: 60
		})
		.then(res => {
			if (typeof res === 'object') {
				if (res.RESULT || res.DATA === "0x0004") {
					AsyncStorage.setItem('setup-ready', 'X');
				}
			}
		});
	}
	/*
	 * Kullanıcının cihazını kaydetmek için kullanılır.
	*/
	async getCategoryList() {
		var token = NotificationService.token || 'WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB';
		
		return await send('Device', 'getCategoryList', {
			deviceId: token
		})
		.then(res => {
			if (typeof res === 'object') {
				if (res.RESULT === true && res.DATA !== undefined) {
					return res.DATA;
				}
			}
		});
	}

	/*
	 * Kullanıcının bilgilerini düzenler
	 * 
	*/
	async edit(data) {
		var token = NotificationService.token || 'WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB';
		
		return await send('Device', 'edit', {
			deviceId: token,
			sendfreq: parseInt(data.sendfreq || 6) * 60,
			manufacturer: data.manufacturer,
			model: data.model,
			serial: data.serial,
			version: data.version,
			phone: data.phoneNumber,
			notificationactive: 1
		})
		.then(res => {
			return res;
		});
	}

	/*
	 * kullanıcının gündemini değiştirmek için kullanılır
	*/
	async setCategories(categoryIds) {
		var token = NotificationService.token || 'WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB';

		return await send('Device', 'setCategories', {
			deviceId: token,
			catids: categoryIds
		})
		.then(res => {
			AsyncStorage.setItem('setup-ready', 'X');
			return res;
		});
	}

	/*
	 * kullanıcıya gelen en son bilgirimi getirir
	*/
	async getLastInfo() {
		var token = NotificationService.token || 'WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB';
		return await send('Device', 'getLastInfo', {
			deviceId: token
		})
		.then(res => {
			if (typeof res === 'object') {
				if (res.RESULT === true && res.DATA !== undefined && res.DATA.info !== undefined) {
					return res.DATA;
				}
			}
			return;
		});
	}

	/*
	 * bir bilgiyi favorilere eklemek için kullanılır
	*/
	async setFav(infoId, fav) {
		var token = NotificationService.token || 'WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB';
		return await send('Device', 'setFav', {
			deviceId: token,
			infoid: infoId,
			type: fav ? 'X': ''
		})
		.then(res => {
			return res;
		});
	}
}

module.exports = new WebService();
