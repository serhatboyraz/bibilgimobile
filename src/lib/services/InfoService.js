import {
	AsyncStorage
} from 'react-native';

import {
	SqlService
} from '@bibilgi/providers';

class InfoService {
	async setNowInfo(info) {
		var str = typeof info === 'object' ? JSON.stringify(info) : null;
		if (str !== null)
			await AsyncStorage.setItem('now-info', str);
		else
			return;

		var data = {
			id: info.info.id,
			title: info.info.title,
			content: info.info.content,
			username: info.crusr.name,
			usermail: info.crusr.mail,
			categories: info.categories.map(x => x.id).join(),
			isFav: info.info.favcount !== "0" ? 'true' : 'false'
		};

		for (var i = 0; i < info.categories.length; i++)
			this.setCategory(info.categories[i]);

		SqlService.insert('infos', Object.keys(data), Object.values(data)).then(res => {
		}, err => {
			SqlService.update('infos', Object.keys(data), Object.values(data), "id = ?", [data.id]);
		});
	}

	async setCategory(category) {
		var data = {
			"id": category.id,
			"avatar": category.avatar,
			"title": category.title,
			"date": String(new Date()),
		};

		SqlService.insert('categories', Object.keys(data), Object.values(data)).then(res => {
		}, err => {
			SqlService.update('categories', Object.keys(data), Object.values(data), "id = ?", [data.id]);
		});
	}

	async getFavs() {
		return SqlService.query('SELECT infos.*, categories.title AS categories from infos LEFT JOIN categories ON infos.categories IN(categories.id) WHERE infos.isFav = ? ', ['true']).then(res => {
			return res;
		});
	}

	async setFav(infoId, isFav) {
		return SqlService.update('infos', ['isFav'], [String(isFav)], "id = ?", [infoId]).then(() => {
		}, err => {
		});
	}
}

module.exports = new InfoService();
