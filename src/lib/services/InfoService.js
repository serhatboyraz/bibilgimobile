import {
	AsyncStorage
} from 'react-native';

class InfoService {
	async setNowInfo(info) {
		return await AsyncStorage.setItem('now-info', info);
	}
}

module.exports = new InfoService();
