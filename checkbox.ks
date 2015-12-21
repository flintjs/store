
const Check = ({checked, children, onMouseDown}) => {
  const className = ClassNames(style.check, {
    [style.checked]: checked
  });

  return <div data-role='checkbox' onMouseDown={onMouseDown} className={className}>{children}</div>;
};
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Check);



view Checkbox {
  prop checked:? bool
  prop className:? string
  prop disabled:? bool
  prop label:? any
  prop name:? string
  prop onBlur:? func
  prop onChange:? func
  prop onFocus: React.PropTypes.func

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

  handleToggle = (event) => {
    if (event.pageX !== 0 && event.pageY !== 0) this.blur();
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.checked, event);
    }
  };

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    const { onChange, ...others } = this.props;
    const className = ClassNames(style.field, {
      [style.disabled]: this.props.disabled
    }, this.props.className);

    return (
      <label data-react-toolbox='checkbox' className={className}>
        <input
          {...others}
          className={style.input}
          onClick={this.handleToggle}
          readOnly
          ref='input'
          type='checkbox'
        />
        <Check checked={this.props.checked} disabled={this.props.disabled}/>
        {this.props.label ? <span data-role='label' className={style.text}>{this.props.label}</span> : null}
      </label>
    );
  }
}

