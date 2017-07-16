/**
 * @providesModule @bibilgi/index
 */
import '@bibilgi/globals';
import React, { Component } from 'react';
import {
	AppRegistry,
} from 'react-native';

import {
	Scene,
	Router,
} from 'react-native-router-flux';

import {
	Start,
	Setup,
	Main,
	Detail,
} from '@bibilgi/pages';

export default class BiBilgi extends Component {
	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene key="Start" component={Start} title="Start" hideNavBar={true}/>
					<Scene key="Main" component={Main} title="Bi Bilgi" hideNavBar={true}/>
					<Scene key="Setup" component={Setup} title="Kurulum" hideNavBar={true}/>
					<Scene key="Detail" component={Detail} title="Kurulum" hideNavBar={true}/>
				</Scene>
			</Router>
		);
	}
}

AppRegistry.registerComponent('BiBilgi', () => BiBilgi);
