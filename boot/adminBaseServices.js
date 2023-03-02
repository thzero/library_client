import LibraryClientConstants from '../constants';

import adminNewsService from '../service/admin/news';
import adminUsersService from '../service/admin/users';

import ServicesBaseBoot from '@thzero/library_client/boot/baseServices';

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
}

export default AdminServicesBaseBoot;
