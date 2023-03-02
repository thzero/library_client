import NotImplementedError from '@thzero/library_common/errors/notImplemented';

class BaseBoot {
	async execute(framework, app, router, store) {
		throw new NotImplementedError();
	}
}

export default BaseBoot;
