const styles = {
  expandDuration: seconds(.3),
  fadeDuration: seconds(.2),
  rippleDelay: seconds(.3),
  backgroundColor: colors.white,
  padding: [unit(.8), 0],
  outlineBorderRadius: unit(.2),
  itemHoverBackground: colors.grey200,
  itemIconFontSize: unit(2.4),
  itemIconSize: 1.6 * menuItemIconFontSize,
  itemHeight: unit(4.8),
  itemPadding: unit(1.6),
  itemFontSize: unit(1.6),
  dividerHeight: unit(4.8 / 4),
  iconSize: unit(2.3),
  iconRippleDuration: milliseconds(650),
}

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

  let componentDidMount = () => {
    const { width, height } = view.refs.menu.getBoundingClientRect()
    const position = props.position === POSITION.AUTO ? calculatePosition() : props.position
    setState({ position, width, height })
  }

  let componentWillReceiveProps = (nextProps) => {
    if (props.position !== nextProps.position) {
      const position = nextProps.position === POSITION.AUTO ? calculatePosition() : nextProps.position
      setState({ position })
    }
  }

  let shouldComponentUpdate = (nextProps, nextState) => {
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

  let componentWillUpdate = (prevState, nextState) => {
    if (!prevState.active && nextState.active) {
      events.addEventsToDocument({click: handleDocumentClick})
    }
  }

  let componentDidUpdate = (prevProps, prevState) => {
    if (prevState.active && !_active) {
      if (props.onHide) props.onHide()
      events.removeEventsFromDocument({click: handleDocumentClick})
    } else if (!prevState.active && _active && props.onShow) {
      props.onShow()
    }
  }

  let handleDocumentClick = (event) => {
    if (_active && !events.targetIsDescendant(event, ReactDOM.findDOMNode())) {
      active = false
      rippled = false
    }
  }

  let handleSelect = (item) => {
    const { value, onClick } = item.props
    setState({ active: false, rippled: props.ripple }, () => {
      if (onClick) onClick()
      if (props.onSelect) props.onSelect(value)
    })
  }

  let calculatePosition = () => {
    const {top, left, height, width} = ReactDOM.findDOMNode(parentNode.getBoundingClientRect())
    const {height: wh, width: ww} = utils.getViewport()
    const toTop = top < ((wh / 2) - height / 2)
    const toLeft = left < ((ww / 2) - width / 2)
    return `${toTop ? 'top' : 'bottom'}-${toLeft ? 'left' : 'right'}`
  }

  let getMenuStyle = () => {
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

  let getRootStyle = () => {
    if (state.position !== POSITION.STATIC) {
      return { width: state.width, height: state.height }
    }
  }

  let renderItems = () => {
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

  let show = () => {
    active = true
  }

  let hide = () => {
    active = false
  }

  let render = () => {
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

  // $ = {
  //   position: `relative`,
  //   display: `inline-block`,
  //   &.top-left {
  //     position: `absolute`,
  //     top: 0,
  //     left: 0,
  //     > .outline {
  //       transform-origin: 0 0,
  //     }
  //   }
  //   &.top-right {
  //     position: `absolute`,
  //     top: 0,
  //     right: 0,
  //     > .outline {
  //       transform-origin: percent(100) 0,
  //     }
  //   }
  //   &.bottom-left {
  //     position: `absolute`,
  //     bottom: 0,
  //     left: 0,
  //     > .outline {
  //       transform-origin: 0 percent(100),
  //     }
  //   }
  //   &.bottom-right {
  //     position: `absolute`,
  //     right: 0,
  //     bottom: 0,
  //     > .outline {
  //       transform-origin: percent(100) percent(100),
  //     }
  //   }
  //   &:not(.static) {
  //     zIndex: zIndexHigher,
  //     pointerEvents: `none`,
  //     > .outline {
  //       opacity: 0,
  //       transition: transform menuExpandDuration animationCurveDefault,
  //       opacity menuFadeDuration animationCurveDefault,
  //       transform: scale(0),
  //       will-change: transform,
  //     }
  //     > .menu {
  //       position: `absolute`,
  //       top: 0,
  //       left: 0,
  //       opacity: 0,
  //     }
  //     &.rippled:not(.active) {
  //       > .outline {
  //         transitionDelay: menuRippleDelay,
  //       }
  //       > .menu {
  //         transitionDelay: menuRippleDelay,
  //       }
  //     }
  //     &.active {
  //       pointerEvents: all,
  //       > .outline {
  //         opacity: 1,
  //         transform: scale(1),
  //       }
  //       > .menu {
  //         opacity: 1,
  //         transition: opacity menuFadeDuration animationCurveDefault,
  //         clip menuExpandDuration animationCurveDefault,
  //       }
  //     }
  //   }
  // }
  //
  // .outline {
  //   @include shadow-2dp(),
  //   position: `absolute`,
  //   top: 0,
  //   left: 0,
  //   display: `block`,
  //   backgroundColor: menuBackgroundColor,
  //   borderRadius: menuOutlineBorderRadius,
  // }
  //
  // .menu {
  //   position: `relative`,
  //   display: `block`,
  //   padding: menuPadding,
  //   textAlign: left,
  //   whiteSpace: `nowrap`,
  //   list-style: `none`,
  // }
}



const MenuDivider = () => (
  <hr data-react-toolbox='menu-divider' className={style.root}/>

  // $root = {
  //   display: `block`,
  //   width: percent(100),
  //   height: 1,
  //   margin: menuDividerHeight 0,
  //   backgroundColor: colorDivider,
  // }
)



view MenuItem {
  prop caption: string

  prop children:? any
  prop className:? string
  prop disabled:? bool = false
  prop icon:? string
  prop onClick:? func
  prop selected:? bool = false
  prop shortcut: string

  let handleClick = (event) => {
    !disabled && onClick(event)
  }

  let render = () => {
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
  //
  // .root {
  //   position: `relative`,
  //   display: flex,
  //   height: menuItemHeight,
  //   alignItems: `center`,
  //   padding: 0 menuItemPadding,
  //   overflow: `hidden`,
  //   fontSize: menuItemFontSize,
  //   color: colorText,
  //   &:not(.disabled):hover {
  //     cursor: `pointer`,
  //     backgroundColor: menuItemHoverBackground,
  //   }
  //   &.disabled {
  //     pointerEvents: `none`,
  //     opacity: .5,
  //   }
  //   &.selected {
  //     font-weight: 500,
  //   }
  // }
  //
  // .icon {
  //   width: menuItemIconSize,
  //   fontSize: menuItemIconFontSize !important,
  // }
  //
  // .caption {
  //   flex-grow: 1,
  //   fontSize: fontSizeNormal,
  // }
  //
  // .shortcut {
  //   marginLeft: menuItemPadding,
  // }
  //
  // .ripple {
  //   color: colorTextSecondary,
  // }
}