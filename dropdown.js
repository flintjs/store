import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { vh, unit, percent, seconds } = units

const inputTextBorderBottomColor = rgba(colors.black, 0.12)

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
  let selected = {}

  on.render(() => {
    selected = getSelectedItem()
  })

  let handleMouseDown = (event) => {
    const client = event.target.getBoundingClientRect()
    const screen_height = window.innerHeight || document.documentElement.offsetHeight
    up = auto ? client.top > ((screen_height / 2) + client.height) : false
    active = true
    onFocus()
  }

  let handleSelect = (item, event) => {
    onBlur()
    if (disabled) return
    onChange(item, event)
    active = false
  }

  let getSelectedItem = () => {
    if (value) {
      for (const item of source) {
        if (item.value === value)
          return item
      }
    }
    else {
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
    <template if={template} class={{ errored: error, disabled }} onMouseDown={handleMouseDown}>
      <value className="templateValue">
        {template(selected)}
      </value>
      <label if={label}>{label}</label>
      <error if={error}>{error}</error>
    </template>
    <ul class="values" ref='values'>
      <li repeat={source} class={_.value === value ? 'selected' : null} onMouseDown={handleSelect.bind(_.value)}>
        {template ? template(_) : _.label}
      </li>
    </ul>
  </dropdown>

  $ = {
    position: `relative`,
    width: `inherit`,
    marginBottom: styles.offset,
    color: colors.text,
    cursor: `pointer`,
    borderBottom: [1, `solid`, inputTextBorderBottomColor],
  }

  $disabled = {
    color: colors.textSecondary,
    pointerEvents: `none`,
    cursor: `normal`,
    borderBottomStyle: `dotted`,
  }

  $values = [
    {
      position: `absolute`,
      padding: 0,
      zIndex: 2,
      width: percent(100),
      overflowX: `hidden`,
      overflowY: `auto`,
      listStyle: `none`,
      backgroundColor: styles.colorWhite,
      borderRadius: styles.valueBorderRadius,
      transitionTimingFunction: units.animationCurveDefault,
      transitionDuration: `animationDuration`,
      transitionProperty: `maxHeight, boxShadow`,
    },

    active && {
      maxHeight: styles.overflowMaxHeight,
      visibility: `visible`,
      boxShadow: units.zdepthShadow1,
    },

    !active && {
      maxHeight: 0,
      visibility: `hidden`,
    },

    !up && {
      top: 0,
      bottom: `auto`,
    },

    up && {
      top: `auto`,
      bottom: 0,
    },

    //   > * {
    //     position: `relative`,
    //     padding: $unit,
    //     overflow: `hidden`,
    //     cursor: `pointer`,
    //     &:hover {
    //       backgroundColor: styles.valueHoverBackground,
    //     }
    //     &.selected {
    //       color: styles.colorPrimary,
    //     }
    //   }
  ]

  const inputFieldHeight = 20
  const valSize = (inputFieldHeight / 7)
  const border = [valSize, `solid`, `transparent`]

  $value = [
    {
      display: `block`,

      after: {
        position: `absolute`,
        right: (styles.offset / 2),
        bottom: styles.offset,
        width: 0,
        height: 0,
        content: "",
        borderTop: [valSize, `solid`, inputTextBorderBottomColor],
        borderRight: border,
        borderLeft: border,
        transition: `transform animationDuration animationCurveDefault`,
      }
    },

    active && {
      opacity: .5
    },

    disabled && {
      after: {
        transform: scale(0),
      }
    }

    // > span {
    //   display: `inline-block`,
    //   height: inputFieldHeight,
    //   fontSize: inputFieldFontSize,
    //   lineHeight: inputFieldHeight,
    // }
    //
    // > :not(span) {
    //   margin: (styles.offset / 2) 0,
    // }
  ]

  $li = {
    position: `relative`,
    padding: unit(1),
    overflow: `hidden`,
    cursor: `pointer`,

    hover: {
      backgroundColor: styles.valueHoverBackground
    }
  }

  $label = {
    fontSize: units.fontSizeTiny,
    color: colors.textSecondary,
  }

  // root > :last-child = {
  //   marginBottom: 0,
  // }
}

