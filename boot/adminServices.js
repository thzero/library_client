import LibraryClientConstants from '../constants';

import adminNewsService from '../service/admin/news';
import adminUsersService from '../service/admin/users';

import ServicesBaseBoot from './baseServices';

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
