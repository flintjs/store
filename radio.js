

const Radio = ({checked, children, onMouseDown}) => {
  const className = style[checked ? 'radio-checked' : 'radio']
  return <div data-role='radio' onMouseDown={onMouseDown} className={className}>{children}</div>
}
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Radio)



view RadioButton {
  prop checked:? bool
  prop className:? string
  prop disabled:? bool
  prop label:? string
  prop name:? string
  prop onBlur:? func
  prop onChange:? func
  prop onFocus:? func
  prop value: any

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  }

  handleClick = (event) => {
    const {checked, disabled, onChange} = props
    if (event.pageX !== 0 && event.pageY !== 0) blur()
    if (!disabled && !checked && onChange) onChange(event, 
  }

  blur () {
    view.refs.input.blur()
  }

  focus () {
    view.refs.input.focus()
  }

  render () {
    const className = ClassNames(style[props.disabled ? 'disabled' : 'field'], props.className)
    const { onChange, ...others } = props

    return (
      <label className={className}>
        <input
          {...others}
          className={style.input}
          onClick={handleClick}
          readOnly
          ref='input'
          type='radio'
        />
        <Radio checked={props.checked} disabled={props.disabled}/>
        {props.label ? <span className={style.text}>{props.label}</span> : null}
      </label>
    )
  }
}



view RadioGroup {
  prop children:? node
  prop className:? string
  prop disabled:? bool
  prop name:? string
  prop onChange:? func
  prop value: any

  static defaultProps = {
    className: '',
    disabled: false
  }

  handleChange = (value) => {
    if (props.onChange) props.onChange(value)
  }

  renderRadioButtons () {
    return React.Children.map(props.children, (radio, idx) => {
      return (
        <RadioButton
          {...radio.props}
          checked={radio.props.value === props.value}
          disabled={props.disabled || radio.props.disabled}
          key={idx}
          label={radio.props.label}
          onChange={handleChange.bind( radio.props.value)}
          value={radio.props.value}
        />
      )
    })
  }

  render () {
    return (
      <div className={props.className}>
        {renderRadioButtons()}
      </div>
    )
  }
}

