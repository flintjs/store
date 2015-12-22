const styles = {
  progressHeight: unit(.4),
  progressMainColor: colorPrimary,
  progressSecondaryColor: rgba(colorPrimaryContrast, 0.7),
  circleWrapperWidth: 60,
  circleRadius: 25,
  scaleRatio: circleRadius / 20,
}

view ProgressBar {
  prop buffer:? number = 0
  prop className:? string
  prop max:? number = 100
  prop min:? number = 0
  prop mode:? string = 'indeterminate'
  prop multicolor:? bool = false
  prop type:? string = 'linear'//oneOf(['linear', 'circular'])
  prop value: number = 0

  let calculateRatio = (value) => {
    if (value < min) return 0
    if (value > max) return 1
    return (value - min) / (max - min)
  }

  let circularStyle = () => {
    if (mode !== 'indeterminate') {
      return { strokeDasharray: `${2 * Math.PI * 25 * calculateRatio(value)}, 400` }
    }
  }

  <progressbar
    class={{ mode, multicolor }}
    aria-valuenow={value}
    aria-valuemin={min}
    aria-valuemax={max}
    className={className}
  >
    <svg if={type == 'circular'} className={style.circle}>
      <circle className={style.path} style={circularStyle()} cx='30' cy='30' r='25' />
    </svg>
    <linear if={type != 'circular'}>
      <span ref='buffer' data-ref='buffer' style={mode !== 'indeterminate' && {transform: `scaleX(${calculateRatio(buffer)})`}}></span>
      <span ref='value' data-ref='value' style={mode !== 'indeterminate' && {transform: `scaleX(${calculateRatio(value)})`}}></span>
    </linear>
  </progressbar>
}

//
// .linear {
//   position: `relative`,
//   display: `inline-block`,
//   width: percent(100),
//   height: progressHeight,
//   overflow: `hidden`,
//   background: colorDivider,
//   &.indeterminate .value {
//     transform-origin: center `center`,
//     animation: `linear-indeterminate-bar seconds(1) linear infinite`,
//   }
// }
//
// .value, .buffer {
//   position: `absolute`,
//   top: 0,
//   right: 0,
//   bottom: 0,
//   left: 0,
//   transitionTimingFunction: animationCurveDefault,
//   transitionDuration: animationDuration,
//   transform: scaleX(0),
//   transform-origin: left `center`,
// }
//
// .value {
//   backgroundColor: progressMainColor,
// }
//
// .buffer {
//   backgroundImage: linear-gradient(to right, progressSecondaryColor, progressSecondaryColor),
//   linear-gradient(to right, progressMainColor, progressMainColor),
// }
//
// .circular {
//   position: `relative`,
//   display: `inline-block`,
//   width: circleWrapperWidth * 1,
//   height: circleWrapperWidth * 1,
//   transform: rotate(degrees(-90)),
//   &.indeterminate {
//     .circle {
//       animation: `circular-indeterminate-bar-rotate seconds(2) linear infinite`,
//     }
//     .path {
//       animation: `circular-indeterminate-bar-dash 1seconds(.5) ease-in-out infinite`,
//
//       stroke-dasharray: scaleRatio * 1, scaleRatio * 200,
//       stroke-dashoffset: 0,
//     }
//     &.multicolor .path {
//       animation: `circular-indeterminate-bar-dash 1seconds(.5) ease-in-out infinite`,
//       colors (1seconds(.5) * 4) ease-in-out infinite,
//     }
//   }
// }
//
// .circle {
//   width: percent(100),
//   height: percent(100),
// }
//
// .path {
//   transition: stroke-dasharray animationDuration animationCurveDefault,
//   fill: `none`,
//
//   stroke-dasharray: 0, scaleRatio * 200,
//   stroke-dashoffset: 0,
//   stroke-linecap: round,
//   stroke-miterlimit: 20,
//   stroke-width: 4,
//   stroke: progressMainColor,
// }
//
// @keyframes linear-indeterminate-bar {
//   percent(0) {
//     transform: translate(percent(-50)) scaleX(0),
//   }
//
//   percent(50) {
//     transform: translate(percent(-0)) scaleX(.3),
//   }
//
//   percent(100) {
//     transform: translate(percent(50)) scaleX(0),
//   }
// }
//
// @keyframes circular-indeterminate-bar-rotate {
//   percent(100) {
//     transform: rotate(degrees(360)),
//   }
// }
//
// @keyframes circular-indeterminate-bar-dash {
//   percent(0) {
//     stroke-dasharray: scaleRatio * 1, scaleRatio * 200,
//     stroke-dashoffset: scaleRatio * 0,
//   }
//
//   percent(50) {
//     stroke-dasharray: scaleRatio * 89, scaleRatio * 200,
//     stroke-dashoffset: scaleRatio * -35,
//   }
//
//   percent(100) {
//     stroke-dasharray: scaleRatio * 89, scaleRatio * 200,
//     stroke-dashoffset: scaleRatio * -124,
//   }
// }
//
// @keyframes colors {
//   percent(0) {
//     stroke: #4285f4,
//   }
//
//   percent(25) {
//     stroke: #de3e35,
//   }
//
//   percent(50) {
//     stroke: #f7c223,
//   }
//
//   percent(75) {
//     stroke: #1b9a59,
//   }
//
//   percent(100) {
//     stroke: #4285f4,
//   }
// }