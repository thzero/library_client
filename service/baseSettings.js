import Utility from '@thzero/library_common/utility';

import Service from './index';

class BaseSettings extends Service {
	clearUser(correlationId, store, user, func) {
		if (!store)
			return;

		const settings = user.settings ? user.settings : this.initializeUser(correlationId);
		func(correlationId, settings);
		store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	initializeUser(correlationId) {
		return {};
	}

	mergeUser(correlationId, settings) {
		return Utility.merge2(this.initializeUser(correlationId), settings);
	}
}

export default BaseSettings;
