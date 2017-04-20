// Import style
import classes from '../styles/mainbody.css'
import shared from '../styles/shared.css'
// Import template
import _mainbody from '../templates/mainbody.eft'
// Import components
import header from './header.js'
import footer from './footer.js'

const mainbody = _mainbody.render({
	$data: {
		class: classes
	},
	header,
	footer
})

mainbody.$data.class = shared

export default mainbody
