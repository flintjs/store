


const Tooltip = (ComposedComponent) => view extends {
  prop children:? any
  prop className:? string
  prop onClick:? func
  prop onMouseEnter:? func
  prop onMouseLeave:? func
  prop tooltip:? string
  prop tooltipDelay:? number
  prop tooltipHideOnClick: React.PropTypes.bool

  static defaultProps = {
    className: '',
    tooltipDelay: 0,
    tooltipHideOnClick: true
  };

  state = {
    active: false
  };

  handleMouseEnter = () => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() =>this.setState({active: true}), this.props.tooltipDelay);
    if (this.props.onMouseEnter) this.props.onMouseEnter();
  };

  handleMouseLeave = () => {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.state.active) this.setState({active: false});
    if (this.props.onMouseLeave) this.props.onMouseLeave();
  };

  handleClick = () => {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.props.tooltipHideOnClick) this.setState({active: false});
    if (this.props.onClick) this.props.onClick();
  }

  render () {
    const {children, className, tooltip, tooltipDelay, tooltipHideOnClick, ...other} = this.props;
    const composedClassName = ClassNames(style.root, className);
    const tooltipClassName = ClassNames(style.tooltip, {
      [style.active]: this.state.active
    });

    return (
      <ComposedComponent
        {...other}
        className={composedClassName}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children ? children : null}
        <span data-react-toolbox="tooltip" className={tooltipClassName}>{tooltip}</span>
      </ComposedComponent>
    );
  }
};
