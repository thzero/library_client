import LibraryConstants from '../constants';

import Utility from '@thzero/library_common/utility';

import injector from '@thzero/library_common/utility/injector';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import adminNewsService from '../service/admin/news';
import adminUsersService from '../service/admin/users';
import configService from '../service/config';
import cryptoService from '../service/crypto';
import featureService from '../service/features';
import loggerService from '../service/logger';
import markupParserService from '../service/markupParser';
import newsService from '../service/news';
import plansService from '../service/plans';
import securityService from '../service/security';
import utilityService from '../service/utility';

class BaseServices {
	constructor() {
		this._services = new Map();
	}

	async execute(framework, app, router, store) {
		const logger = this._initializeLogger();
		if (!logger)
			throw Error('No logger defined after initialization of services.');

		const serviceAuth = this._initializeAuth();
		if (serviceAuth) {
			const serviceUser = this._initializeUser();
			if (!serviceUser)
				throw new NotImplementedError();
			this._inject(LibraryConstants.InjectorKeys.SERVICE_AUTH, serviceAuth);
			this._inject(LibraryConstants.InjectorKeys.SERVICE_USER, serviceUser);
		}

		this._inject(LibraryConstants.InjectorKeys.SERVICE_CRYPTO, this._initServiceCrypto());

		const serviceCommunicationRest = this._initializeCommunicationRest();
		if (serviceCommunicationRest)
			this._inject(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST, serviceCommunicationRest);

		this._inject(LibraryConstants.InjectorKeys.SERVICE_CONFIG, this._initializeConfig());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_EVENT, this._initializeEvent());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_FEATURES, this._initializeFeatures());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_LOGGER, logger);
		this._inject(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER, this._initializeMarkupParser());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_NEWS, this._initializeNews());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_PLANS, this._initializePlans());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_ROUTER, this._initializeRouter());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_SECURITY, this._initializeSecurity());

		const serviceSettings = this._initializeSettings();
		if (serviceSettings)
			this._inject(LibraryConstants.InjectorKeys.SERVICE_SETTINGS, serviceSettings);

		this._inject(LibraryConstants.InjectorKeys.SERVICE_STORE, this._initializeStore());

		const translateService = this._initializeTranslate();
		if (translateService)
			this._inject(LibraryConstants.InjectorKeys.SERVICE_TRANSLATE, translateService);

		this._inject(LibraryConstants.InjectorKeys.SERVICE_UTILITY, this._initializeUtility());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_VERSION, this._initializeVersion());
		
		this._initialize();

		for (const [key, value] of this._services) {
			if (Utility.isDev)
				// eslint-disable-next-line
				console.log(`services.init - ${key} = ${value}`);
			await value.init(injector);
		}
		store.$logger = logger;

		this._initializeInjector(framework, injector);

		Utility.initDateTime();
	}

	_initialize() {
		throw new NotImplementedError();
	}

	_initializeAuth() {
		return null;
	}

	_initServiceCrypto() {
		return new cryptoService();
	}

	_initializeCommunicationRest() {
		return null;
	}

	_initializeConfig() {
		return new configService();
	}

	_initializeEvent() {
		throw new NotImplementedError();
	}

	_initializeFeatures() {
		return new featureService();
	}

	_initializeInjector(framework, injector) {
	}

	_initializeLogger() {
		return new loggerService();
	}

	_initializeMarkupParser() {
		return new markupParserService();
	}

	_initializeNews() {
		return new newsService();
	}

	_initializePlans() {
		return new plansService();
	}

	_initializeRouter() {
		throw new NotImplementedError();
	}

	_initializeSecurity() {
		return new securityService();
	}

	_initializeSettings() {
		return null;
	}

	_initializeStore() {
		throw new NotImplementedError();
	}

	_initializeTranslate() {
		return null;
	}

	_initializeUser() {
		return null;
	}

	_initializeUtility() {
		return new utilityService();
	}

	_initializeVersion() {
		throw new NotImplementedError();
	}

	_inject(key, service) {
		if (Utility.isDev)
			// eslint-disable-next-line
			console.log(`services.inject - ${key}`);
		this._services.set(key, service);
		injector.addSingleton(key, service);
	}
}

export default BaseServices;
