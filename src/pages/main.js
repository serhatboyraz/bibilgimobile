import React, {Component} from 'react';
import {
	View
} from 'react-native';

import style from '@bibilgi/style/main';

export default class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View
				style={style.body}>
			</View>
		);
	}
}
