/**
 * @providesModule @bibilgi/common
 */
import {
	AsyncStorage
} from 'react-native';

import Config from '@bibilgi/config';

var Common = {
	/*
	 * login control function
	*/
	isLogin: async function() {
		var isLogin = await AsyncStorage.getItem('setup-ready');
		if (isLogin === 'X')
			return true;
		return false;
	},

	/*
	 * json to x-www-form-urlencoded
	*/
	serializeKey(data) {
		var formBody = [];
		for (var property in data) {
		  var encodedKey = encodeURIComponent(property);
		  var encodedValue = encodeURIComponent(data[property]);
		  formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");
		return formBody;
	},

	/*
	 * user send request method
	*/
	send: async function (controller, action, data) {
		return await fetch(Config.API_URL + '/' + controller + '/' + action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
		  	},
		  	body: Common.serializeKey(data)
		})
		.then(res => res.json())
		.then(res => {
			return res
		})
		.catch(res => {
			return res;
		})
	}
}

module.exports = Common;