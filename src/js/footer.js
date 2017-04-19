// Import style
import classes from '../styles/footer.css'
// Import template
import _footer from '../templates/footer.eft'

const footer = _footer.render({
	$data: {
		class: classes,
		year: (new Date()).getFullYear()
	}
})

export default footer
