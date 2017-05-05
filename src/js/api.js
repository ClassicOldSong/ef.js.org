// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/api.css'
// Import template
import _api from '../templates/api.eft'

const getApi = () => {
	const api = new _api({
		$data: {
			class: sharedClasses
		}
	})

	api.$data.class = classes

	return api
}

export default getApi
