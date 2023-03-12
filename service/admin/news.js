import AdminService from '@thzero/library_client/service/admin';

class NewsAdminService extends AdminService {
	_urlFragment() {
		return 'news';
	}
}

export default NewsAdminService;
