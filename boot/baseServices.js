import ClientConstants from '../constants';

import CommonUtility from '@thzero/library_common/utility';

import injector from '@thzero/library_common/utility/injector';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

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
			this._injectService(ClientConstants.InjectorKeys.SERVICE_AUTH, serviceAuth);
			this._injectService(ClientConstants.InjectorKeys.SERVICE_USER, serviceUser);
		}

		this._injectService(ClientConstants.InjectorKeys.SERVICE_CRYPTO, this._initServiceCrypto());

		const serviceCommunicationRest = this._initializeCommunicationRest();
		if (serviceCommunicationRest)
			this._injectService(ClientConstants.InjectorKeys.SERVICE_COMMUNICATION_REST, serviceCommunicationRest);

		this._injectService(ClientConstants.InjectorKeys.SERVICE_CONFIG, this._initializeConfig());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_EVENT, this._initializeEvent());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_FEATURES, this._initializeFeatures());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_LOGGER, logger);
		this._injectService(ClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER, this._initializeMarkupParser());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_NEWS, this._initializeNews());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_PLANS, this._initializePlans());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_ROUTER, this._initializeRouter());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_SECURITY, this._initializeSecurity());

		const serviceSettings = this._initializeSettings();
		if (serviceSettings)
			this._injectService(ClientConstants.InjectorKeys.SERVICE_SETTINGS, serviceSettings);

		const storeService = this._initializeStore();
		if (storeService)
			this._injectService(ClientConstants.InjectorKeys.SERVICE_STORE, storeService);

		const translateService = this._initializeTranslate();
		if (translateService)
			this._injectService(ClientConstants.InjectorKeys.SERVICE_TRANSLATE, translateService);

		this._injectService(ClientConstants.InjectorKeys.SERVICE_UTILITY, this._initializeUtility());
		this._injectService(ClientConstants.InjectorKeys.SERVICE_VERSION, this._initializeVersion());
		
		this._initialize();

		for (const [key, value] of this._services) {
			if (CommonUtility.isDev)
				// eslint-disable-next-line
				console.log(`services.init - ${key}`);
				console.dir(value);
			await value.init(injector);
		}
		if (store)
			store.$logger = logger;

		this._initializeInjector(framework, injector);

		CommonUtility.initDateTime();
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
		return null;
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

	_injectService(key, service) {
		if (CommonUtility.isDev)
			// eslint-disable-next-line
			console.log(`services.inject - ${key}`);
		this._services.set(key, service);
		injector.addSingleton(key, service);
	}
}

export default BaseServices;
