import SharedConstants from '@/common/constants'

import ResponseParam from './responseParam'

class Response {
	constructor() {
		this.success = true
		this.code = null
		this.err = null
		this.message = null
		this.errors = null
		this.params = null
	}

	add(message, code, field, type, params, prefix, suffix) {
		this.success = false

		if (!this.errors)
			this.errors = []

		const error = {
			code: code,
			field: field,
			message: message,
			type: type,
			params: params,
			prefix: prefix,
			suffix: suffix
		}

		this.errors.push(error)
		return this
	}

	addGeneric(message, code, params, prefix, suffix) {
		return this.add(message, code, SharedConstants.ErrorFields.Generic, null, params, prefix, suffix)
	}

	param(value) {
		return new ResponseParam(value, false, null)
	}

	paramIl8n(value, suffix) {
		return new ResponseParam(value, true, suffix)
	}

	static error(message, err, code, errors) {
		let response = new Response()
		response.success = false
		response.err = err
		response.errors = errors
		if (message || code)
			response.addGeneric(message, code)
		return response
	}

	static success() {
		return new Response()
	}
}

export default Response
