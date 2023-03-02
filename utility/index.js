class LibraryClientUtility {
	static dateFormat(locale) {
		locale = !String.isNullOrEmpty(locale) ? locale : LibraryClientUtility.getLocale();
		const formatObj = new Intl.DateTimeFormat(locale).formatToParts(new Date());
		return formatObj.map(obj => {
			switch (obj.type) {
			case 'day':
				return 'DD';
			case 'month':
				return 'MM';
			case 'year':
				return 'YYYY';
			default:
				return obj.value;
			}
		}).join('');
	}

	static getLocale() {
		return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
	}

	static get online() {
		return LibraryClientUtility._online;
	}

	static set online(value) {
		LibraryClientUtility._online = value;
	}
	
	static _online = false;
}

export default LibraryClientUtility;
