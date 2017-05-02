// Import utils
import genBg from './utils/bg-gen.js'
// Import style
import classes from '../styles/mainbody.css'
import shared from '../styles/shared.css'
// Import template
import _mainbody from '../templates/mainbody.eft'
// Import components
import header from './header.js'
import footer from './footer.js'

const mainbody = new _mainbody({
	$data: {
		class: classes
	},
	header,
	footer
})

mainbody.$data.class = shared

const updateBg = (url) => {
	mainbody.$data.style = `background-image: url(${url})`
}
const getBg = () => genBg(updateBg)

getBg()

export { mainbody, getBg }
