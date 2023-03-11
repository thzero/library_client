import LibraryClientConstants from '@thzero/library_clientconstants';

import adminNewsService from '@thzero/library_clientservice/admin/news';
import adminUsersService from '@thzero/library_clientservice/admin/users';

import ServicesBaseBoot from '@thzero/library_clientbaseServices';

class AdminServicesBaseBoot extends ServicesBaseBoot {
	constructor() {
		super();
	}

	async _initialize() {
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_NEWS, this._initializeAdminNews());
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_USERS, this._initializeAdminUsers());
	}

	_initializeAdminNews() {
		return new adminNewsService();
	}

	_initializeAdminUsers() {
		return new adminUsersService();
	}

	_injectService(key, service) {
		if (LibraryCommonUtility.isDev)
			// eslint-disable-next-line
			console.log(`services.inject - ${key}`);
		this._services.set(key, service);
		injector.addSingleton(key, service);
	}
}

export default AdminServicesBaseBoot;