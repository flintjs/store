const POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up'
}

view Autocomplete {
  prop className:? string
  prop direction:? string = 'auto'//oneOf(['auto', 'up', 'down'])
  prop disabled:? bool
  prop error:? string
  prop label:? string
  prop multiple:? bool = true
  prop onChange:? func = Flint.noop
  prop source:? any = {}
  prop value: any

  let active = false
  let query = ''
  let focus = false
  let _direction

  on.props(() => {
    _direction = direction
    query = getQuery(value)

    if (!multiple)
      query = value
  })

  view.shouldUpdate((nextProps, nextState) => {
    if (!focus && nextState.focus && direction === POSITION.AUTO) {
      const direction = calculateDirection()
      if (_direction !== direction) {
        setState({ direction })
        return false
      }
    }
    return true
  })

  let handleChange = (keys, event) => {
    const key = multiple ? keys : keys[0]
    onChange(key, event)

    query = getQuery(key)
    focus = false
    view.refs.input.blur()
  }

  let handleQueryBlur = () => {
    if (focus) focus = false
  }

  let handleQueryChange = (value) => {
    query = value
  }

  let handleQueryFocus = () => {
    view.refs.suggestions.scrollTop = 0
    active = ''
    focus = true
  }

  let handleQueryKeyUp = (event) => {
    if (event.which === 13 && active) select(active, event)
    if (event.which === 27) view.refs.input.blur()
    if ([40, 38].indexOf(event.which) !== -1) {
      const suggestionsKeys = [...suggestions().keys()]
      let index = suggestionsKeys.indexOf(active) + (event.which === 40 ? +1 : -1)
      if (index < 0) index = suggestionsKeys.length - 1
      if (index >= suggestionsKeys.length) index = 0
      active = suggestionsKeys[index]
    }
  }

  let handleSuggestionHover = (key) => {
    active = key
  }

  let calculateDirection = () => {
    if (direction === 'auto') {
      const client = ReactDOM.findDOMNode(view.refs.input).getBoundingClientRect()
      const screen_height = window.innerHeight || document.documentElement.offsetHeight
      const up = client.top > ((screen_height / 2) + client.height)
      return up ? 'up' : 'down'
    } else {
      return direction
    }
  }

  let getQuery = (key) => {
    return !multiple && value ? getSource().get(key) : ''
  }

  let suggestions = () => {
    const suggestions = new Map()
    const query = query.toLowerCase().trim() || ''
    const values = values()
    for (const [key, value] of getSource()) {
      if (!values.has(key) && value.toLowerCase().trim().startsWith(query)) {
        suggestions.set(key, value)
      }
    }
    return suggestions
  }

  let getSource = () => {
    if (source.hasOwnProperty('length')) {
      return new Map(source.map((item) => [item, item]))
    } else {
      return new Map(Object.keys(source).map((key) => [key, source[key]]))
    }
  }

  let values = () => {
    const valueMap = new Map()
    const values = multiple ? value : [value]
    for (const [k, v] of getSource()) {
      if (values.indexOf(k) !== -1) valueMap.set(k, v)
    }
    return valueMap
  }

  let select = (key, event) => {
    events.pauseEvent(event)
    const values = values(value)
    handleChange([key, ...values.keys()], event)
  }

  let unselect = (key, event) => {
    const values = values(value)
    values.delete(key)
    handleChange([...values.keys()], event)
  }

  let renderSelected = () => {
    if (multiple) {
      const selectedItems = [...values()].map(([key, value]) => {
        return <li key={key} className={style.value} onClick={unselect.bind( key)}>{value}</li>
      })

      return <ul className={style.values}>{selectedItems}</ul>
    }
  }

  let renderSuggestions = () => {
    const suggestions = [...suggestions()].map(([key, value]) => {
      const className = ClassNames(style.suggestion, {[style.active]: active === key})
      return (
        <li
          key={key}
          className={className}
          onMouseDown={select.bind( key)}
          onMouseOver={handleSuggestionHover.bind( key)}
        >
          {value}
        </li>
      )
    })

    const className = ClassNames(style.suggestions, {[style.up]: _direction === 'up'})
    return <ul ref='suggestions' className={className}>{suggestions}</ul>
  }

  <autocomplete class={{ focus }}>
    {renderSelected()}
    <Input
      {...other}
      ref='input'
      class="input"
      error={error}
      label={label}
      onBlur={handleQueryBlur}
      onChange={handleQueryChange}
      onFocus={handleQueryFocus}
      onKeyUp={handleQueryKeyUp}
      value={query}
    />
    {renderSuggestions()}
  </autocomplete>
}
