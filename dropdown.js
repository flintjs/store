


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
  prop value: React.PropTypes.string

  static defaultProps = {
    auto: true,
    className: '',
    disabled: false
  };

  state = {
    active: false,
    up: false
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    const client = event.target.getBoundingClientRect();
    const screen_height = window.innerHeight || document.documentElement.offsetHeight;
    const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;
    if (this.props.onFocus) this.props.onFocus();
    this.setState({active: true, up});
  };

  handleSelect = (item, event) => {
    if (this.props.onBlur) this.props.onBlur();
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(item, event);
      this.setState({active: false});
    }
  };

  getSelectedItem = () => {
    if (this.props.value) {
      for (const item of this.props.source) {
        if (item.value === this.props.value) return item;
      }
    } else {
      return this.props.source[0];
    }
  };

  renderTemplateValue (selected) {
    const className = ClassNames(style.field, {
      [style.errored]: this.props.error,
      [style.disabled]: this.props.disabled
    });

    return (
      <div className={className} onMouseDown={this.handleMouseDown}>
        <div className={`${style.templateValue} ${style.value}`}>
          {this.props.template(selected)}
        </div>
        {this.props.label ? <label className={style.label}>{this.props.label}</label> : null}
        {this.props.error ? <span className={style.error}>{this.props.error}</span> : null}
      </div>
    );
  }

  renderValue (item, idx) {
    const className = item.value === this.props.value ? style.selected : null;
    return (
      <li key={idx} className={className} onMouseDown={this.handleSelect.bind(this, item.value)}>
        {this.props.template ? this.props.template(item) : item.label}
      </li>
    );
  }

  render () {
    const {template, source, ...others} = this.props;
    const selected = this.getSelectedItem();
    const className = ClassNames(style.root, {
      [style.up]: this.state.up,
      [style.active]: this.state.active,
      [style.disabled]: this.props.disabled
    }, this.props.className);

    return (
      <div data-react-toolbox='dropdown' className={className}>
        <Input
          {...others}
          className={style.value}
          onMouseDown={this.handleMouseDown}
          readOnly
          type={template ? 'hidden' : null}
          value={selected.label}
        />
        {template ? this.renderTemplateValue(selected) : null}
        <ul className={style.values} ref='values'>
          {source.map(this.renderValue.bind(this))}
        </ul>
      </div>
    );
  }
}

