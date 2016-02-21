import { fns, palette, events } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { unit, percent, seconds, vh } = units

const styles = {
  overflowMaxHeight: vh(45),
  suggestionActiveBackground: colors.grey200,
  suggestionPadding: unit(1),
  suggestionsBackground: colors.white
}

const POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up'
}

view Autocomplete {
  prop className:? string
  prop direction:? string = 'auto'
  prop disabled:? bool
  prop error:? string
  prop label:? string
  prop multiple:? bool = true
  prop onChange:? func = Motion.noop
  prop source:? any = {}
  prop value: any

  let active = false
  let query = ''
  let focus = false
  let _direction

  on.props(() => {
    query = getQuery(value)
  })

  // Returns a map with the source normalized to a map
  let getSource = () => {
    return source.hasOwnProperty('length')
      ? new Map(source.map((item) => [item, item]))
      : new Map(Object.keys(source).map((key) => [key, source[key]]))
  }

  // Given a key return its value or empty string
  let getQuery = (key) => {
    return !multiple && key
      ? getSource().get(key)
      : ''
  }

  // Return a map of suggestions based on a given query
  let getSuggestions = (query) => {
    let suggestions = new Map()
    let normalizedQuery = query.toLowerCase().trim() || ''

    for (const [key, value] of getSource()) {
      if (!getValues().has(key) && value.toLowerCase().trim().startsWith(normalizedQuery)) {
        suggestions.set(key, value)
      }
    }

    return suggestions
  }

  // Return a map of values that can be selected
  let getValues = () => {
    const valueMap = new Map()
    const vals = multiple ? (value || []) : [ value ]

    for (let [k, v] of getSource()) {
      if (vals.indexOf(k) !== -1) valueMap.set(k, v)
    }

    return valueMap
  }

  // TODO This is not working
  // view.shouldUpdate((nextProps, nextState) => {
  //   if (!focus && nextState.focus && direction === POSITION.AUTO) {
  //     const newDirection = calculateDirection()
  //     if (_direction !== newDirection) {
  //       _direction = newDirection
  //       return false
  //     }
  //   }
  //   return true
  // })

  // TODO define a method to remove focus from input
  let handleChange = (keys, event) => {
    const key = multiple ? keys : keys[0]
    onChange(key, event)
    query = getQuery(key)
    focus = false
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

  // TODO Add a method to remove focus from input
  let handleQueryKeyUp = (event) => {
    if (event.which === 13 && active) select(active, event)
    // if (event.which === 27) view.refs.input.blur()
    if ([40, 38].indexOf(event.which) !== -1) {
      const suggestionsKeys = [...getSuggestions(query).keys()]
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

  let select = (key, event) => {
    events.pauseEvent(event)
    handleChange([key, ...getValues(value).keys()], event)
  }

  let unselect = (key, event) => {
    const values = values(value)
    values.delete(key)
    handleChange([...values.keys()], event)
  }

  let renderSuggestions = () => {
    const suggestions = [...getSuggestions(query)].map(([key, value]) => {
      return (
        <li
          key={key}
          class={{ suggestion: true, active: active === key }}
          onMouseDown={select.bind(this, key)}
          onMouseOver={handleSuggestionHover.bind(this, key)}
        >
          {value}
        </li>
      )
    })

    return (
      <ul ref='suggestions' class={{ suggestions: true, up: _direction === 'up', focus }}>
        {suggestions}
      </ul>
    )
  }

  <autocomplete>
    <Input
      ref="input"
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

  $ = {
    display: 'block',
    position: `relative`
  }

  // TODO Check the rendering position when shouldUpdate works
  $suggestions = {
    position: `absolute`,
    zIndex: units.zIndexHigh,
    width: percent(100),
    maxHeight: 0,
    bottom: unit(2),
    transform: 'translateY(100%)',
    overflowX: `hidden`,
    overflowY: `auto`,
    visibility: `hidden`,
    backgroundColor: styles.suggestionsBackground,
    transitionTimingFunction: units.animationCurveDefault,
    transitionDuration: units.animationDuration,
    transitionProperty: 'max-height, box-shadow'
    // bottom: up ? 0 : `auto`
  }

  $focus = [{
      maxHeight: styles.overflowMaxHeight,
      visibility: `visible`
    },
    effects.shadow2dp()
  ]


  $suggestion = {
    padding: styles.suggestionPadding,
    cursor: `pointer`
  }

  $active = {
    backgroundColor: styles.suggestionActiveBackground
  }
}
