const LibraryClientConstants = {
	InjectorKeys: {
		CONFIG: 'config',
		SERVICE_ADMIN_NEWS: 'serviceAdminNews',
		SERVICE_ADMIN_USERS: 'serviceAdminUsers',
		SERVICE_AUTH: 'serviceAuth',
		SERVICE_COMMUNICATION_REST: 'serviceCommunicationRest',
		SERVICE_CONFIG: 'serviceConfig',
		SERVICE_CRYPTO: 'serviceCrypto',
		SERVICE_EVENT: 'serviceEvent',
		SERVICE_FEATURES: 'serviceFeatures',
		SERVICE_LOGGER: 'serviceLogger',
		SERVICE_MARKUP_PARSER: 'serviceMarkupParser',
		SERVICE_NEWS: 'serviceNews',
		SERVICE_PLANS: 'servicePlans',
		SERVICE_ROUTER: 'serviceRouter',
		SERVICE_SECURITY: 'serviceSecurity',
		SERVICE_SETTINGS: 'serviceSettings',
		SERVICE_STORE: 'serviceStore',
		SERVICE_TRANSLATE: 'serviceTranslate',
		SERVICE_USER: 'serviceUser',
		SERVICE_USAGE_METRICS: 'serviceUsageMetrics',
		SERVICE_UTILITY: 'serviceUtility',
		SERVICE_VERSION: 'serviceVersion'
	},
	ExternalKeys: {
		BACKEND: 'backend'
	},
	Headers: {
		AuthKeys: {
			API: 'x-api-key',
			AUTH: 'authorization',
			AUTH_BEARER: 'bearer'
		},
		CorrelationId: 'correlation-id'
	},
	EventKeys: {
		Auth: {
			Refresh: 'auth-refresh',
			TokenRefresh: 'auth-token-refresh'
		}
	}
};

export default LibraryClientConstants;
