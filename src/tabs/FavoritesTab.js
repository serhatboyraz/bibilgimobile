import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';

import {
	InfoService
} from '@bibilgi/services';

import style from '@bibilgi/style/main';

export default class FavoritesTab extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			favorites: []
		};
	}

	componentWillMount() {
		var self = this;
		InfoService.getFavs().then(res => {
			self.setState({
				favorites: res
			});
		});
	}

	render() {
		return (
			<View>
				{
					this.state.favorites.map((x, i) => (
						<View
							style={style.favListItem}
							key={i}>
							<Text
								style={style.favListText}>{x.title}</Text>
						</View>
					))
				}
			</View>
		);
	}
}