import AdminService from '../../service/admin';

class NewsAdminService extends AdminService {
	_urlFragment() {
		return 'news'
	}
}

export default NewsAdminService;
