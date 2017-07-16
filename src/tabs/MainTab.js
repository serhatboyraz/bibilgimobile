import React, {Component} from 'react';
import {
	Styleheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
	Image,
	ScrollView,
	ActivityIndicator,
} from 'react-native';

import {
	WebService
} from '@bibilgi/providers';

import {
	InfoService
} from '@bibilgi/services';

import Icon from 'react-native-vector-icons/Ionicons';

import style from '@bibilgi/style/main';

export default class MainTab extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		infoId: null,
	  		info: null,
	  		categories: null,
	  		isAddedFav: false,
	  		loading: true
	  	};
	}

	componentWillMount() {
		var self = this;
		WebService.getLastInfo().then(res => {
			self.setState({
				infoId: res.id,
				info: res.content,
				isAddedFav: res.favcount !== "0",
				loading: false
			});
			InfoService.setNowInfo(res);
		});
	}

	toggleFav() {
		this.setState({
			isAddedFav: !this.state.isAddedFav
		}, () => {
			WebService.setFav(this.state.infoId, this.state.isAddedFav);
		});
	}

	render() {
		return (
			this.state.loading ? (
				<ActivityIndicator
					animating={true}
					size={'large'}/>
			)
			: (
				<Image
					source={require('@bibilgi/images').bgJPG}
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

						<View
							style={style.buttonBar}>
							<TouchableOpacity
								onPress={this.toggleFav.bind(this)}
								style={[style.button, this.state.isAddedFav && {backgroundColor: '#cece35'}]}>
								<Icon
									name={this.state.isAddedFav ? 'ios-star' : 'ios-star-outline'}
									size={20}
									color={'#fff'}/>
								{
									this.state.isAddedFav ?
									<Text style={style.favButtonText}>Favorilerden Kaldır</Text>
									:
									<Text style={style.favButtonText}>Favorilere Ekle</Text>
								}
							</TouchableOpacity>

							<TouchableOpacity
								style={[style.button, { backgroundColor: '#fff' }]}>
								<Text>Paylaş</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</Image>
			)
		);
	}
}