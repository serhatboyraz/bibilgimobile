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
	Share,
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
			if (res === undefined)
				return;
			self.setState({
				infoId: res.info.id,
				info: res.info.content,
				isAddedFav: res.info.favcount !== "0",
				loading: false,
				categories: res.categories.map(x => x.title).join()
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

	shareInfo() {
		if (this.state.info !== null) {
			var extText = ' BiBilgi uygulamasından paylaşıldı daha fazla bilgi için: https://play.google.com/store/apps/details?id=com.kodofisi.bibilgi';
			Share.share({
				message: this.state.info + extText,
				url: 'http://bibilgi.kodofisi.com',
				title: 'BiBilgi',
			});
		}
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
								style={[style.button, { backgroundColor: '#fff' }]}
								onPress={this.shareInfo.bind(this)}>
								<Text>Paylaş</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</Image>
			)
		);
	}
}