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
    const up = auto ? client.top > ((screen_height / 2) + client.height) : false
    onFocus()
    let active = true, up
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
}

