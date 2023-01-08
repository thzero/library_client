class ClientUtility {
	static dateFormat(locale) {
		locale = !String.isNullOrEmpty(locale) ? locale : ClientUtility.getLocale();
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
}

export default ClientUtility;
