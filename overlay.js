import { palette } from './prelude'
let { units, units: { unit, vw, vh }, colors, effects } = palette()

const styles = {
  color: colors.black,
  opacity: 0.6,
}

view Overlay {
  prop active:? bool
  prop children:? node
  prop className:? string
  prop invisible:? bool = false
  prop onClick:? func

  let app, node

  view.renderToRoot()

  <overlay>
    <background onClick={onClick} />
    {children}
  </overlay>

  $overlay = {
    position: `fixed`,
    top: 0,
    left: 0,
    zIndex: units.zIndexHighest,
    display: `flex`,
    width: vw(100),
    height: vh(100),
    flexDirection: `column`,
    alignContent: `center`,
    alignItems: `center`,
    justifyContent: `center`,
    pointerEvents: (active || invisible) ? `all` : `none`,
  }

  $background = {
    position: `absolute`,
    top: 0,
    left: 0,
    width: `100%`,
    height: `100%`,
    backgroundColor: styles.color,
    opacity: active ? 1 : 0,
    transitionTimingFunction: units.animationCurveDefault,
    transitionDuration: units.animationDuration,
    transitionProperty: styles.opacity,
  }
}