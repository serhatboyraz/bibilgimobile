import {
	AsyncStorage
} from 'react-native';

class InfoService {
	async setNowInfo(info) {
		var str = typeof info === 'object' ? JSON.stringify(info) : null;
		if (str !== null)
			return await AsyncStorage.setItem('now-info', str);
		return null;
	}
}

module.exports = new InfoService();
