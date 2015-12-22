// const styles = {
//   tooltipBackground: rgba(97,97,97,.9),
//   tooltipMargin: 0.5 * $unit,
//   tooltipBorderRadius: .2 * $unit,
//   tooltipColor: #fff,
//   tooltipFontSize: $unit,
//   tooltipMaxWidth: 17 * $unit,
//   tooltipPadding: .8 * $unit,
//   tooltipAnimationDuration: milliseconds(200),
// }
//
//
// const Tooltip = (ComposedComponent) => view extends {
//   prop children:? any
//   prop className:? string
//   prop onClick:? func
//   prop onMouseEnter:? func
//   prop onMouseLeave:? func
//   prop tooltip:? string
//   prop tooltipDelay:? number
//   prop tooltipHideOnClick: bool
//
//   static defaultProps = {
//     className: '',
//     tooltipDelay: 0,
//     tooltipHideOnClick: true
//   }
//
//   state = {
//     active: false
//   }
//
//   handleMouseEnter = () => {
//     if (timeout) clearTimeout(timeout)
//     timeout = setTimeout(() =>let active = true, props.tooltipDelay)
//     if (props.onMouseEnter) props.onMouseEnter()
//   }
//
//   handleMouseLeave = () => {
//     if (timeout) clearTimeout(timeout)
//     if (state.active) let active = false
//     if (props.onMouseLeave) props.onMouseLeave()
//   }
//
//   handleClick = () => {
//     if (timeout) clearTimeout(timeout)
//     if (props.tooltipHideOnClick) let active = false
//     if (props.onClick) props.onClick()
//   }
//
//   render () {
//     const {children, className, tooltip, tooltipDelay, tooltipHideOnClick, ...other} = props
//     const composedClassName = ClassNames(style.root, className)
//     const tooltipClassName = ClassNames(style.tooltip, {
//       [style.active]: state.active
//     })
//
//     return (
//       <ComposedComponent
//         {...other}
//         className={composedClassName}
//         onClick={handleClick}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {children ? children : null}
//         <span data-react-toolbox="tooltip" className={tooltipClassName}>{tooltip}</span>
//       </ComposedComponent>
//     )
//   }
//
//   .root {
//     position: `relative`,
//   }
//
//   .tooltip {
//     position: `absolute`,
//     top: percent(100),
//     left: percent(50),
//     zIndex: zIndexHigher,
//     display: `block`,
//     maxWidth: tooltipMaxWidth,
//     padding: tooltipPadding,
//     margin: tooltipMargin 0,
//     fontFamily: Roboto, sans-serif,
//     fontSize: tooltipFontSize,
//     font-weight: fontWeightBold,
//     lineHeight: fontSizeSmall,
//     color: tooltipColor,
//     textAlign: `center`,
//     textTransform: `none`,
//     background: tooltipBackground,
//     borderRadius: tooltipBorderRadius,
//     transition: animationCurveDefault tooltipAnimationDuration transform,
//     transform: scale(0) translateX(percent(-50)),
//     transform-origin: top left,
//     &.active {
//       transform: scale(1) translateX(percent(-50)),
//     }
//   }
// }