import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';

export default class NavBar extends Component {
	render() {
		return (
			<View
				style={this.props.style || {
					...Platform.select({
						ios: {
							height: 60,
							paddingTop: 4
						},
						android: {
							height: 50,
						}
					}),
					width: '100%',
					alignSelf: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#eee'
				}}>
				<Text
					style={this.props.titleStyle || {
						fontSize: 16,
						color: '#333',
					}}>{this.props.title || ' '}</Text>
			</View>
		);
	}
}