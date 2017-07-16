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
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: '#eee'
				}}>
				{
					this.props.onBack &&
					<TouchableOpacity
						style={{
							position: 'absolute',
							justifyContent: 'center',
							left: 0,
							top: 0,
							paddingLeft: 15,
							paddingRight: 15,
							...Platform.select({
								ios: {
									height: 60,
									paddingTop: 4
								},
								android: {
									height: 50
								}
							}),
						}}
						onPress={this.props.onBack}>
						<Text
							style={this.props.backStyle || {
								fontSize: 16,
								color: '#333',
							}}>{'Çık'}</Text>
					</TouchableOpacity>	
				}
				<Text
					style={this.props.titleStyle || {
						fontSize: 16,
						color: '#333',
					}}>{this.props.title || ' '}</Text>
			</View>
		);
	}
}