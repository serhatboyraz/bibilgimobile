/**
 * @providesModule @bibilgi/style/setup
 */

import {
	StyleSheet
} from 'react-native';

import Dimensions from 'Dimensions';
const {width} = Dimensions.get('window');

module.exports = StyleSheet.create({
	body: {
		flex: 1
	},
	option: {

	},
	optionHeader: {
		fontSize: 21,
		textAlign: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		marginBottom: 10,
		paddingBottom: 10,
		paddingTop: 10
	},
	optionBody: {
		flexDirection: 'column',
	},
	optionBodyImageContainer: {
		padding: 2,
		margin: 2,
		borderWidth: 1,
		flex: 1,
		borderRadius: 4,
		borderWidth: 1,
		borderColor:'#eee',
		backgroundColor: '#eee'
	},
	optionBodyImage: {
		height: 100,
		borderRadius: 4
	},
	categoryBody: {	
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
	},
	categoryText: {
		textAlign: 'center',
		color: '#333',
		fontSize: 15,
		textDecorationLine: 'line-through'
	},
	categorySelectedText: {
		textDecorationLine: 'none'
	},
	categorySelected: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor:'#14beff',
		backgroundColor: '#5ec9f5'
	},
	inputSendfreq: {
		borderWidth: 1,
		margin: 10,
		borderColor: '#ccc',
		borderRadius: 4,
		paddingLeft: 10
	},
	categoryAllSelect: {
		padding: 5,
		margin: 2,
		marginBottom: 10,
		borderWidth: 1,
		borderRadius: 4,
		borderWidth: 1,
		borderColor:'#eee',
		backgroundColor: '#eee'
	},
	categoryAllDeselect: {
		padding: 5,
		margin: 2,
		marginBottom: 10,
		borderWidth: 1,
		borderRadius: 4,
		borderWidth: 1,
		borderColor:'#f00',
		backgroundColor: '#f00'
	},
	saveButton: {
		padding: 15,
		margin: 12,
		borderWidth: 1,
		borderRadius: 4,
		borderWidth: 1,
		borderColor:'#5ec9f5',
		backgroundColor: '#5ec9f5',
		alignItems: 'center'
	}
});
