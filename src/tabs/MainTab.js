import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
	Image,
	ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class MainTab extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic cum sapiente minus, voluptas in. Illum, vel magnam perferendis quidem ea quas rerum iure architecto eaque, tempore ab, nemo a deserunt.',
	  		categories: 'Hayvanlar Alemi'
	  	};
	}
	render() {
		return (
			<Image
				source={require('@bibilgi/images').bgJPG}
				style={styles.body}>
				<ScrollView
					style={styles.container}>
					<Text
						style={styles.info}>
						{this.state.info}
					</Text>

					<Text
						style={styles.categories}>
						{'İlgili Kategoriler: '}
						<Text
							style={styles.category}>
							{this.state.categories}
						</Text>
					</Text>

					<View
						style={styles.buttonBar}>
						<TouchableOpacity
							style={styles.button}>
							<Icon
								name='ios-star-outline'
								size={20}
								color={'#fff'}/>
							<Text style={styles.favButtonText}>Favorilere Ekle</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, { backgroundColor: '#fff' }]}>
							<Text>Paylaş</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</Image>
		);
	}
}

const { height, width } = require('Dimensions').get('window');
const styles = StyleSheet.create({
	body: {
		flex: 1,
		padding: 20,
		width: width,
		height: height
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor:'transparent',
	},
	info: {
		fontSize: 20,
		color: '#fff',
		textAlign: 'center',
		lineHeight: 25
	},
	categories: {
		color: '#fff',
		marginTop: 20,
		fontSize: 16,
		textAlign: 'center',
	},
	category: {
		marginLeft: 5,
		color: '#ff0',
	},
	button: {
		flex: 1,
		padding: 15,
		backgroundColor: '#3ab248',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttonBar: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 30
	},
	favButtonText: {
		color: '#fff',
		marginLeft: 5
	}
});