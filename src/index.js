/**
 * @providesModule @bibilgi/index
 */
import '@bibilgi/globals';

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Alert,
	Platform
} from 'react-native';

import {
	Actions,
	Scene,
	Router
} from 'react-native-router-flux';

import {
	Start,
	Setup,
	Main
} from '@bibilgi/pages';

export default class BiBilgi extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const scenes = Actions.create(
			<Scene key="root">
				<Scene key="Start" component={Start} title="Start" hideNavBar={true}/>
				<Scene key="Main" component={Main} title="Bi Bilgi" />
				<Scene key="Setup" component={Setup} title="Kurulum" />
			</Scene>
		);

		return (
			<Router
				scenes={scenes}
				sceneStyle={{
					paddingTop: Platform.OS === 'ios' ? 65: 55
				}}/>
		);
	}
}

AppRegistry.registerComponent('BiBilgi', () => BiBilgi);
