/**
 * @providesModule @bibilgi/config
 */

class Config {
	constructor() {
		this.default();
	}

	default() {
		this.API_URL = 'http://bibilgi.kodofisi.com';

		this.PUSH_NOTIFICATION = {
			senderID: "449102847730",
		    permissions: {
		        alert: true,
		        badge: true,
		        sound: false
		    }
		};

		this.reload();
	}

	reload() {

	}
}

module.exports = new Config();