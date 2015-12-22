

view Switch {
  prop checked:? bool
  prop className:? string
  prop disabled:? bool
  prop label:? string
  prop name:? string
  prop onBlur:? func
  prop onChange:? func
  prop onFocus: func

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  }

  handleToggle = (event) => {
    if (event.pageX !== 0 && event.pageY !== 0) blur()
    if (!props.disabled && props.onChange) {
      props.onChange(!props.checked, event)
    }
  }

  blur () {
    view.refs.input.blur()
  }

  focus () {
    view.refs.input.focus()
  }

  render () {
    let className = style[props.disabled ? 'disabled' : 'field']
    const switchClassName = style[props.checked ? 'on' : 'off']
    const { onChange, ...others } = props
    if (props.className) className += ` ${props.className}`

    return (
      <label data-react-toolbox='checkbox' className={className}>
        <input
          {...others}
          checked={props.checked}
          className={style.input}
          onClick={handleToggle}
          readOnly
          ref='input'
          type='checkbox'
        />
        <span role='switch' className={switchClassName}>
          <Thumb disabled={props.disabled} />
        </span>
        {props.label ? <span className={style.text}>{props.label}</span> : null}
      </label>
    )
  }
}
