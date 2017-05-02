// Import style
import classes from '../styles/footer.css'
// Import template
import _footer from '../templates/footer.eft'

const footer = new _footer({
	$data: {
		class: classes,
		year: (new Date()).getFullYear()
	}
})

export default footer
