import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryCommonUtility from '@thzero/library_common/utility';

import injector from '@thzero/library_common/utility/injector';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import configService from '@thzero/library_client/service/config';
import cryptoService from '@thzero/library_client/service/crypto';
import featuresService from '@thzero/library_client/service/features';
import loggerService from '@thzero/library_client/service/logger';
import markupParserService from '@thzero/library_client/service/markupParser';
import newsService from '@thzero/library_client/service/news';
import plansService from '@thzero/library_client/service/plans';
import securityService from '@thzero/library_client/service/security';
import utilityService from '@thzero/library_client/service/utility';

import ServicesBaseBoot from '@thzero/library_client/boot/baseServices';

class RootServicesBaseBoot extends ServicesBaseBoot {
	constructor() {
		super();

		this._services = new Map();
	}

	async execute(framework) {
		const logger = this._initializeLogger();
		if (!logger)
			throw Error('No logger defined after initialization of services.');

		const serviceAuth = this._initializeAuth();
		if (serviceAuth) {
			const serviceUser = this._initializeUser();
			if (!serviceUser)
				throw new NotImplementedError();
			this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_AUTH, serviceAuth);
			this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_USER, serviceUser);
		}

		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_CRYPTO, this._initServiceCrypto());

		const serviceCommunicationRest = this._initializeCommunicationRest();
		if (serviceCommunicationRest)
			this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_COMMUNICATION_REST, serviceCommunicationRest);

		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG, this._initializeConfig());
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_EVENT, this._initializeEvent());

		const serviceFeatures = this._initializeFeatures();
		if (serviceFeatures)
			this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_FEATURES, serviceFeatures);

		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_LOGGER, logger);
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER, this._initializeMarkupParser());
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_NEWS, this._initializeNews());
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_PLANS, this._initializePlans());
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_ROUTER, this._initializeRouter());
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_SECURITY, this._initializeSecurity());

		const serviceSettings = this._initializeSettings();
		if (serviceSettings)
			this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_SETTINGS, serviceSettings);

		const storeService = this._initializeStore();
		if (storeService)
			this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_STORE, storeService);

		const translateService = this._initializeTranslate();
		if (translateService)
			this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_TRANSLATE, translateService);

		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_UTILITY, this._initializeUtility());
		this._injectService(LibraryClientConstants.InjectorKeys.SERVICE_VERSION, this._initializeVersion());

		await this._initialize();

		for (const [key, value] of this._services) {
			if (LibraryCommonUtility.isDev)
				// eslint-disable-next-line
				console.log(`services.init - ${key}`);
				console.dir(value);
			await value.init(injector);
		}

		this._initializeInjector(framework, injector);

		LibraryCommonUtility.initDateTime();
	}

	async _initialize() {
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
		return new featuresService();
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
}

export default RootServicesBaseBoot;
