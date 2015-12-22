// import { fns, palette } from './prelude'
//
// let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
// let { colors, units, effects } = palette()
// let { unit, percent, seconds } = units
//
// const styles = {
//   switchColor: colorPrimary,
//   switchTextColor: colorBlack,
//   switchThumbOffColor: paletteGrey-50,
//   switchTrackOnColor: rgba(colorPrimary, 0.5),
//   switchTrackOffColor: rgba(colorBlack, 0.26),
//   switchOffRippleColor: rgba(colorBlack, 0.4),
//   switchOnFocusColor: rgba(colorPrimary, 0.26),
//   switchOffFocusColor: rgba(colorBlack, 0.1),
//   switchDisabledThumbColor: paletteGrey-400,
//   switchDisabledTrackColor: rgba(colorBlack, 0.12),
//   switchDisabledTextColor: rgba(colorBlack, 0.26),
//   switchTotalHeight: 2.4 * $unit,
//   switchTrackLength: 3.6 * $unit,
//   switchTrackHeight: 1.4 * $unit,
//   switchThumbSize: 2 * $unit,
//   switchThumbOnColor: switchColor,
//   switchFocusInitSize: .8 * $unit,
//   switchFocusSize: switchTotalHeight * 2,
//   switchFocusDiff: (switchFocusSize - switchFocusInitSize) / 2,
//   switchRippleDuration: milliseconds(650),
//   switchFontSize: fontSizeSmall,
//   switchFieldMarginBottom: 1.5 * $unit,
// }
//
// view Switch {
//   prop checked:? bool = false
//   prop className:? string
//   prop disabled:? bool = false
//   prop label:? string
//   prop name:? string
//   prop onBlur:? func
//   prop onChange:? func
//   prop onFocus: func
//
//   let handleToggle = (event) => {
//     if (event.pageX !== 0 && event.pageY !== 0) blur()
//     if (!props.disabled && props.onChange) {
//       props.onChange(!props.checked, event)
//     }
//   }
//
//   let blur = () => {
//     view.refs.input.blur()
//   }
//
//   let focus = () => {
//     view.refs.input.focus()
//   }
//
//   let render = () => {
//     let className = style[props.disabled ? 'disabled' : 'field']
//     const switchClassName = style[props.checked ? 'on' : 'off']
//     const { onChange, ...others } = props
//     if (props.className) className += ` ${props.className}`
//
//     return (
//       <label data-react-toolbox='checkbox' className={className}>
//         <input
//           {...others}
//           checked={props.checked}
//           className={style.input}
//           onClick={handleToggle}
//           readOnly
//           ref='input'
//           type='checkbox'
//         />
//         <span role='switch' className={switchClassName}>
//           <Thumb disabled={props.disabled} />
//         </span>
//         {props.label ? <span className={style.text}>{props.label}</span> : null}
//       </label>
//     )
//   }
// }
//
// // .field {
// //   position: `relative`,
// //   display: `block`,
// //   height: switchTotalHeight,
// //   marginBottom: switchFieldMarginBottom,
// //   whiteSpace: `nowrap`,
// //   verticalAlign: middle,
// // }
// //
// // .text {
// //   display: `inline-block`,
// //   paddingLeft: $unit,
// //   fontSize: switchFontSize,
// //   lineHeight: switchTotalHeight,
// //   color: switchTextColor,
// //   whiteSpace: `nowrap`,
// //   verticalAlign: `top`,
// // }
// //
// // %switch {
// //   position: `relative`,
// //   display: `inline-block`,
// //   width: switchTrackLength,
// //   height: switchTrackHeight,
// //   marginTop: (switchTotalHeight - switchTrackHeight) / 2,
// //   verticalAlign: `top`,
// //   cursor: `pointer`,
// //   borderRadius: switchTrackHeight,
// // }
// //
// // .thumb {
// //   @include material-animation-default(seconds(.28)),
// //   position: `absolute`,
// //   top: (switchTrackHeight - switchThumbSize) / 2,
// //   width: switchThumbSize,
// //   height: switchThumbSize,
// //   cursor: `pointer`,
// //   borderRadius: percent(50),
// //   transitionProperty: left,
// // }
// //
// // .ripple {
// //   backgroundColor: switchColor,
// //   opacity: .3,
// //   transitionDuration: switchRippleDuration,
// // }
// //
// // .on {
// //   @extend %switch,
// //   background: switchTrackOnColor,
// //   .thumb {
// //     @include shadow-3dp(),
// //     left: switchTrackLength - switchThumbSize,
// //     background: switchThumbOnColor,
// //   }
// // }
// //
// // .off {
// //   @extend %switch,
// //   background: switchTrackOffColor,
// //   .thumb {
// //     @include shadow-2dp(),
// //     left: 0,
// //     background: switchThumbOffColor,
// //   }
// //   .ripple {
// //     background: switchOffRippleColor,
// //   }
// // }
// //
// // %thumb-focus {
// //   position: `absolute`,
// //   top: percent(50),
// //   left: percent(50),
// //   box-sizing: borderBox,
// //   display: `inline-block`,
// //   width: switchFocusInitSize,
// //   height: switchFocusInitSize,
// //   content: "",
// //   backgroundColor: `transparent`,
// //   borderRadius: percent(50),
// //   transform: translate(- switchFocusInitSize / 2, - switchFocusInitSize / 2),
// // }
// //
// // .input {
// //   width: 0,
// //   height: 0,
// //   overflow: `hidden`,
// //   opacity: 0,
// //   &:focus:not(:active) {
// //     + .switch-on > .thumb:before {
// //       @extend %thumb-focus,
// //       backgroundColor: switchOnFocusColor,
// //       boxShadow: 0 0 0 switchFocusDiff switchOnFocusColor,
// //     }
// //     + .switch-off > .thumb:before {
// //       @extend %thumb-focus,
// //       backgroundColor: switchOffFocusColor,
// //       boxShadow: 0 0 0 switchFocusDiff switchOffFocusColor,
// //     }
// //   }
// // }
// //
// // .disabled {
// //   @extend .field,
// //   .text {
// //     color: switchDisabledTextColor,
// //   }
// //   .on, .off {
// //     cursor: `auto`,
// //     background: switchDisabledTrackColor,
// //   }
// //   .thumb {
// //     cursor: `auto`,
// //     backgroundColor: switchDisabledThumbColor,
// //     borderColor: `transparent`,
// //   }
// // }