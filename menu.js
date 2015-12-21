

const POSITION = {
  AUTO: 'auto',
  STATIC: 'static',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right'
};

view Menu {
  prop active:? bool
  prop children:? node
  prop className:? string
  prop onHide:? func
  prop onSelect:? func
  prop onShow:? func
  prop outline:? bool
  prop position:? string
  prop ripple:? bool
  prop selectable:? bool
  prop selected: React.PropTypes.any

  static defaultProps = {
    active: false,
    outline: true,
    position: POSITION.STATIC,
    ripple: true,
    selectable: true
  };

  state = {
    active: this.props.active,
    rippled: false
  };

  componentDidMount () {
    const { width, height } = this.refs.menu.getBoundingClientRect();
    const position = this.props.position === POSITION.AUTO ? this.calculatePosition() : this.props.position;
    this.setState({ position, width, height });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.position !== nextProps.position) {
      const position = nextProps.position === POSITION.AUTO ? this.calculatePosition() : nextProps.position;
      this.setState({ position });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!this.state.active && nextState.active && this.props.position === POSITION.AUTO) {
      const position = this.calculatePosition();
      if (this.state.position !== position) {
        this.setState({ position, active: false }, () => {
          setTimeout(() => {this.setState({active: true}); }, 20);
        });
        return false;
      }
    }
    return true;
  }

  componentWillUpdate (prevState, nextState) {
    if (!prevState.active && nextState.active) {
      events.addEventsToDocument({click: this.handleDocumentClick});
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.active && !this.state.active) {
      if (this.props.onHide) this.props.onHide();
      events.removeEventsFromDocument({click: this.handleDocumentClick});
    } else if (!prevState.active && this.state.active && this.props.onShow) {
      this.props.onShow();
    }
  }

  handleDocumentClick = (event) => {
    if (this.state.active && !events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
      this.setState({active: false, rippled: false});
    }
  };

  handleSelect = (item) => {
    const { value, onClick } = item.props;
    this.setState({ active: false, rippled: this.props.ripple }, () => {
      if (onClick) onClick();
      if (this.props.onSelect) this.props.onSelect(value);
    });
  };

  calculatePosition () {
    const {top, left, height, width} = ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect();
    const {height: wh, width: ww} = utils.getViewport();
    const toTop = top < ((wh / 2) - height / 2);
    const toLeft = left < ((ww / 2) - width / 2);
    return `${toTop ? 'top' : 'bottom'}-${toLeft ? 'left' : 'right'}`;
  }

  getMenuStyle () {
    const { width, height, position } = this.state;
    if (position !== POSITION.STATIC) {
      if (this.state.active) {
        return { clip: `rect(0 ${width}px ${height}px 0)` };
      } else if (position === POSITION.TOP_RIGHT) {
        return { clip: `rect(0 ${width}px 0 ${width}px)` };
      } else if (position === POSITION.BOTTOM_RIGHT) {
        return { clip: `rect(${height}px ${width}px ${height}px ${width}px)` };
      } else if (position === POSITION.BOTTOM_LEFT) {
        return { clip: `rect(${height}px 0 ${height}px 0)` };
      } else if (position === POSITION.TOP_LEFT) {
        return { clip: `rect(0 0 0 0)` };
      }
    }
  }

  getRootStyle () {
    if (this.state.position !== POSITION.STATIC) {
      return { width: this.state.width, height: this.state.height };
    }
  }

  renderItems () {
    return React.Children.map(this.props.children, (item) => {
      if (item.type === MenuItem) {
        return React.cloneElement(item, {
          ripple: item.props.ripple || this.props.ripple,
          selected: item.props.value && this.props.selectable && item.props.value === this.props.selected,
          onClick: this.handleSelect.bind(this, item)
        });
      } else {
        return React.cloneElement(item);
      }
    });
  }

  show () {
    this.setState({active: true});
  }

  hide () {
    this.setState({active: false});
  }

  render () {
    const outlineStyle = { width: this.state.width, height: this.state.height };
    const className = ClassNames([style.root, style[this.state.position]], {
      [style.active]: this.state.active,
      [style.rippled]: this.state.rippled
    }, this.props.className);

    return (
      <div className={className} style={this.getRootStyle()}>
        {this.props.outline ? <div className={style.outline} style={outlineStyle}></div> : null}
        <ul ref='menu' className={style.menu} style={this.getMenuStyle()}>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}



const MenuDivider = () => (
  <hr data-react-toolbox='menu-divider' className={style.root}/>
);



view MenuItem {
  prop caption:? string.isRequired
  prop children:? any
  prop className:? string
  prop disabled:? bool
  prop icon:? string
  prop onClick:? func
  prop selected:? bool
  prop shortcut: React.PropTypes.string

  static defaultProps = {
    className: '',
    disabled: false,
    selected: false
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event, this);
    }
  };

  render () {
    const {icon, caption, children, shortcut, selected, disabled, ...others} = this.props;
    const className = ClassNames(style.root, {
      [style.selected]: selected,
      [style.disabled]: disabled
    }, this.props.className);

    return (
      <li {...others} data-react-toolbox='menu-item' className={className} onClick={this.handleClick}>
        {icon ? <FontIcon value={icon} className={style.icon}/> : null}
        <span className={style.caption}>{caption}</span>
        {shortcut ? <small className={style.shortcut}>{shortcut}</small> : null}
        {children}
      </li>
    );
  }
}
  className: style.ripple
})(MenuItem);


