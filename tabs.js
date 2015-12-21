

view TabHeader {
  prop active:? bool
  prop className:? string
  prop disabled:? bool
  prop hidden:? bool
  prop label:? any.isRequired
  prop onActive:? func
  prop onClick: React.PropTypes.func

  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    hidden: false
  };

  componentDidUpdate (prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };

  render () {
    const className = ClassNames(style.label, {
      [style.active]: this.props.active,
      [style.hidden]: this.props.hidden,
      [style.disabled]: this.props.disabled
    }, this.props.className);

    return (
      <label className={className} onClick={this.handleClick}>
        {this.props.label}
      </label>
    );
  }
}



view TabContent {
  prop active:? bool
  prop children:? node
  prop className:? string
  prop tabIndex: React.PropTypes.number

  static defaultProps = {
    active: false,
    className: ''
  };

  render () {
    let className = style.tab;
    if (this.props.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <section className={className} tabIndex={this.props.tabIndex}>
        {this.props.children}
      </section>
    );
  }
}



view Tabs {
  prop children:? node
  prop className:? string
  prop index:? number
  prop onChange: React.PropTypes.func

  static defaultProps = {
    index: 0
  };

  state = {
    pointer: {}
  };

  componentDidMount () {
    setTimeout(() => {
      this.updatePointer(this.props.index);
    }, 100);
  }

  componentWillReceiveProps (nextProps) {
    this.updatePointer(nextProps.index);
  }

  handleHeaderClick = (idx) => {
    if (this.props.onChange) this.props.onChange(idx);
  };

  parseChildren () {
    const headers = [];
    const contents = [];

    React.Children.forEach(this.props.children, (item) => {
      if (item.type === Tab) {
        headers.push(item);
        if (item.props.children) {
          contents.push(<TabContent children={item.props.children}/>);
        }
      } else if (item.type === TabContent) {
        contents.push(item);
      }
    });

    return {headers, contents};
  }

  updatePointer (idx) {
    const startPoint = this.refs.tabs.getBoundingClientRect().left;
    const label = this.refs.navigation.children[idx].getBoundingClientRect();
    this.setState({
      pointer: {
        top: `${this.refs.navigation.getBoundingClientRect().height}px`,
        left: `${label.left - startPoint}px`,
        width: `${label.width}px`
      }
    });
  }

  renderHeaders (headers) {
    return headers.map((item, idx) => {
      return React.cloneElement(item, {
        key: idx,
        active: this.props.index === idx,
        onClick: this.handleHeaderClick.bind(this, idx, item)
      });
    });
  }

  renderContents (contents) {
    return contents.map((item, idx) => {
      return React.cloneElement(item, {
        key: idx,
        active: this.props.index === idx,
        tabIndex: idx
      });
    });
  }

  render () {
    let className = style.root;
    const { headers, contents } = this.parseChildren();
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div ref='tabs' className={className}>
        <nav className={style.navigation} ref='navigation'>
          {this.renderHeaders(headers)}
        </nav>
        <span className={style.pointer} style={this.state.pointer} />
        {this.renderContents(contents)}
      </div>
    );
  }
}

