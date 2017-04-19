// Import modules
import { goto, changePage } from './router.js'
// Import style
import classes from '../styles/header.css'
import shared from '../styles/shared.css'
// Import template
import _header from '../templates/header.eft'

const header = _header.render({
	$data: {
		class: classes
	},
	$methods: {
		goto({value}) {
			goto(value)
		}
	}
})

header.$data.class = {
	examples: classes.link,
	api: classes.link,
	guide: classes.link,
	home: classes.link
}

header.$data.class = shared

const updateScroll = () => {
	if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) > 60) header.$data.class.logo = `${classes.logo} ${classes.hidden}`
	else header.$data.class.logo = classes.logo
}

window.addEventListener('scroll', updateScroll)

changePage(location.hash || '#!/home')

export default header
