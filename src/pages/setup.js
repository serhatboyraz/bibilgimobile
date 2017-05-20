import React, {Component} from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	Platform
} from 'react-native';

import {
	Actions
} from 'react-native-router-flux';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import {
	WebService
} from '@bibilgi/providers'

import style from '@bibilgi/style/setup';

export default class Setup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: [],
			sendfreq: '6',
			allCheck: false
		};
		this.loadDefault();
	}

	async loadDefault() {
		var self = this;
		
		WebService.getCategoryList().then(res => {
			var group = [];
			for (var i = 0, j = 0; i < res.length; i++) {
				if (i >= 3 && i % 3 === 0)
					j++;
				group[j] = group[j] || [];
				group[j].push(res[i])
			}
			self.setState({
				categories: group
			})
			self.checkControl.bind(self)();
		})
	}

	checkControl() {
		var search = this.state.categories.find(x => {
			return x.find(y => {
				return y.selected === false
			})
		});
		if (search !== undefined)
			this.setState({
				allCheck: false
			})
		else
			this.setState({
				allCheck: true
			})
	
	}

	changeCategory(item) {
		var search;
		var self = this;
		this.state.categories.map(x => {
			search = x.find(y => {
				return y === item
			})
			if (search !== undefined) {
				search.selected = !search.selected
				return;
			}
		});
		this.setState({
			categories: this.state.categories
		}, () => {
			self.checkControl.bind(self)();
		});
	}

	checkAll(type) {
		var self = this;
		switch (type) {
			case 'select':
				this.state.categories.find(x => {
					x.find(y => {
						y.selected = true;
					})
				});
				break;
			case 'deselect':
				this.state.categories.find(x => {
					x.find(y => {
						y.selected = false;
					})
				});
				break;
		}

		this.setState({
			categories: this.state.categories
		}, () => {
			self.checkControl();
		})
	}

	save() {
		var search = this.state.categories.find(x => {
			return x.find(y => {
				return y.selected === true
			})
		});
		if (search !== undefined)
			WebService.edit({}).then(res => {
				var tmp = [];
				var categories = this.state.categories;
				categories.find(x => {tmp = tmp.concat(x)})
				categories = tmp;

				var categoryIds = categories.filter(x => {
					return x.selected === true
				})
				.map(x => x.id)
				.join();

				WebService.setCategories(categoryIds).then(res => {
					Actions.Main({type: 'reset'});
				})
			})
		else
			Alert.alert('Üzgünüz', 'Hiçbir şey adında bir kategorimiz yok. Başka kategori seçebilirsiniz')
	}

	render() {
		return (
			<View
				style={style.body}>
				<ScrollView>
					<View
						style={style.option}>
						<Text
							style={style.optionHeader}>
							Hangi kategorileri tercih ediyorsunuz ?
						</Text>
						{
							this.state.categories.length < 1 ? 
								<ActivityIndicator
									animating={true}/>
							: null
						}
						<View
							style={style.optionBody}>
							<View
								style={style.categoryBody}>
								{
									!this.state.allCheck ? 
										<TouchableOpacity
											onPress={() => this.checkAll('select')}
											style={style.categoryAllSelect}>
											<Text>Tümünü Seç</Text>
										</TouchableOpacity>
									: 
										<TouchableOpacity
											onPress={() => this.checkAll('deselect')}
											style={style.categoryAllDeselect}>
											<Text
												style={{color: '#fff'}}>Tümünü Kaldır</Text>
										</TouchableOpacity>
								}
							</View>
							{
								this.state.categories.map((item, key) => {
									return (
										<View
											style={style.categoryBody}
											key={key}>
											<TouchableOpacity
												onPress={() => this.changeCategory.bind(this)(item[0])}
												style={[style.optionBodyImageContainer, item[0].selected ? style.categorySelected: {}]}>
												<Image
													style={style.optionBodyImage}
													source={{
														uri: item[0].avatar
													}}>
												</Image>
												<Text
													numberOfLines={1}
													style={[style.categoryText, item[0].selected ? style.categorySelectedText : {}]}>
													{item[0].title}
												</Text>
											</TouchableOpacity>
											{
												item[1] ? 
													<TouchableOpacity
														onPress={() => this.changeCategory.bind(this)(item[1])}
														style={[style.optionBodyImageContainer, item[1].selected ? style.categorySelected: {}]}>
														<Image
															style={style.optionBodyImage}
															source={{
																uri: item[1].avatar
															}}>
														</Image>
														<Text
															numberOfLines={1}
															style={[style.categoryText, item[1].selected ? style.categorySelectedText : {}]}>
															{item[1].title}
														</Text>
													</TouchableOpacity>
												: null
											}
											{
												item[2] ? 
													<TouchableOpacity
														onPress={() => this.changeCategory.bind(this)(item[2])}
														style={[style.optionBodyImageContainer, item[2].selected ? style.categorySelected: {}]}>
														<Image
															style={style.optionBodyImage}
															source={{
																uri: item[2].avatar
															}}>
														</Image>
														<Text
															numberOfLines={1}
															style={[style.categoryText, item[2].selected ? style.categorySelectedText : {}]}>
															{item[2].title}
														</Text>
													</TouchableOpacity>
												: null
											}
										</View>
									)
								})
							}
						</View>
					</View>
					<View
						style={style.option}>
						<Text
							style={style.optionHeader}>
							Kaç saatte bir bildirim gelsin ?
						</Text>
						<View
							style={style.optionBody}>
							<TextInput
								placeholder="Lütfen bir aralık giriniz."
								keyboardType={'numeric'}
								underlineColorAndroid="transparent"
								value={this.state.sendfreq}
								style={style.inputSendfreq}
								onChangeText={(value) => this.setState({sendfreq: value})}/>
						</View>
					</View>
					<View
						style={style.option}>
						<View
							style={style.optionBody}>
							<TouchableOpacity
								style={style.saveButton}
								onPress={this.save.bind(this)}>
								<Text> Kaydet </Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
				{Platform.OS === 'ios' ? <KeyboardSpacer/> : null}
			</View>
		);
	}
}
