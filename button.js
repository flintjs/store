import { fns, palette } from './prelude'

const { calc, rgb, rgba, translateX, translateY, translateZ } = fns
const { colors, units, effects } = palette()
const { em, unit, percent, seconds } = units

let floatingMiniHeight = unit(4)

let buttonConfig = {
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

const baseButton = {
  position: `relative`,
  display: `inline-block`,
  height: buttonConfig.height,
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
    color .2s ${units.animationCurveDefault}`
}

const getButtonProps = (
  { disabled, href, toggle, children, label, ...props },
  { handleMouseUp, handleMouseLeave }
) => ({
  ref: 'button',
  disabled,
  tagName: href ? 'a' : 'button',
  onMouseUp: handleMouseUp,
  onMouseLeave: handleMouseLeave,
  ...props
})

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
  prop onMouseLeave:? func = Flint.noop
  prop onMouseUp:? func = Flint.noop
  prop primary:? bool = false
  prop raised:? bool = false
  prop toggle:? bool = false
  prop type:? string

  let level, shape, isFloating, isRaised, isFlat

  on.props(() => {
    level = primary ? 'primary' : accent ? 'accent' : 'neutral'
    shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat'
    isFloating = shape === 'floating'
    isRaised = shape === 'raised'
    isFlat = shape === 'flat'
  })

  const handleMouseUp = () => {
    view.refs.button.blur()
    onMouseUp()
  }

  const handleMouseLeave = () => {
    view.refs.button.blur()
    onMouseLeave()
  }

  <button class={{
      button: true,
      disabled,
      [level]: true,
      [shape]: true
    }}
    {...getButtonProps(view.props, { handleMouseUp, handleMouseLeave })}
  >
    <icon if={typeof icon != 'string'}>
      {view.clone(icon, { class: 'svg' })}
    </icon>
    <FontIcon if={typeof icon == 'string'} value={icon} />
    <text>
      {label}
      {children}
    </text>
  </button>

  const square = {
    borderRadius: buttonConfig.borderRadius,
    minWidth: buttonConfig.squaredMinWidth,
    padding: buttonConfig.squaredPadding,
  }

  const floatingBase = {
    borderRadius: '50%',
    fontSize: buttonConfig.floatingFontSize,
    height: buttonConfig.floatingHeight,
    verticalAlign: 'middle',
    width: buttonConfig.floatingHeight,
    boxShadow: `0 1px 1.5px 0 rgba(0, 0, 0, .12),
                0 1px 1px 0 rgba(0, 0, 0, .24)`,
  }

  const floatingMini = {
    fontSize: buttonConfig.floatingMiniFontSize,
    height: buttonConfig.floatingMiniHeight,
    width: buttonConfig.floatingMiniHeight,
  }

  $button = [
    baseButton,
    {
      fontSize: unit(1.4),
      fontWeight: 500,
      lineHeight: unit(1),
      letterSpacing: 0,
      textTransform: `uppercase`
    }
  ]

  $text = {
    display: `inline-block`,
    lineHeight: buttonConfig.height,
    verticalAlign: `middle`
  }

  $svg = {
    fill: 'currentColor',
    fontSize: percent(120),
    height: em(1),
    marginRight: unit(.5),
    verticalAlign: 'middle',
    width: em(1)
  }

  $FontIcon = [
    (isRaised || isFlat) && {
      fontSize: '120%',
      marginRight: buttonConfig.squaredIconMargin,
      verticalAlign: 'middle'
    }
  ]

  $raised = [
    square,
    effects.shadow2dp(),
    disabled && {
      backgroundColor: buttonConfig.disabledBackgroundColor,
      color: buttonConfig.disabledTextColor
    },
    { active: effects.shadow4dp() },
    { focus: effects.focusShadow() },
  ]

  $flat = [
    square,
    disabled && { color: buttonConfig.disabledTextColor },
    { background: 'transparent' }
  ]

  $floating = [
    floatingBase,
    mini && floatingMini,
    effects.shadow2dp(),
    { active: effects.shadow4dp() },
    { focus: effects.focusShadow() }
  ]

  let getButtonColors = (color, background, hover) => [
    (isRaised || isFloating) && { color, background },
    isFlat && {
      color: background,
      hover: { background: hover },
      focus: { background: hover }
    },
  ]

  $primary = getButtonColors(
    buttonConfig.primaryColorContrast,
    buttonConfig.primaryColor,
    buttonConfig.primaryColorHover
  )

  $accent = getButtonColors(
    buttonConfig.accentColorContrast,
    buttonConfig.accentColor,
    buttonConfig.accentColorHover
  )

  $neutral = [
    (isRaised || isFloating) && {
      backgroundColor: buttonConfig.neutralColor,
      color: buttonConfig.neutralColorContrast
    },

    isFlat && {
      color: buttonConfig.neutralColorContrast,
      hover: { background: buttonConfig.neutralColorHover },
      focus: { background: buttonConfig.neutralColorHover }
    },

    inverse && (isRaised || isFloating) && {
      backgroundColor: buttonConfig.neutralColorContrast,
      color: buttonConfig.neutralColor
    },

    inverse && isFlat && {
      color: buttonConfig.neutralColor,
      focus: { background: buttonConfig.neutralColorHover },
      hover: { background: buttonConfig.neutralColorHover }
    },
  ]

  $disabled = {
    color: buttonConfig.disabledTextColor,
    pointerEvents: 'none',
    cursor: 'auto',
  }
}

view IconButton {
  prop accent:? bool = false
  prop children:? node
  prop disabled:? bool
  prop href:? string
  prop icon:? string
  prop inverse:? bool
  prop onMouseLeave:? func
  prop onMouseUp:? func
  prop primary:? bool = false
  prop type:? string

  const handleMouseUp = () => {
    view.refs.button.blur()
    onMouseUp && onMouseUp()
  }

  const handleMouseLeave = () => {
    view.refs.button.blur()
    onMouseLeave && onMouseLeave()
  }

  const level = primary ? 'primary' : accent ? 'accent' : 'neutral'

  const classes = {
    disabled,
    [level]: true,
  }

  <iconbutton class={classes} {...getButtonProps(view.props, { handleMouseUp, handleMouseLeave })}>
    <FontIcon if={icon && typeof icon === 'string'} value={icon} />
    { icon && typeof icon !== 'string' && view.clone(icon, { className: 'svg' }) }
    {children}
  </iconbutton>

  const baseIconButton = {
    background: 'transparent',
    borderRadius: '50%',
    width: buttonConfig.height
  }

  $iconbutton = [ baseButton, baseIconButton ]
  $primary = { color: buttonConfig.primaryColor }
  $accent = { color: buttonConfig.accentColor }

  $FontIcon = {
    fontSize: buttonConfig.toggleFontSize,
    lineHeight: buttonConfig.height,
    verticalAlign: 'middle'
  }

  $svg = {
    fill: `currentColor`,
    fontSize: buttonConfig.toggleFontSize,
    height: em(1),
    lineHeight: buttonConfig.height,
    verticalAlign: 'middle',
    width: em(1)
  }

  $disabled = {
    color: buttonConfig.disabledTextColor,
    pointerEvents: 'none',
    cursor: 'auto',
  }

  $neutral = [
    inverse && !disabled && {
      color: buttonConfig.neutralColor,
      focus: { background: buttonConfig.neutralColorHover },
      hover: { background: buttonConfig.neutralColorHover }
    }
  ]
}
