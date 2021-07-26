class GeolocationUtility {
	static getCurrentPosition(options = {}) {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(resolve, reject, options);
				return;
			}
			reject(null);
		});
	}
}

export default GeolocationUtility;
