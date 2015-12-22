import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { ms, unit, percent, seconds } = units

let size = unit(1.8)

const styles = {
  color: colors.primary,
  disabledColor: rgba(colors.black, 0.26),
  fieldMarginBottom: unit(1.5),
  focusCheckedColor: rgba(colors.primary, 0.26),
  rippleDuration: ms(650),
  size,
  focusColor: rgba(colors.black, 0.1),
  focusSize: size * 2.3,
  textColor: colors.black,
  textFontSize: units.fontSizeSmall,
  totalHeight: unit(1.8),
  transitionDuration: seconds(.2),
}

view Checkbox {
  prop checked:? bool = false
  prop disabled:? bool = false
  prop label:? any
  prop name:? string
  prop onBlur:? func
  prop onChange:? func
  prop onFocus: func

  let handleToggle = (event) => {
    if (event.pageX !== 0 && event.pageY !== 0) blur()
    !disabled && onChange(!checked, event)
  }

  let blur = () => view.refs.input.blur()
  let focus = () => view.refs.input.focus()

  <label class={{ disabled }}>
    <input
      {...view.props} // remove disabled
      onClick={handleToggle}
      readOnly
      ref='input'
      type='checkbox'
    />
    <Check checked={checked} disabled={disabled}/>
    <text if={label} data-role='label'>{label}</text>
  </label>

  $field = {
    position: `relative`,
    display: `block`,
    height: styles.size,
    marginBottom: styles.fieldMarginBottom,
    whiteSpace: `nowrap`,
    verticalAlign: middle,
  }

  $text = {
    display: `inline-block`,
    paddingLeft: $unit,
    fontSize: styles.textFontSize,
    lineHeight: styles.size,
    color: styles.textColor,
    whiteSpace: `nowrap`,
    verticalAlign: `top`,
  }

  $input = {
    width: 0,
    height: 0,
    overflow: `hidden`,
    opacity: 0,
  }

  // $disabled = {
  //   > .text {
  //     color: styles.disabledColor,
  //   }
  //   > .check {
  //     cursor: `auto`,
  //     borderColor: styles.disabledColor,
  //     &.checked {
  //       cursor: `auto`,
  //       backgroundColor: styles.disabledColor,
  //       borderColor: `transparent`,
  //     }
  //   }
  // }

  // &:focus ~ .check {
  //   &:before {
  //     position: `absolute`,
  //     top: percent(50),
  //     left: percent(50),
  //     width: styles.focusSize,
  //     height: styles.focusSize,
  //     marginTop: - styles.focusSize / 2,
  //     marginLeft: - styles.focusSize / 2,
  //     pointerEvents: `none`,
  //     content: "",
  //     backgroundColor: styles.focusColor,
  //     borderRadius: percent(50),
  //   }
  //   &.checked:before {
  //     backgroundColor: styles.focusCheckedColor,
  //   }
  // }
}

view Check {
  prop checked:? bool = false
  prop children:? any
  prop onMouseDown:? func = Flint.noop

  <check
    class={{ checked }}
    data-role='checkbox'
    onMouseDown={onMouseDown}>
    {children}
  </check>

  // className: style.ripple,
  // spread: 2.6,
  // centered: true

  $check = {
    position: `relative`,
    display: `inline-block`,
    width: styles.size,
    height: styles.size,
    verticalAlign: `top`,
    cursor: `pointer`,
    borderColor: styles.textColor,
    borderStyle: `solid`,
    borderWidth: 2,
    borderRadius: 2,
    transitionTimingFunction: animationCurveDefault,
    transitionDuration: styles.transitionDuration,
    transitionProperty: backgroundColor,
  }

  $checked = {
    backgroundColor: styles.color,
    borderColor: styles.color,

    after: {
      position: `absolute`,
      top: unit(-.1),
      left: unit(.4),
      width: unit(.7),
      height: unit(1.2),
      content: "",
      borderColor: colors.background,
      borderStyle: `solid`,
      borderTop: 0,
      borderRightwidth: 2,
      borderBottomwidth: 2,
      borderLeft: 0,
      transform: rotate(degrees(45)),
      animation: `checkmark-expand ${ms(140)} ease-out forwards`,
    }
  }

  $ripple = {
    backgroundColor: styles.color,
    opacity: .3,
    transitionDuration: styles.rippleDuration,
  }

//   @keyframes checkmark-expand {
//     percent(0) {
//       top: unit(.9),
//       left: unit(.6),
//       width: 0,
//       height: 0,
//     }
//
//     percent(100) {
//       top: unit(-.1),
//       left: unit(.4),
//       width: unit(.7),
//       height: unit(1.2),
//     }
//   }
}