import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { unit, percent, seconds } = units

const fieldPadding = unit(.8)
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
  underlineHeight: unit( 2),
  iconFontSize,
  iconSize: 2 * iconFontSize,
  iconOffset: unit(1.6),
  chevronOffset: unit(.8),
}

view Input {
  prop disabled:? bool = false
  prop floating:? bool = true
  prop multiline:? bool = false
  prop required:? bool = false
  prop type:? string = 'text'
  prop onChange:? func = Flint.noop

  prop children:? any
  prop error:? string
  prop icon:? string
  prop label:? string
  prop maxLength:? number
  prop onBlur:? func
  prop onFocus:? func
  prop onKeyPress:? func
  prop value:? any

  const handleChange = event => onChange(event.target.value, event)
  const blur = () => view.refs.input.blur()
  const focus = () => view.refs.input.focus()

  let length

  on.props(() => {
    length = maxLength && value ? value.length : 0
  })

  <input-div class={{ disabled, error, hidden: type == 'hidden', icon }}>
    <field yield
      tagName={multiline ? 'textarea' : 'input'}
      class={{ filled: !!value }}
      onChange={handleChange}
      ref="input"
      role="input"
    />
    <FontIcon class="icon" if={icon} value={icon} />
    <bar />
    <label if={labelText} class={{ fixed: !floating }}>{labelText}</label>
    <error if={error}>{error}</error>
    <counter if={maxLength}>{length}/{maxLength}</counter>
    {children}
  </input-div>


  $ = {
    position: `relative`,
    padding: [styles.padding, 0],
    marginLeft: withIcon ? styles.iconSize : 0
  }

  $errored = {
    paddingBottom: 0
  }

  $icon = {
    position: `absolute`,
    top: styles.iconOffset,
    left: Styles.iconSize,
    display: `block`,
    width: styles.iconSize,
    height: styles.iconSize,
    fontSize: styles.iconFontSize,
    lineHeight: styles.iconSize,
    color: focus ? styles.textHighlightColor : styles.textLabelColor,
    textAlign: `center`,
    transition: `color ${units.animationDuration} ${units.animationCurveDefault}`,
  }

  $input = [
    {
      display: `block`,
      width: percent(100),
      padding: [styles.fieldPadding, 0],
      fontSize: styles.fieldFontSize,
      color: colors.text,
      backgroundColor: styles.textBackgroundColor,
      border: 0,
      borderBottom: [1, `solid`, styles.textBottomBorderColor],
      outline: `none`,
    },

    disabled && {
      color: styles.textDisabledTextColor,
      borderBottomStyle: dotted,
    },

    errored && {
      marginTop: 1,
      borderBottomColor: styles.textErrorColor,
    }
  ]

  $label = [
    {
      position: `absolute`,
      top: styles.padding + (1.5 * styles.fieldPadding),
      left: 0,
      fontSize: styles.fieldFontSize,
      lineHeight: styles.fieldFontSize,
      color: styles.textLabelColor,
      pointerEvents: `none`,
      transitionTimingFunction: units.animationCurveDefault,
      transitionDuration: units.animationDuration,
      transitionProperty: `top, fontSize, color`,
    },

    fixed && filled && {
      display: none,
    },

    focus && !fixed && {
      color: styles.textErrorColor,
    },

    focus && !fixed && {
      color: styles.textHighlightColor,
    },

    errored && {
      color: styles.textErrorColor,
    },

    !fixed && (focus || filled || type == 'date' || type == 'time') && {
      top: styles.focusLabelTop,
      fontSize: styles.labelFontSize,
    }
  ]

  const aroundBar = {
    // @include materialAnimationDefault(),
    position: `absolute`,
    bottom: 0,
    width: 0,
    height: 2,
    content: "",
    backgroundColor: styles.textHighlightColor,
    transitionProperty: `width, backgroundColor`,
  }

  $bar = [
    {
      position: `relative`,
      display: `block`,
      width: percent(100),

      before: [aroundBar, { left: percent(50) }],
      after: [aroundBar, { right: percent(50) }],
    },

    focus && {
      before: { width: percent(50) },
      after: { width: percent(50) },
    },

    focus && !fixed && {
      before: { backgroundColor: styles.textErrorColor },
      after: { backgroundColor: styles.textErrorColor },
    },
  ]

  const subStyles = {
    marginBottom:  styles.underlineHeight,
    fontSize: styles.labelFontSize,
    lineHeight: styles.underlineHeight,
    color: styles.textErrorColor,
  }

  $error = [subStyles]

  $counter = [
    subStyles,
    {
      position: `absolute`,
      right: 0,
      color: styles.textLabelColor,
    },

    errored && {
      color: styles.textErrorColor,
    }
  ]

  $hidden = {
    display: none,
  }
}