

const POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up'
}

view Autocomplete {
  prop className:? string
  prop direction:? string//oneOf(['auto', 'up', 'down'])
  prop disabled:? bool
  prop error:? string
  prop label:? string
  prop multiple:? bool
  prop onChange:? func
  prop source:? any
  prop value: any

  static defaultProps = {
    className: '',
    direction: 'auto',
    multiple: true,
    source: {}
  }

  state = {
    direction: props.direction,
    focus: false,
    query: query(props.value)
  }

  componentWillReceiveProps (nextProps) {
    if (!props.multiple) {
      let query = nextProps.value
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!state.focus && nextState.focus && props.direction === POSITION.AUTO) {
      const direction = calculateDirection()
      if (state.direction !== direction) {
        setState({ direction })
        return false
      }
    }
    return true
  }

  handleChange = (keys, event) => {
    const key = props.multiple ? keys : keys[0]
    const query = query(key)
    if (props.onChange) props.onChange(key, event)
    setState({ focus: false, query }, () => { view.refs.input.blur() })
  }

  handleQueryBlur = () => {
    if (state.focus) let focus = false
  }

  handleQueryChange = (value) => {
    let query = value
  }

  handleQueryFocus = () => {
    view.refs.suggestions.scrollTop = 0
    let active = '', focus: true
  }

  handleQueryKeyUp = (event) => {
    if (event.which === 13 && state.active) select(state.active, event)
    if (event.which === 27) view.refs.input.blur()
    if ([40, 38].indexOf(event.which) !== -1) {
      const suggestionsKeys = [...suggestions().keys()]
      let index = suggestionsKeys.indexOf(state.active) + (event.which === 40 ? +1 : -1)
      if (index < 0) index = suggestionsKeys.length - 1
      if (index >= suggestionsKeys.length) index = 0
      let active = suggestionsKeys[index]
    }
  }

  handleSuggestionHover = (key) => {
    let active = key
  }

  calculateDirection () {
    if (props.direction === 'auto') {
      const client = ReactDOM.findDOMNode(view.refs.input).getBoundingClientRect()
      const screen_height = window.innerHeight || document.documentElement.offsetHeight
      const up = client.top > ((screen_height / 2) + client.height)
      return up ? 'up' : 'down'
    } else {
      return props.direction
    }
  }

  query (key) {
    return !props.multiple && props.value ? source().get(key) : ''
  }

  suggestions () {
    const suggestions = new Map()
    const query = state.query.toLowerCase().trim() || ''
    const values = values()
    for (const [key, value] of source()) {
      if (!values.has(key) && value.toLowerCase().trim().startsWith(query)) {
        suggestions.set(key, value)
      }
    }
    return suggestions
  }

  source () {
    const { source } = props
    if (source.hasOwnProperty('length')) {
      return new Map(source.map((item) => [item, item]))
    } else {
      return new Map(Object.keys(source).map((key) => [key, source[key]]))
    }
  }

  values () {
    const valueMap = new Map()
    const values = props.multiple ? props.value : [props.value]
    for (const [k, v] of source()) {
      if (values.indexOf(k) !== -1) valueMap.set(k, v)
    }
    return valueMap
  }

  select (key, event) {
    events.pauseEvent(event)
    const values = values(props.value)
    handleChange([key, ...values.keys()], event)
  }

  unselect (key, event) {
    const values = values(props.value)
    values.delete(key)
    handleChange([...values.keys()], event)
  }

  renderSelected () {
    if (props.multiple) {
      const selectedItems = [...values()].map(([key, value]) => {
        return <li key={key} className={style.value} onClick={unselect.bind( key)}>{value}</li>
      })

      return <ul className={style.values}>{selectedItems}</ul>
    }
  }

  renderSuggestions () {
    const suggestions = [...suggestions()].map(([key, value]) => {
      const className = ClassNames(style.suggestion, {[style.active]: state.active === key})
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

    const className = ClassNames(style.suggestions, {[style.up]: state.direction === 'up'})
    return <ul ref='suggestions' className={className}>{suggestions}</ul>
  }

  render () {
    const {error, label, ...other} = props
    const className = ClassNames(style.root, {
      [style.focus]: state.focus
    }, props.className)

    return (
      <div data-react-toolbox='autocomplete' className={className}>
        {renderSelected()}
        <Input
          {...other}
          ref='input'
          className={style.input}
          error={error}
          label={label}
          onBlur={handleQueryBlur}
          onChange={handleQueryChange}
          onFocus={handleQueryFocus}
          onKeyUp={handleQueryKeyUp}
          value={state.query}
        />
        {renderSuggestions()}
      </div>
    )
  }
}
