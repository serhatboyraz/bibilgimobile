import React, {Component} from 'react';
import {
	View,
	Text
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import {
	CustomTabBar,
	NavBar
} from '@bibilgi/components';

import {
	MainTab,
	FavoritesTab
} from '@bibilgi/tabs'

import {
	Setup
} from '@bibilgi/pages'

import style from '@bibilgi/style/main';

export default class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View
				style={{flex: 1}}>
				<NavBar
					title={'BiBilgi'}/>
				<ScrollableTabView
					renderTabBar={() => <CustomTabBar/>}>
					<MainTab tabLabel='ios-timer'/>
					<FavoritesTab tabLabel='ios-star'/>
					<Setup tabLabel='ios-cog' hideNavBar={true}/>
				</ScrollableTabView>
			</View>
		);
	}
}
