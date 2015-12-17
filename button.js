import { rgba, palette } from './prelude'

let colors, units, styles, effects

// Flint.preload(() => {
  // load palette
  ({ colors, units, effects } = palette())

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
    borderRadius: 0.2 * units.unit,
    floatingFontSize: units.unit * 2.4,
    floatingHeight: units.unit * 5.6,
    floatingMiniHeight: units.unit * 4,
    floatingMiniFontSize: this.floatingMiniHeight / 2.25,
    height: units.unit * 3.6,
    squaredIconMargin: units.unit * .6,
    squaredMinWidth: 9 * units.unit,
    squaredPadding: [0, units.unit * 1.2],
    toggleFontSize: units.unit * 2,
  }
// })

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
  prop type:? string

  const level = primary ? 'primary' : accent ? 'accent' : 'neutral'
  const shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat'

  let handleMouseUp = () => {
    view.refs.button.blur()
    onMouseUp && onMouseUp()
  }

  let handleMouseLeave = () => {
    view.refs.button.blur()
    onMouseLeave && onMouseLeave()
  }

  let getProps = () => ({
    ref: 'button',
    class: {
      button: true,
      squared, disabled, raised
    },
    disabled,
    children,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave
  })

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
      box-shadow .2s $animation-curve-fast-out-linear-in,
      background-color .2s $animation-curve-default,
      color .2s $animation-curve-default
    `,
  }

  $disabled = {
    color: styles.disabledTextColor,
    pointerEvents: none,
    cursor: auto,
  }

  $squared = {
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

  $solid = {
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

  $raised = [effects.shadow2p()]

  $flat = {
    background: 'transparent',
  }

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
  //
  // .neutral:not([disabled]) {
  //   &.raised, &.floating {
  //     color: styles.neutralColorContrast,
  //     backgroundColor: styles.neutralColor,
  //   }
  //   &.flat, &.toggle {
  //     color: styles.neutralColorContrast,
  //     &:focus:not(:active) {
  //       background: styles.neutralColorHover,
  //     }
  //   }
  //   &.flat:hover {
  //     background: styles.neutralColorHover,
  //   }
  //
  //   &.inverse {
  //     &.raised, &.floating {
  //       color: styles.neutralColor,
  //       backgroundColor: styles.neutralColorContrast,
  //     }
  //     &.flat, &.toggle {
  //       color: styles.neutralColor,
  //       &:focus:not(:active) {
  //         background: styles.neutralColorHover,
  //       }
  //     }
  //     &.flat:hover {
  //       background: styles.neutralColorHover,
  //     }
  //   }
  // }
}