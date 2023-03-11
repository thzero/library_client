import LibraryClientConstants from '../constants';

import LibraryCommonUtility from '@thzero/library_common/utility';

import injector from '@thzero/library_common/utility/injector';

import BaseBoot from '@thzero/library_client/boot/base';

class ServicesBaseBoot extends BaseBoot {
	_injectService(key, service) {
		if (LibraryCommonUtility.isDev)
			// eslint-disable-next-line
			console.log(`services.inject - ${key}`);
		this._services.set(key, service);
		injector.addSingleton(key, service);
	}
}

export default ServicesBaseBoot;
