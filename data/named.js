import Data from '../data/index';

class NamedData extends Data {
	constructor() {
		super();

		this.name = '';
	}

	map(requested) {
		super.map(requested);

		if (!requested)
			return;

		this.name = requested.name;
	}
}

export default NamedData;
