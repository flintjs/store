

const Radio = ({checked, children, onMouseDown}) => {
  const className = style[checked ? 'radio-checked' : 'radio'];
  return <div data-role='radio' onMouseDown={onMouseDown} className={className}>{children}</div>;
};
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Radio);



view RadioButton {
  prop checked:? bool
  prop className:? string
  prop disabled:? bool
  prop label:? string
  prop name:? string
  prop onBlur:? func
  prop onChange:? func
  prop onFocus:? func
  prop value: React.PropTypes.any

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

  handleClick = (event) => {
    const {checked, disabled, onChange} = this.props;
    if (event.pageX !== 0 && event.pageY !== 0) this.blur();
    if (!disabled && !checked && onChange) onChange(event, this);
  };

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    const className = ClassNames(style[this.props.disabled ? 'disabled' : 'field'], this.props.className);
    const { onChange, ...others } = this.props;

    return (
      <label className={className}>
        <input
          {...others}
          className={style.input}
          onClick={this.handleClick}
          readOnly
          ref='input'
          type='radio'
        />
        <Radio checked={this.props.checked} disabled={this.props.disabled}/>
        {this.props.label ? <span className={style.text}>{this.props.label}</span> : null}
      </label>
    );
  }
}



view RadioGroup {
  prop children:? node
  prop className:? string
  prop disabled:? bool
  prop name:? string
  prop onChange:? func
  prop value: React.PropTypes.any

  static defaultProps = {
    className: '',
    disabled: false
  };

  handleChange = (value) => {
    if (this.props.onChange) this.props.onChange(value);
  };

  renderRadioButtons () {
    return React.Children.map(this.props.children, (radio, idx) => {
      return (
        <RadioButton
          {...radio.props}
          checked={radio.props.value === this.props.value}
          disabled={this.props.disabled || radio.props.disabled}
          key={idx}
          label={radio.props.label}
          onChange={this.handleChange.bind(this, radio.props.value)}
          value={radio.props.value}
        />
      );
    });
  }

  render () {
    return (
      <div className={this.props.className}>
        {this.renderRadioButtons()}
      </div>
    );
  }
}

