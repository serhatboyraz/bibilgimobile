import React, {Component} from 'react';
import {
	View,
	ActivityIndicator
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import style from '@bibilgi/style/start';

import {
	isLogin
} from '@bibilgi/common';

import {
	SqlService
} from '@bibilgi/providers';

import {
	NotificationService
} from '@bibilgi/services'

export default class Start extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.loadStorage();
		this.loadPushToken();

		this.isLogin();
	}

	async loadStorage() {
		SqlService.query('CREATE TABLE IF NOT EXISTS infos (id TEXT, title TEXT, content TEXT, image TEXT, username TEXT, usermail TEXT, userimage TEXT, categories TEXT, isFav TEXT, UNIQUE(id))')
		SqlService.query('CREATE TABLE IF NOT EXISTS categories (id TEXT, avatar TEXT, title TEXT, date TEXT, UNIQUE(id))')
	}

	async loadPushToken() {
		NotificationService.init();
	}

	async isLogin() {
		isLogin().then(res => {
			if (res)
				// is logged
				Actions.Main({type: 'reset'});
			else
				// not login
				Actions.Setup({type: 'reset'});
		})
	}

	render() {
		return (
			<View
				style={style.body}>
				<ActivityIndicator
					animating={true}
					size={'large'}/>
			</View>
		);
	}
}
