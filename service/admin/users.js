import AdminService from '@thzero/library_client/service/admin';

class AdminUsersService extends AdminService {
	get _allowsCreate() {
		return false;
	}

	_urlFragment() {
		return 'users';
	}
}

export default AdminUsersService;
