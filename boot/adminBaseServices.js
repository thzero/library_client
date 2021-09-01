import LibraryConstants from '../constants';

import adminNewsService from '../service/admin/news';
import adminUsersService from '../service/admin/users';

import BaseServices from './baseServices';

class AdminBaseServices extends BaseServices {
	constructor() {
		super();
	}
	
	async _initialize() {
		this._inject(LibraryConstants.InjectorKeys.SERVICE_ADMIN_NEWS, this._initializeAdminNews());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_ADMIN_USERS, this._initializeAdminUsers());
	}

	_initializeAdminNews() {
		return new adminNewsService();
	}

	_initializeAdminUsers() {
		return new adminUsersService();
	}
}

export default AdminBaseServices;
