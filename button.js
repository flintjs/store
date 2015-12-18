import { rgba, palette } from './prelude'

let colors, units, styles, effects

// Flint.preload(() => {
  // load palette
  ({ colors, units, effects } = palette())
  let { unit } = units

  // set style
  styles = {
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
    floatingMiniHeight: unit(4),
    floatingMiniFontSize: this.floatingMiniHeight / 2.25,
    height: unit(3.6),
    squaredIconMargin: unit(.6),
    squaredMinWidth: unit(9),
    squaredPadding: [0, unit(1.2)],
    toggleFontSize: unit(2),
  }
// })


let buttonProps = ({ disabled, toggle, level, shape, disabled, children, doMouseUp, doMouseLeave }) => ({
  ref: 'button',
  class: {
    button: true,
    disabled,
    toggle,
    [level]: true,
    [shape]: true
  },
  disabled,
  children,
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
  prop primary:? bool = false
  prop type:? string

  let doMouseUp = () => view.refs.button.blur()
  let getProps = () => buttonProps({ disabled, disabled, children, doMouseUp })

  <a if={href} {...getProps()} />
  <button if={!href} {...getProps()} />

  // TODO: Styles
}

view Button {
  prop accent:? bool = false
  prop children:? node
  prop disabled:? bool
  prop flat:? bool = false
  prop floating:? bool = false
  prop href:? string
  prop icon:? string
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

  let level = primary ? 'primary' : accent ? 'accent' : 'neutral'
  let shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat'

  let doMouseUp = () => {
    view.refs.button.blur()
    onMouseUp && onMouseUp()
  }

  let doMouseLeave = () => {
    view.refs.button.blur()
    onMouseLeave && onMouseLeave()
  }

  let getProps = () => buttonProps({ disabled, toggle, level, shape, disabled, children, doMouseUp, doMouseLeave })

  <a if={href} {...getProps()} />
  <button if={!href} {...getProps()} />

  $button = {
    position: 'relative',
    display: 'inline-block',
    height: styles.buttonHeight,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    border: 0,
    outline: 'none',
    transition: `
      box-shadow .2s ${units.animationCurveFastOutLinearIn},
      background-color .2s ${units.animationCurveDefault},
      color .2s ${units.animationCurveDefault}
    `,
  }

  $disabled = {
    color: styles.disabledTextColor,
    pointerEvents: 'none',
    cursor: 'auto',
  }

  const squared$ = {
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

  const solid = {
    // &[disabled] {
    //   @include shadow2dp(),
    //   backgroundColor: styles.disabledBackgroundColor,
    // }
    // &:active {
    //   @include shadow4dp(),
    // }
    // &:focus:not(:active) {
    //   @include focusShadow(),
    // }
  }

  $raised = [
    squared$,
    solid,
    effects.shadow2p()
  ]

  $flat = [
    squared$, {
    background: 'transparent',
  }]

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

  let buttonColors = (color, background, hover) => [
    (raised || floating) && { color, background },
    (flat || toggle) && { color: background, focus: { background: hover } },
    flat && { hover: { background: 'hover' } }
  ]

  $primary = buttonColors(
    styles.primaryContrast,
    styles.primaryColor,
    styles.primaryColorHover
  )

  $accent = buttonColors(
    styles.accentColorContrast,
    styles.accentColor,
    styles.accentColorHover
  )

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
}