import React, {Component} from 'react';
import {
	View,
	ActivityIndicator,
	Text,
	ScrollView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
	NavBar
} from '@bibilgi/components';

import style from '@bibilgi/style/detail';

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infoId: this.infoId
		};
	}

	loadInfo() {
		
	}

	render() {
		return (
			<View
				style={{flex: 1}}>
				<NavBar
					onBack={() => {
						Actions.pop();
					}}
					title={'BiBilgi'}/>
				<View
					style={style.body}>
					<ScrollView
						style={style.container}>
						<Text
							style={style.info}>
							{this.state.info || ' '}
						</Text>

						<Text
							style={style.categories}>
							{'İlgili Kategoriler: '}
							<Text
								style={style.category}>
								{this.state.categories || ' '}
							</Text>
						</Text>
					</ScrollView>
				</View>
			</View>
		);
	}
}
