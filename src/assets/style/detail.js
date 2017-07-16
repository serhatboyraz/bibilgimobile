/**
 * @providesModule @bibilgi/style/detail
 */

import {
	StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
	body: {
		flex: 1,
		padding: 20
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor:'transparent',
	},
	info: {
		fontSize: 20,
		color: '#333',
		textAlign: 'center',
		lineHeight: 25
	},
	categories: {
		color: '#333',
		marginTop: 20,
		fontSize: 16,
		textAlign: 'center',
	},
	category: {
		marginLeft: 5,
		color: '#ff0',
	}
});
