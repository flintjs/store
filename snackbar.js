// import { fns, palette } from './prelude'
//
// let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
// let { colors, units, effects } = palette()
// let { unit, percent, seconds } = units
//
// const styles = {
//   snackbarColorCancel: paletteRed500,
//   snackbarColorAccept: paletteGreen500,
//   snackbarColorWarning: paletteLimeA200,
//   snackbarBackgroundColor: colorText,
//   snackbarBorderRadius: .2 * $unit,
//   snackbarButtonOffset: 4.8 * $unit,
//   snackbarColor: colorWhite,
//   snackbarHorizontalOffset: 2.4 * $unit,
//   snackbarVerticalOffset: 1.4 * $unit,
// }
//
// view Snackbar {
//   prop label: string
//
//   prop action:? string
//   prop active:? bool
//   prop className:? string
//   prop icon:? string
//   prop onClick:? func
//   prop onTimeout:? func
//   prop timeout:? number
//   prop type: string
//
//   let componentDidUpdate = () => {
//     if (props.active && props.timeout) {
//       setTimeout(() => {
//         props.onTimeout()
//       }, props.timeout)
//     }
//   }
//
//   let render = () => {
//     const {action, active, icon, label, onClick, type } = props
//     const className = ClassNames([style.root, style[type]], {
//       [style.active]: active
//     }, props.className)
//
//     return (
//       <Overlay invisible>
//         <div data-react-toolbox='snackbar' className={className}>
//           {icon ? <FontIcon value={icon} className={style.icon} /> : null}
//           <span className={style.label}>{label}</span>
//           {action ? <Button className={style.button} label={action} onClick={onClick}/> : null}
//         </div>
//       </Overlay>
//     )
//   }
// }
//
// //
// // .root {
// //   position: fixed,
// //   right: snackbarHorizontalOffset,
// //   bottom: 0,
// //   left: snackbarHorizontalOffset,
// //   zIndex: zIndexHigher,
// //   display: flex,
// //   alignItems: `center`,
// //   padding: snackbarVerticalOffset snackbarHorizontalOffset,
// //   margin: 0 `auto`,
// //   marginTop: snackbarVerticalOffset,
// //   color: snackbarColor,
// //   backgroundColor: snackbarBackgroundColor,
// //   borderRadius: snackbarBorderRadius,
// //   transition: all animationDuration animationCurveDefault animationDuration,
// //   &.accept .button {
// //     color: snackbarColorAccept,
// //   }
// //   &.warning .button {
// //     color: snackbarColorWarning,
// //   }
// //   &.cancel .button {
// //     color: snackbarColorCancel,
// //   }
// //   &:not(.active) {
// //     transform: translateY(percent(100)),
// //   }
// //   &.active {
// //     transform: translateY(percent(0)),
// //   }
// // }
// //
// // .icon {
// //   marginRight: snackbarVerticalOffset,
// // }
// //
// // .label {
// //   flex-grow: 1,
// //   fontSize: fontSizeSmall,
// // }
// //
// // .button {
// //   minWidth: inherit,
// //   marginTop: - snackbarVerticalOffset / 2,
// //   marginRight: - snackbarHorizontalOffset / 2,
// //   marginBottom: - snackbarVerticalOffset / 2,
// //   marginLeft: snackbarButtonOffset,
// // }