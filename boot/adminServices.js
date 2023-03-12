import LibraryClientConstants from '@thzero/library_client/constants';

import adminNewsService from '@thzero/library_client/service/admin/news';
import adminUsersService from '@thzero/library_client/service/admin/users';

import ServicesBaseBoot from '@thzero/library_client/boot/baseServices';

class AdminServicesBaseBoot extends ServicesBaseBoot {
	constructor() {
		super();
	}

	async _initialize() {
		await super._initialize();

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
