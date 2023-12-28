import LibraryCommonUtility from '@thzero/library_common/utility';

class LibraryClientUtility {
	static isDebug = false;

	static convertNumber(value, defaultValue) {
		defaultValue = defaultValue ? defaultValue : null;

		if (String.isNullOrEmpty(value))
			return null;
		value = String.trim(value);
		return !String.isNullOrEmpty(value) ? Number(value) : defaultValue;
	}

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

	static debug(args) {
		if (!LibraryClientUtility.isDebug)
			return;
		console.debug(args);
	}

	static debug2(name, value) {
		if (!LibraryClientUtility.isDebug)
			return;

		// eslint-disable-next-line no-unneeded-ternary
		const output = name + ': ' + (value ? value : 'null');
		console.debug(output);
	}

	static info(args) {
		console.info(args);
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

	static userDisplayName(correlationId, user) {
		if (!user || !user.settings)
			return '';

		const settings = user.settings ? user.settings : null;
		const userName = settings && settings.gamerTag ? settings.gamerTag : user.external && user.external.name ? user.external.name : '******';
		return userName;
	}

	static ttlDelta(ttl) {
		const now = LibraryCommonUtility.getTimestamp();
		const delta = ttl - now;
		return delta > 0;
	}
	
	static _online = false;
}

export default LibraryClientUtility;
