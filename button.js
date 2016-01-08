import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { em, unit, percent, seconds } = units

let floatingMiniHeight = unit(4)
let styles = {
  neutralColor: colors.white,
  neutralColorContrast: colors.grey900,
  neutralColorHover: rgba(colors.grey900, 0.20),
  primaryColorContrast: colors.primaryContrast,
  primaryColorHover: rgba(colors.primary, 0.20),
  primaryColor: colors.primary,
  accentColorContrast: colors.primaryContrast,
  accentColorHover: rgba(colors.accent, 0.20),
  accentColor: colors.accent,
  disabledTextColor: rgba(colors.black, 0.26),
  disabledBackgroundColor: rgba(colors.black, 0.12),
  borderRadius: unit(0.2),
  floatingFontSize: unit(2.4),
  floatingHeight: unit(5.6),
  floatingMiniHeight,
  floatingMiniFontSize: floatingMiniHeight / 2.25,
  height: unit(3.6),
  squaredIconMargin: unit(.6),
  squaredMinWidth: unit(9),
  squaredPadding: [0, unit(1.2)],
  toggleFontSize: unit(2),
}

let buttonStyles = () => ({
  fontSize: unit(1.2),
  fontWeight: 500,
  lineHeight: unit(1),
  letterSpacing: 0,
  textTransform: `uppercase`
})

let buttonProps = ({ disabled, toggle, children, label, ...props }, { level, shape, doMouseUp, doMouseLeave }) => ({
  ref: 'button',
  ...props,
  children: [label, children],
  disabled,
  class: {
    button: true,
    disabled,
    toggle,
    [level]: true,
    [shape]: true
  },
  onMouseUp: doMouseUp,
  onMouseLeave: doMouseLeave
})

view IconButton {
  prop accent:? bool = false
  prop children:? node
  prop disabled:? bool
  prop href:? string
  prop icon:? string
  prop inverse:? bool
  prop label:? string
  prop primary:? bool = false
  prop type:? string

  let level, tagName

  on.props(() => {
    level = primary ? 'primary' : accent ? 'accent' : 'neutral'
    tagName = href ? 'a' : 'button'
  })

  let doMouseUp = () => view.refs.button.blur()

  <iconbutton tagName={tagName} {...buttonProps(view.props, { level, doMouseUp })}>
    <FontIcon if={icon} value={icon} />
    {label}
    {children}
  </iconbutton>

  // TODO: Styles
}

view Button {
  prop accent:? bool = false
  prop children:? node
  prop disabled:? bool
  prop flat:? bool = false
  prop floating:? bool = false
  prop href:? string
  prop icon:? string | element
  prop inverse:? bool
  prop label:? string
  prop mini:? bool = false
  prop onMouseLeave:? func
  prop onMouseUp:? func
  prop primary:? bool = false
  prop raised:? bool = false
  prop squared:? bool
  prop toggle:? bool = false
  prop type:? string

  let level, shape, tagName

  on.props(() => {
    level = primary ? 'primary' : accent ? 'accent' : 'neutral'
    shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat'
    tagName = href ? 'a' : 'button'
  })

  let doMouseUp = () => {
    view.refs.button.blur()
    onMouseUp && onMouseUp()
  }

  let doMouseLeave = () => {
    view.refs.button.blur()
    onMouseLeave && onMouseLeave()
  }

  <button tagName={tagName} {...buttonProps(view.props, { level, shape, doMouseUp, doMouseLeave })}>
    <FontIcon if={typeof icon == 'string'} value={icon} />
    <icon if={typeof icon != 'string'}>{icon}</icon>
    <text>
      {label}
      {children}
    </text>
  </button>

  $button = [
    buttonStyles(),

    {
      display: `flex`,
      position: `relative`,
      minHeight: styles.height,
      flexDirection: `row`,
      alignContent: `center`,
      alignItems: `center`,
      justifyContent: `center`,
      textAlign: `center`,
      textDecoration: `none`,
      whiteSpace: `nowrap`,
      cursor: `pointer`,
      border: 0,
      outline: `none`,
      transition: `
        box-shadow .2s ${units.animationCurveFastOutLinearIn},
        background-color .2s ${units.animationCurveDefault},
        color .2s ${units.animationCurveDefault}
      `,
    }
  ]

  $icon = {
    width: em(1),
    height: em(1),
    fontSize: percent(120),
    verticalAlign: `middle`,
    fill: `currentColor`,
    marginRight: unit(.5)
  }

  $text = {
  }

  $disabled = {
    color: styles.disabledTextColor,
    pointerEvents: 'none',
    cursor: 'auto',
  }

  const square = {
    minWidth: styles.squaredMinWidth,
    padding: styles.squaredPadding,
    borderRadius: styles.borderRadius,
    // .icon {
    //   marginRight: styles.squaredIconMargin,
    //   fontSize: 120%,
    //   verticalAlign: middle,
    // }
    // > svg {
    //   marginRight: .5 * $unit,
    // }
  }

  $raised = [
    square,
    effects.shadow2dp(),
    { active: effects.shadow4dp() },
    disabled && { backgroundColor: styles.disabledBackgroundColor },
    focus && effects.focusShadow
  ]

  $flat = [
    square,
    { background: 'transparent' }
  ]

  $floating = {
    width: styles.floatingHeight,
    height: styles.floatingHeight,
    fontSize: styles.floatingFontSize,
    borderRadius: '50%',
    boxShadow: `0 1px 1.5px 0 rgba(0, 0, 0, .12),
                0 1px 1px 0 rgba(0, 0, 0, .24)`,
    // .icon {
    //   lineHeight: styles.floatingHeight,
    // }
    // [dataReactToolbox="ripple"] {
    //   borderRadius: 50%,
    // }
    // &.mini {
    //   width: styles.floatingMiniHeight,
    //   height: styles.floatingMiniHeight,
    //   fontSize: styles.floatingMiniFontSize,
    //   .icon {
    //     lineHeight: styles.floatingMiniHeight,
    //   }
    // }
  }

  $toggle = {
    width: styles.height,
    background: 'transparent',
    borderRadius: '50%',
    // > .icon, svg {
    //   fontSize: styles.toggleFontSize,
    //   lineHeight: styles.height
    //   verticalAlign: middle,
    // }
    // [dataReactToolbox="ripple"] {
    //   borderRadius: 50%,
    // }
  }

  $neutral = [
    (raised || floating) && {
      color: styles.neutralColorContrast,
      backgroundColor: styles.neutralColor,
    },

    (flat || toggle) && {
      color: styles.neutralColorContrast,
      focus: { background: styles.neutralColorHover }
    },

    flat && {
      hover: { background: styles.neutralColorHover }
    },

    inverse && (raised || floating) && {
      color: styles.neutralColor,
      backgroundColor: styles.neutralColorContrast,
    },

    inverse && (flat || toggle) && {
      color: styles.neutralColor,
      focus: { background: styles.neutralColorHover }
    },

    inverse && flat && {
      hover: { background: styles.neutralColorHover }
    }
  ]

  let buttonColors = (color, background, hover) => [
    (raised || floating) && { color, background },
    (flat || toggle) && { color: background, focus: { background: hover } },
    flat && { hover: { background: 'hover' } }
  ]

  $accent = buttonColors(
    styles.accentColorContrast,
    styles.accentColor,
    styles.accentColorHover
  )

  $primary = buttonColors(
    styles.primaryColorContrast,
    styles.primaryColor,
    styles.primaryColorHover
  )
}