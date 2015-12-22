const POSITION = {
  AUTO: 'auto',
  STATIC: 'static',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right'
}

view Menu {
  prop active:? bool = false
  prop children:? node
  prop className:? string
  prop onHide:? func
  prop onSelect:? func
  prop onShow:? func
  prop outline:? bool = true
  prop position:? string = POSITION.STATIC
  prop ripple:? bool = true
  prop selectable:? bool = true
  prop selected: any

  let _active = active
  let rippled = false

  componentDidMount () {
    const { width, height } = view.refs.menu.getBoundingClientRect()
    const position = props.position === POSITION.AUTO ? calculatePosition() : props.position
    setState({ position, width, height })
  }

  componentWillReceiveProps (nextProps) {
    if (props.position !== nextProps.position) {
      const position = nextProps.position === POSITION.AUTO ? calculatePosition() : nextProps.position
      setState({ position })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!_active && nextState.active && props.position === POSITION.AUTO) {
      const position = calculatePosition()
      if (state.position !== position) {
        setState({ position, active: false }, () => {
          setTimeout(() => {let active = true }, 20)
        })
        return false
      }
    }
    return true
  }

  componentWillUpdate (prevState, nextState) {
    if (!prevState.active && nextState.active) {
      events.addEventsToDocument({click: handleDocumentClick})
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.active && !_active) {
      if (props.onHide) props.onHide()
      events.removeEventsFromDocument({click: handleDocumentClick})
    } else if (!prevState.active && _active && props.onShow) {
      props.onShow()
    }
  }

  handleDocumentClick = (event) => {
    if (_active && !events.targetIsDescendant(event, ReactDOM.findDOMNode()) {
      let active = false, rippled: false
    }
  }

  handleSelect = (item) => {
    const { value, onClick } = item.props
    setState({ active: false, rippled: props.ripple }, () => {
      if (onClick) onClick()
      if (props.onSelect) props.onSelect(value)
    })
  }

  calculatePosition () {
    const {top, left, height, width} = ReactDOM.findDOMNode(.parentNode.getBoundingClientRect()
    const {height: wh, width: ww} = utils.getViewport()
    const toTop = top < ((wh / 2) - height / 2)
    const toLeft = left < ((ww / 2) - width / 2)
    return `${toTop ? 'top' : 'bottom'}-${toLeft ? 'left' : 'right'}`
  }

  getMenuStyle () {
    const { width, height, position } = state
    if (position !== POSITION.STATIC) {
      if (_active) {
        return { clip: `rect(0 ${width}px ${height}px 0)` }
      } else if (position === POSITION.TOP_RIGHT) {
        return { clip: `rect(0 ${width}px 0 ${width}px)` }
      } else if (position === POSITION.BOTTOM_RIGHT) {
        return { clip: `rect(${height}px ${width}px ${height}px ${width}px)` }
      } else if (position === POSITION.BOTTOM_LEFT) {
        return { clip: `rect(${height}px 0 ${height}px 0)` }
      } else if (position === POSITION.TOP_LEFT) {
        return { clip: `rect(0 0 0 0)` }
      }
    }
  }

  getRootStyle () {
    if (state.position !== POSITION.STATIC) {
      return { width: state.width, height: state.height }
    }
  }

  renderItems () {
    return React.Children.map(props.children, (item) => {
      if (item.type === MenuItem) {
        return React.cloneElement(item, {
          ripple: item.props.ripple || props.ripple,
          selected: item.props.value && props.selectable && item.props.value === props.selected,
          onClick: handleSelect.bind( item)
        })
      } else {
        return React.cloneElement(item)
      }
    })
  }

  show () {
    let active = true
  }

  hide () {
    let active = false
  }

  render () {
    const outlineStyle = { width: state.width, height: state.height }
    const className = ClassNames([style.root, style[state.position]], {
      [style.active]: _active,
      [style.rippled]: rippled
    }, props.className)

    return (
      <div className={className} style={getRootStyle()}>
        {props.outline ? <div className={style.outline} style={outlineStyle}></div> : null}
        <ul ref='menu' className={style.menu} style={getMenuStyle()}>
          {renderItems()}
        </ul>
      </div>
    )
  }
}



const MenuDivider = () => (
  <hr data-react-toolbox='menu-divider' className={style.root}/>
)



view MenuItem {
  prop caption:? string.isRequired
  prop children:? any
  prop className:? string
  prop disabled:? bool
  prop icon:? string
  prop onClick:? func
  prop selected:? bool
  prop shortcut: string

  static defaultProps = {
    className: '',
    disabled: false,
    selected: false
  }

  handleClick = (event) => {
    if (props.onClick && !props.disabled) {
      props.onClick(event,
    }
  }

  render () {
    const {icon, caption, children, shortcut, selected, disabled, ...others} = props
    const className = ClassNames(style.root, {
      [style.selected]: selected,
      [style.disabled]: disabled
    }, props.className)

    return (
      <li {...others} data-react-toolbox='menu-item' className={className} onClick={handleClick}>
        {icon ? <FontIcon value={icon} className={style.icon}/> : null}
        <span className={style.caption}>{caption}</span>
        {shortcut ? <small className={style.shortcut}>{shortcut}</small> : null}
        {children}
      </li>
    )
  }
}
  className: style.ripple
})(MenuItem)


