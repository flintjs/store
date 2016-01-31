import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { unit, percent, seconds } = units

const fieldPadding = unit(0.8)
const fieldFontSize = unit(1.6)

let textBottomBorderColor = rgba(colors.black, 0.12)
let textLabelColor = rgba(colors.black, 0.26)
let iconFontSize = unit(2.4)

const styles = {
  fieldPadding,
  fieldFontSize,
  padding:  unit(2),
  fieldHeight: fieldPadding * 2 + fieldFontSize * 1.4,
  labelFontSize: unit(1.2),
  focusLabelTop: unit(.6),
  textBackgroundColor: `transparent`,
  textLabelColor,
  textBottomBorderColor,
  textHighlightColor: colors.primary,
  textDisabledColor: textBottomBorderColor,
  textDisabledTextColor: textLabelColor,
  textErrorColor: rgb(222, 50, 38),
  underlineHeight: unit(2),
  iconFontSize,
  iconSize: unit(2 * 2.4),
  iconOffset: unit(1.6),
  chevronOffset: unit(.8),
}

view Input {
  prop children:? any
  prop disabled:? bool = false
  prop error:? string
  prop floating:? bool = true
  prop icon:? string
  prop label:? string
  prop maxLength:? number
  prop multiline:? bool = false
  prop onBlur:? func = Flint.noop
  prop onChange:? func = Flint.noop
  prop onFocus:? func = Flint.noop
  prop onKeyPress:? func
  prop required:? bool = false
  prop type:? string = 'text'
  prop value:? any

  let focused, length, filled

  const handleChange = event => {
    onChange(event.target.value, event)
  }

  const handleFocus = event => {
    focused = true
    onFocus(event)
  }

  const handleBlur = event => {
    focused = false
    onBlur(event)
  }

  const blur = () => view.refs.input.blur()
  const focus = () => view.refs.input.focus()

  on.props(() => {
    length = maxLength && value ? value.length : 0
    filled = !!value
  })

  <inputdiv class={{ disabled, hidden: type === 'hidden' }}>
    <field
      {...view.props}
      ref="input"
      class={{ input: true, filled }}
      tagName={multiline ? 'textarea' : 'input'}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={value}
    />
    <FontIcon class="icon" if={icon} value={icon} />
    <bar><leftbar/><rightbar/></bar>
    <label if={label}>{label}</label>
    <error if={error}>{error}</error>
    <counter if={maxLength}>{length}/{maxLength}</counter>
  </inputdiv>

  $inputdiv = {
    display: `block`,
    marginLeft: icon ? styles.iconSize : 0,
    padding: [styles.padding, 0],
    position: `relative`
  }

  $icon = {
    color: focused ? styles.textHighlightColor : styles.textLabelColor,
    display: `block`,
    fontSize: styles.iconFontSize,
    height: styles.iconSize,
    left: unit(-4.8),
    lineHeight: styles.iconSize,
    position: `absolute`,
    textAlign: `center`,
    top: styles.iconOffset,
    transition: `color ${units.animationDuration} ${units.animationCurveDefault}`,
    width: styles.iconSize
  }

  $input = [
    {
      backgroundColor: styles.textBackgroundColor,
      border: 0,
      borderBottom: [1, `solid`, `rgba(${styles.textBottomBorderColor})`],
      color: colors.text,
      display: `block`,
      fontSize: styles.fieldFontSize,
      outline: `none`,
      padding: [styles.fieldPadding, 0],
      width: percent(100),
    },

    disabled && {
      borderBottomStyle: `dotted`,
      color: styles.textDisabledTextColor,
    },

    error && {
      borderBottom: `1px solid rgb(${styles.textErrorColor})`,
      marginTop: 1,
    }
  ]

  $label = [
    {
      color: styles.textLabelColor,
      fontSize: styles.fieldFontSize,
      left: 0,
      lineHeight: styles.fieldFontSize,
      pointerEvents: `none`,
      position: `absolute`,
      top: unit(2 + 1.5 * 0.8),
      transitionDuration: units.animationDuration,
      transitionProperty: `top, font-size, color`,
      transitionTimingFunction: units.animationCurveDefault
    },

    filled && !floating && {
      display: `none`,
    },

    focused && floating && {
      color: styles.textHighlightColor
    },

    focused && error && {
      color: styles.textErrorColor,
    },

    floating && (focused || filled || type === 'date' || type === 'time') && {
      fontSize: styles.labelFontSize,
      top: styles.focusLabelTop,
    }
  ]

  $bar = {
    display: `block`,
    position: `relative`,
    width: percent(100)
  }

  const positionedBar = {
    backgroundColor: styles.textHighlightColor,
    bottom: 0,
    height: 2,
    position: `absolute`,
    transitionProperty: `width, backgroundColor`,
    width: 0,
    ...effects.materialAnimationDefault('0.2s')
  }

  $leftbar = [
    positionedBar,
    { left: percent(50) },
    focused && { width: percent(50) },
    error && { backgroundColor: styles.textErrorColor }
  ]

  $rightbar = [
    positionedBar,
    { right: percent(50) },
    focused && { width: percent(50) },
    error && { backgroundColor: styles.textErrorColor }
  ]

  const subStyles = {
    color: styles.textErrorColor,
    fontSize: styles.labelFontSize,
    lineHeight: styles.underlineHeight
  }

  $error = [subStyles, { position: `absolute` }]

  $counter = [
    subStyles,
    {
      position: `absolute`,
      right: 0,
      color: styles.textLabelColor,
    },
    error && {
      color: styles.textErrorColor,
    }
  ]

  $hidden = {
    display: `none`,
  }
}
