import ClientConstants from '../constants';

import adminNewsService from '../service/admin/news';
import adminUsersService from '../service/admin/users';

import BaseServices from './baseServices';

class AdminBaseServices extends BaseServices {
	constructor() {
		super();
	}
	
	async _initialize() {
		this._injectService(ClientConstants.InjectorKeys.SERVICE_ADMIN_NEWS, this._initializeAdminNews());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_ADMIN_USERS, this._initializeAdminUsers());
	}

	_initializeAdminNews() {
		return new adminNewsService();
	}

	_initializeAdminUsers() {
		return new adminUsersService();
	}
}

export default AdminBaseServices;
