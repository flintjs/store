// 
// rippleDuration: milliseconds(800) !default,
// rippleFinalOpacity: .3 !default,
// rippleSize: 15 * $unit !default,
// @import "../base",
// @import "./config",
//
// %ripple {
//   position: `absolute`,
//   top: percent(50),
//   left: percent(50),
//   zIndex: zIndexHigh,
//   pointerEvents: `none`,
//   backgroundColor: currentColor,
//   borderRadius: percent(50),
//   transform-origin: percent(50) percent(50),
// }
//
// .wrapper {
//   position: `absolute`,
//   top: 0,
//   right: 0,
//   bottom: 0,
//   left: 0,
//   zIndex: zIndexNormal,
//   pointerEvents: `none`,
// }
//
// .normal {
//   @extend %ripple,
//   transitionDuration: rippleDuration,
//   &.restarting {
//     opacity: rippleFinalOpacity,
//     transitionProperty: `none`,
//   }
//   &.active {
//     opacity: rippleFinalOpacity,
//     transitionProperty: transform,
//   }
//   &:not(.active):not(.restarting) {
//     opacity: 0,
//     transitionProperty: opacity, transform,
//   }
// }