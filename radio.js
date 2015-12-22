// import { fns, palette } from './prelude'
//
// let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
// let { colors, units, effects } = palette()
// let { unit, percent, seconds } = units
//
// const styles = {
//   radioFieldMarginBottom: unit(1.5),
//   radioButtonSize: unit(1.6),
//   radioInnerMargin: radioButtonSize / 4,
//   radioInnerColor: colors.primary,
//   radioFocusColor: rgba(colors.black, 0.1),
//   radioCheckedFocusColor: rgba(colors.primary, 0.26),
//   radioTextColor: colors.black,
//   radioDisabledColor: rgba(colors.black, 0.26),
//   radioTextFontSize: unit(1.4),
// }
//
// const Radio = ({checked, children, onMouseDown}) => {
//   const className = style[checked ? 'radio-checked' : 'radio']
//   return <div data-role='radio' onMouseDown={onMouseDown} className={className}>{children}</div>
// }
// //   className: style.ripple,
// //   spread: 2.6,
// //   centered: true
// // })(Radio)
//
//
//
// view RadioButton {
//   prop checked:? bool = false
//   prop className:? string
//   prop disabled:? bool = false
//   prop label:? string
//   prop name:? string
//   prop onBlur:? func
//   prop onChange:? func
//   prop onFocus:? func
//   prop value: any
//
//   let handleClick = (event) => {
//     const {checked, disabled, onChange} = props
//     if (event.pageX !== 0 && event.pageY !== 0) blur()
//     if (!disabled && !checked && onChange) onChange(event)
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
//     const className = ClassNames(style[props.disabled ? 'disabled' : 'field'], props.className)
//     const { onChange, ...others } = props
//
//     return (
//       <label className={className}>
//         <input
//           {...others}
//           className={style.input}
//           onClick={handleClick}
//           readOnly
//           ref='input'
//           type='radio'
//         />
//         <Radio checked={props.checked} disabled={props.disabled}/>
//         {props.label ? <span className={style.text}>{props.label}</span> : null}
//       </label>
//     )
//   }
// }
//
//
//
// view RadioGroup {
//   prop children:? node
//   prop disabled:? bool = false
//   prop name:? string
//   prop onChange:? func
//   prop value: any
//
//   let handleChange = (value) => {
//     if (props.onChange) props.onChange(value)
//   }
//
//   let renderRadioButtons = () => {
//     return React.Children.map(props.children, (radio, idx) => {
//       return (
//         <RadioButton
//           {...radio.props}
//           checked={radio.props.value === props.value}
//           disabled={props.disabled || radio.props.disabled}
//           key={idx}
//           label={radio.props.label}
//           onChange={handleChange.bind( radio.props.value)}
//           value={radio.props.value}
//         />
//       )
//     })
//   }
//
//   let render = () => {
//     return (
//       <div className={props.className}>
//         {renderRadioButtons()}
//       </div>
//     )
//   }
// }
//
// //
// // .field {
// //   position: `relative`,
// //   display: `block`,
// //   height: radioButtonSize,
// //   marginBottom: radioFieldMarginBottom,
// //   whiteSpace: `nowrap`,
// //   verticalAlign: middle,
// // }
// //
// // .text {
// //   display: `inline-block`,
// //   paddingLeft: $unit,
// //   fontSize: radioTextFontSize,
// //   lineHeight: radioButtonSize,
// //   color: radioTextColor,
// //   whiteSpace: `nowrap`,
// //   verticalAlign: `top`,
// // }
// //
// // .input {
// //   position: `absolute`,
// //   width: 0,
// //   height: 0,
// //   padding: 0,
// //   margin: 0,
// //   border: 0,
// //   opacity: 0,
// //   appearance: `none`,
// //   &:focus ~ .radio {
// //     boxShadow: 0 0 0 $unit radioFocusColor,
// //   }
// //   &:focus ~ .radio-checked {
// //     boxShadow: 0 0 0 $unit radioCheckedFocusColor,
// //   }
// // }
// //
// // .radio {
// //   position: `relative`,
// //   display: `inline-block`,
// //   width: radioButtonSize,
// //   height: radioButtonSize,
// //   verticalAlign: `top`,
// //   cursor: `pointer`,
// //   border: .2 * $unit solid radioTextColor,
// //   borderRadius: percent(50),
// //   &:before {
// //     @include material-animation-default(),
// //     position: `absolute`,
// //     top: radioInnerMargin - .2)unit,
// //     left: radioInnerMargin - .2)unit,
// //     width: radioButtonSize - radioInnerMargin * 2,
// //     height: radioButtonSize - radioInnerMargin * 2,
// //     content: "",
// //     backgroundColor: radioInnerColor,
// //     borderRadius: percent(50),
// //     transitionProperty: transform,
// //     transform: scale(0),
// //   }
// // }
// //
// // .radio-checked {
// //   @extend .radio,
// //   border: .2 * $unit solid radioInnerColor,
// //   &:before {
// //     transform: scale(1),
// //   }
// // }
// //
// // .ripple {
// //   backgroundColor: radioInnerColor,
// //   opacity: .3,
// //   transitionDuration: milliseconds(650),
// // }
// //
// // .disabled {
// //   @extend .field,
// //   .text {
// //     color: radioDisabledColor,
// //   }
// //   .radio {
// //     cursor: `auto`,
// //     borderColor: radioDisabledColor,
// //   }
// //   .radio-checked {
// //     cursor: `auto`,
// //     borderColor: radioDisabledColor,
// //     &:before {
// //       backgroundColor: radioDisabledColor,
// //     }
// //   }
// // }