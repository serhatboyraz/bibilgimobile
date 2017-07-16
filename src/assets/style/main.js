/**
 * @providesModule @bibilgi/style/main
 */

import {
	StyleSheet
} from 'react-native';

const { height, width } = require('Dimensions').get('window');

module.exports = StyleSheet.create({
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
	},

	// fav tab
	favListItem: {
		borderBottomWidth: 1,
		borderColor: '#ccc'
	},
	favListText: {
		fontSize: 15,
		color: '#333'
	}
});
