import LibraryConstants from '../constants';

import Utility from '../utility';

import injector from '../utility/injector';

import NotImplementedError from '../errors/notImplemented';

import adminNewsService from '../service/admin/news';
import adminUsersService from '../service/admin/users';
import authService from '../auth_firebase/service';
import configService from '../service/config';
import featureService from '../service/features';
import loggerService from '../service/logger';
import markupParserService from '../service/markupParser';
import newsService from '../service/news';
import plansService from '../service/plans';
import restCommunicationService from '../service_rest_axios';
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

		this._inject(LibraryConstants.InjectorKeys.SERVICE_ADMIN_NEWS, this._initializeAdminNews());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_ADMIN_USERS, this._initializeAdminUsers());

		this._inject(LibraryConstants.InjectorKeys.SERVICE_AUTH, this._initializeAuth());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST, this._initializeCommunicationRest());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_CONFIG, this._initializeConfig());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_EVENT, this._initializeEvent());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_FEATURES, this._initializeFeatures());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_LOGGER, logger);
		this._inject(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER, this._initializeMarkupParser());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_NEWS, this._initializeNews());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_PLANS, this._initializePlans());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_ROUTER, this._initializeRouter());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_SECURITY, this._initializeSecurity());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_SETTINGS, this._initializeSettings());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_STORE, this._initializeStore());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_TRANSLATE, this._initializeTranslate());
		this._inject(LibraryConstants.InjectorKeys.SERVICE_USER, this._initializeUser());
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

		this._initializInjector(framework, injector);
	}

	_initialize() {
		throw new NotImplementedError();
	}

	_initializeAdminNews() {
		return new adminNewsService();
	}

	_initializeAdminUsers() {
		return new adminUsersService();
	}

	_initializeAuth() {
		return new authService();
	}

	_initializeCommunicationRest() {
		return new restCommunicationService();
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
		throw new NotImplementedError();
	}

	_initializeStore() {
		throw new NotImplementedError();
	}

	_initializeTranslate() {
		throw new NotImplementedError();
	}

	_initializeUser() {
		throw new NotImplementedError();
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
