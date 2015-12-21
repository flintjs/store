import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { unit, percent, seconds } = units

const fieldPadding = unit(.8)
const fieldFontSize = unit(1.6)

const styles = {
  fieldPadding,
  fieldFontSize,
  padding:  unit(2),
  fieldHeight: input.fieldPadding * 2 + input.fieldFontSize * 1.4,
  labelFontSize: unit(1.2),
  focusLabelTop: unit(.6),
  textBackgroundColor: `transparent`,
  textLabelColor: rgba(colors.black, 0.26),
  textBottomBorderColor: rgba(colors.black, 0.12),
  textHighlightColor: colors.primary,
  textDisabledColor: input.textBottomBorderColor,
  textDisabledTextColor: input.textLabelColor,
  textErrorColor: rgb(222, 50, 38),
  underlineHeight: unit( 2),
  iconFontSize: unit(2.4),
  iconSize: 2 * input.iconFontSize,
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
    <FontIcon if={icon} value={icon} />
    <bar />
    <label if={labelText} class={{ fixed: !floating }}>{labelText}</label>
    <error if={error}>{error}</error>
    <counter if={maxLength}>{length}/{maxLength}</counter>
    {children}
  </input-div>
}