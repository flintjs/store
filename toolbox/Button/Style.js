import theme from '../styles/theme'
import Shadows from '../styles/shadows'
import Typography from '../styles/typography'

const { shadow2dp } = Shadows()
const { typoButton } = Typography()

const { Button: { height } } = theme
const { animations: { curveFastOutLinearIn, curveDefault } } = theme
const { unit } = theme

function button({ squared = false }) {
  return {
    alignContent: `center`,
    alignItems: `center`,
    border: 0,
    cursor: `pointer`,
    display: `inline-block`,
    flexDirection: `row`,
    height: height,
    justifyContent: `center`,
    outline: `none`,
    position: `relative`,
    textAlign: `center`,
    textDecoration: `none`,
    transition: `
      box-shadow .2 ${curveFastOutLinearIn},
      background-color .2 ${curveDefault},
      color .2 ${curveDefault}
    `,
    whiteSpace: `nowrap`,
    ...typoButton(),
    ...(squared ? squaredStyle() : {})
  }
}

function text() {
  return {
    display: 'inline-block',
    lineHeight: height,
    verticalAlign: 'middle'
  }
}

function squaredStyle() {
  return {
    borderRadius: unit(0.2),
    minWidth: unit(9),
    padding: [0, unit(1.2)]
  }
}

export default { button, text }
