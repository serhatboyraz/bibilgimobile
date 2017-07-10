import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
	Image,
} from 'react-native';

export default class MainTab extends Component {
	render() {
		return (
			<Image
				source={require('@bibilgi/images').bgJPG}
				style={styles.body}>
				<Text>Güncel</Text>
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
	}
});