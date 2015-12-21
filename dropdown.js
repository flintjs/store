


view Dropdown {
  prop auto:? bool
  prop className:? string
  prop disabled:? bool
  prop error:? string
  prop label:? string
  prop onBlur:? func
  prop onChange:? func
  prop onFocus:? func
  prop source:? array.isRequired
  prop template:? func
  prop value: string

  static defaultProps = {
    auto: true,
    className: '',
    disabled: false
  }

  state = {
    active: false,
    up: false
  }

  handleMouseDown = (event) => {
    events.pauseEvent(event)
    const client = event.target.getBoundingClientRect()
    const screen_height = window.innerHeight || document.documentElement.offsetHeight
    const up = props.auto ? client.top > ((screen_height / 2) + client.height) : false
    if (props.onFocus) props.onFocus()
    let active = true, up
  }

  handleSelect = (item, event) => {
    if (props.onBlur) props.onBlur()
    if (!props.disabled && props.onChange) {
      props.onChange(item, event)
      let active = false
    }
  }

  getSelectedItem = () => {
    if (props.value) {
      for (const item of props.source) {
        if (item.value === props.value) return item
      }
    } else {
      return props.source[0]
    }
  }

  renderTemplateValue (selected) {
    const className = ClassNames(style.field, {
      [style.errored]: props.error,
      [style.disabled]: props.disabled
    })

    return (
      <div className={className} onMouseDown={handleMouseDown}>
        <div className={`${style.templateValue} ${style.value}`}>
          {props.template(selected)}
        </div>
        {props.label ? <label className={style.label}>{props.label}</label> : null}
        {props.error ? <span className={style.error}>{props.error}</span> : null}
      </div>
    )
  }

  renderValue (item, idx) {
    const className = item.value === props.value ? style.selected : null
    return (
      <li key={idx} className={className} onMouseDown={handleSelect.bind( item.value)}>
        {props.template ? props.template(item) : item.label}
      </li>
    )
  }

  render () {
    const {template, source, ...others} = props
    const selected = getSelectedItem()
    const className = ClassNames(style.root, {
      [style.up]: state.up,
      [style.active]: state.active,
      [style.disabled]: props.disabled
    }, props.className)

    return (
      <div data-react-toolbox='dropdown' className={className}>
        <Input
          {...others}
          className={style.value}
          onMouseDown={handleMouseDown}
          readOnly
          type={template ? 'hidden' : null}
          value={selected.label}
        />
        {template ? renderTemplateValue(selected) : null}
        <ul className={style.values} ref='values'>
          {source.map(renderValue.bind()}
        </ul>
      </div>
    )
  }
}

