const styles = {
  offset: unit(1.6),
  colorWhite: colors.white,
  colorPrimary: colors.primary,
  colorPrimaryContrast: colors.primaryContrast,
  valueHoverBackground: colors.grey200,
  overflowMaxHeight: vh(45),
  valueBorderRadius: unit(.2),
}

view Dropdown {
  prop source: array

  prop auto:? bool = true
  prop className:? string
  prop disabled:? bool = false
  prop error:? string
  prop label:? string
  prop onBlur:? func = Flint.noop
  prop onChange:? func = Flint.noop
  prop onFocus:? func = Flint.noop
  prop template:? func = Flint.noop
  prop value: string

  let active = false
  let up = false
  let selected = null

  on.render(() => {
    selected = getSelectedItem()
  })

  let handleMouseDown = (event) => {
    events.pauseEvent(event)
    const client = event.target.getBoundingClientRect()
    const screen_height = window.innerHeight || document.documentElement.offsetHeight
    up = auto ? client.top > ((screen_height / 2) + client.height) : false
    active = true
    onFocus()
  }

  let handleSelect = (item, event) => {
    if (onBlur) onBlur()
    if (!disabled) {
      onChange(item, event)
      let active = false
    }
  }

  let getSelectedItem = () => {
    if (value) {
      for (const item of source) {
        if (item.value === value) return item
      }
    } else {
      return source[0]
    }
  }

  <dropdown class={{ up, active, disabled }}>
    <Input
      {...view.props} // view.props - template , source
      class="value"
      onMouseDown={handleMouseDown}
      readOnly
      type={template ? 'hidden' : null}
      value={selected.label}
    />
    <div if={template} class={{ errored: error, disabled }} onMouseDown={handleMouseDown}>
      <div className={`${style.templateValue} ${style.value}`}>
        {template(selected)}
      </div>
      <label if={label}>{label}</label>
      <error if={error}>{error}</error>
    </div>
    <ul class="values" ref='values'>
      <li repeat={source} key={idx} class={item.value === value ? style.selected : null} onMouseDown={handleSelect.bind(_.value)}>
        {template ? template(_) : _.label}
      </li>
    </ul>
  </dropdown>

  // $ = {
  //   position: `relative`,
  //   width: inherit,
  //   marginBottom: dropdownOffset,
  //   color: colorText,
  //   cursor: `pointer`,
  //   borderBottom: [1, `solid`, inputText-bottom-borderColor,
  //   &:not(.active) {
  //     > .values {
  //       maxHeight: 0,
  //       visibility: `hidden`,
  //     }
  //   }
  //   &.active {
  //     > .label, > .value {
  //       opacity: .5,
  //     }
  //     > .values {
  //       maxHeight: dropdownOverflowMaxHeight,
  //       visibility: `visible`,
  //       boxShadow: zdepthShadow-1,
  //     }
  //   }
  //   &.disabled {
  //     color: colorTextSecondary,
  //     pointerEvents: `none`,
  //     cursor: normal,
  //     borderBottom-style: dotted,
  //     > .value:after {
  //       transform: scale(0),
  //     }
  //   }
  //   &:not(.up) > .values {
  //     top: 0,
  //     bottom: `auto`,
  //   }
  //   &.up > .values {
  //     top: `auto`,
  //     bottom: 0,
  //   }
  // }
  //
  // .label {
  //   fontSize: fontSizeTiny,
  //   color: colorTextSecondary,
  // }
  //
  // .values {
  //   @include no-webkit-scrollbar,
  //   position: `absolute`,
  //   zIndex: 2,
  //   width: percent(100),
  //   overflowX: `hidden`,
  //   overflowY: `auto`,
  //   list-style: `none`,
  //   backgroundColor: dropdownColorWhite,
  //   borderRadius: dropdownValueBorderRadius,
  //   transitionTimingFunction: animationCurveDefault,
  //   transitionDuration: animationDuration,
  //   transitionProperty: maxHeight, boxShadow,
  //   > * {
  //     position: `relative`,
  //     padding: $unit,
  //     overflow: `hidden`,
  //     cursor: `pointer`,
  //     &:hover {
  //       backgroundColor: dropdownValueHoverBackground,
  //     }
  //     &.selected {
  //       color: dropdownColorPrimary,
  //     }
  //   }
  // }
  //
  // .value {
  //   display: `block`,
  //   > span {
  //     display: `inline-block`,
  //     height: inputFieldHeight,
  //     fontSize: inputFieldFontSize,
  //     lineHeight: inputFieldHeight,
  //   }
  //   > :not(span) {
  //     margin: (dropdownOffset / 2) 0,
  //   }
  //   &:after {
  //     $size: (inputFieldHeight / 7),
  //     $border: $size solid `transparent`,
  //     position: `absolute`,
  //     right: (dropdownOffset / 2),
  //     bottom: dropdownOffset,
  //     width: 0,
  //     height: 0,
  //     content: "",
  //     borderTop: $size solid inputText-bottom-borderColor,
  //     borderRight: $border,
  //     borderLeft: $border,
  //     transition: transform animationDuration animationCurveDefault,
  //   }
  // }
  // root > :last-child = {
  //   marginBottom: 0,
  // }
}

