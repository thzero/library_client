import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import BaseBoot from '@thzero/library_client/boot/base';

class i18nBaseBoot extends BaseBoot {
	async execute(framework, app, router, store) {
		throw new NotImplementedError();
	}
}

export default i18nBaseBoot;
