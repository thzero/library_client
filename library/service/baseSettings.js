import Utility from '../utility'

import Service from './index'

class BaseSettings extends Service {
	clearUser(store, user, func) {
		if (!store)
			return

		const settings = user.settings ? user.settings : this.initializeUser()
		func(settings)
		store.dispatcher.user.setUserSettings(settings)
	}

	initializeUser() {
		return {}
	}

	mergeUser(settings) {
		return Utility.merge2(this.initializeUser(), settings)
	}
}

export default BaseSettings
