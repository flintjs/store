


const Tooltip = (ComposedComponent) => view extends {
  prop children:? any
  prop className:? string
  prop onClick:? func
  prop onMouseEnter:? func
  prop onMouseLeave:? func
  prop tooltip:? string
  prop tooltipDelay:? number
  prop tooltipHideOnClick: bool

  static defaultProps = {
    className: '',
    tooltipDelay: 0,
    tooltipHideOnClick: true
  }

  state = {
    active: false
  }

  handleMouseEnter = () => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() =>let active = true, props.tooltipDelay)
    if (props.onMouseEnter) props.onMouseEnter()
  }

  handleMouseLeave = () => {
    if (timeout) clearTimeout(timeout)
    if (state.active) let active = false
    if (props.onMouseLeave) props.onMouseLeave()
  }

  handleClick = () => {
    if (timeout) clearTimeout(timeout)
    if (props.tooltipHideOnClick) let active = false
    if (props.onClick) props.onClick()
  }

  render () {
    const {children, className, tooltip, tooltipDelay, tooltipHideOnClick, ...other} = props
    const composedClassName = ClassNames(style.root, className)
    const tooltipClassName = ClassNames(style.tooltip, {
      [style.active]: state.active
    })

    return (
      <ComposedComponent
        {...other}
        className={composedClassName}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children ? children : null}
        <span data-react-toolbox="tooltip" className={tooltipClassName}>{tooltip}</span>
      </ComposedComponent>
    )
  }
}
