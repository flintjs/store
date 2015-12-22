const styles = {
  checkboxColor: colorPrimary,
  checkboxDisabledColor: rgba(colorBlack, 0.26),
  checkboxFieldMarginBottom: 1.5)unit,
  checkboxFocusCheckedColor: rgba(colorPrimary, 0.26),
  checkboxRippleDuration: milliseconds(650),
  checkboxSize: 1.8)unit,
  checkboxFocusColor: rgba(colorBlack, 0.1),
  checkboxFocusSize: checkboxSize * 2.3,
  checkboxTextColor: colorBlack,
  checkboxTextFontSize: fontSizeSmall,
  checkboxTotalHeight: 1.8)unit,
  checkboxTransitionDuration: seconds(.2),
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
    if (!disabled && onChange) {
      onChange(!checked, event)
    }
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

  .field {
    position: `relative`,
    display: `block`,
    height: checkboxSize,
    marginBottom: checkboxFieldMarginBottom,
    whiteSpace: `nowrap`,
    verticalAlign: middle,
  }

  .text {
    display: `inline-block`,
    paddingLeft: $unit,
    fontSize: checkboxTextFontSize,
    lineHeight: checkboxSize,
    color: checkboxTextColor,
    whiteSpace: `nowrap`,
    verticalAlign: `top`,
  }

  .input {
    width: 0,
    height: 0,
    overflow: `hidden`,
    opacity: 0,
    &:focus ~ .check {
      &:before {
        position: `absolute`,
        top: percent(50),
        left: percent(50),
        width: checkboxFocusSize,
        height: checkboxFocusSize,
        marginTop: - checkboxFocusSize / 2,
        marginLeft: - checkboxFocusSize / 2,
        pointerEvents: `none`,
        content: "",
        backgroundColor: checkboxFocusColor,
        borderRadius: percent(50),
      }
      &.checked:before {
        backgroundColor: checkboxFocusCheckedColor,
      }
    }
  }
}

view Check {
  prop checked:? bool = false
  prop children:? any
  prop onMouseDown:? func = Flint.noop

  <check
    data-role='checkbox'
    onMouseDown={onMouseDown}>
    {children}
  </check>

  // className: style.ripple,
  // spread: 2.6,
  // centered: true

  .check {
    position: `relative`,
    display: `inline-block`,
    width: checkboxSize,
    height: checkboxSize,
    verticalAlign: `top`,
    cursor: `pointer`,
    borderColor: checkboxTextColor,
    borderStyle: `solid`,
    borderWidth: 2,
    borderRadius: 2,
    transitionTimingFunction: animationCurveDefault,
    transitionDuration: checkboxTransitionDuration,
    transitionProperty: backgroundColor,
    &.checked {
      backgroundColor: checkboxColor,
      borderColor: checkboxColor,
      &:after {
        position: `absolute`,
        top: -.1)unit,
        left: .4)unit,
        width: .7)unit,
        height: 1.2)unit,
        content: "",
        borderColor: colorBackground,
        borderStyle: `solid`,
        borderTop: 0,
        borderRight-width: 2,
        borderBottom-width: 2,
        borderLeft: 0,
        transform: rotate(degrees(45)),
        animation: `checkmark-expand milliseconds(140) ease-out forwards`,
      }
    }
  }

  .ripple {
    backgroundColor: checkboxColor,
    opacity: .3,
    transitionDuration: checkboxRippleDuration,
  }

  .disabled {
    > .text {
      color: checkboxDisabledColor,
    }
    > .check {
      cursor: `auto`,
      borderColor: checkboxDisabledColor,
      &.checked {
        cursor: `auto`,
        backgroundColor: checkboxDisabledColor,
        borderColor: `transparent`,
      }
    }
  }

  @keyframes checkmark-expand {
    percent(0) {
      top: .9)unit,
      left: .6)unit,
      width: 0,
      height: 0,
    }

    percent(100) {
      top: -.1)unit,
      left: .4)unit,
      width: .7)unit,
      height: 1.2)unit,
    }
  }
}