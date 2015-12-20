import { rgba, cubicBezier } from './index'

let unit = n => `${n}rem`
let vw = x => `${x}vw`
let vh = x => `${x}vh`

let fontSize = 1.6 * unit
let ad = .35

let units = {
  unit,
  vw,
  vh,

  //  Fonts
  preferredFont: `"Roboto", "Helvetica", "Arial", sansSerif`,
  fontSize,
  fontSizeTiny: unit(1.2),
  fontSizeSmall: unit(1.4),
  fontSizeNormal: fontSize,
  fontSizeBig: unit(1.8),
  fontWeightThin: 300,
  fontWeightNormal: 400,
  fontWeightSemiBold: 500,
  fontWeightBold: 700,

  // Shadows
  shadowKeyUmbraOpacity: 0.2,
  shadowKeyPenumbraOpacity: 0.14,
  shadowAmbientShadowOpacity: 0.12,

  // Depth Shadows
  zdepthShadow1: `0 1px 6px rgba(${rgba(0,0,0,0.12)}), 0 1px 4px rgba(${rgba(0,0,0,0.24)})`,
  zdepthShadow2: `0 3px 10px rgba(${rgba(0,0,0,0.16)}), 0 3px 10px rgba(${rgba(0,0,0,0.23)})`,
  zdepthShadow3: `0 10px 30px rgba(${rgba(0,0,0,0.19)}), 0 6px 10px rgba(${rgba(0,0,0,0.23)})`,
  zdepthShadow4: `0 14px 45px rgba(${rgba(0,0,0,0.25)}), 0 10px 18px rgba(${rgba(0,0,0,0.22)})`,
  zdepthShadow5: `0 19px 60px rgba(${rgba(0,0,0,0.30)}), 0 15px 20px rgba(${rgba(0,0,0,0.22)})`,

  // Animation
  animationDuration: `${ad}s`,
  animationCurveFastOutSlowIn: cubicBezier(0.4, 0, 0.2, 1),
  animationCurveLinearOutSlowIn: cubicBezier(0, 0, 0.2, 1),
  animationCurveFastOutLinearIn: cubicBezier(0.4, 0, 1, 1),

  // Indexes
  zIndexHighest: 300,
  zIndexHigher: 200,
  zIndexHigh: 100,
  zIndexNormal: 1,
  zIndexLow: 100,
  zIndexLower: 200,
}

units.animationDelay = ad / 5
units.animationCurveDefault = units.animationCurveFastOutSlowIn

export default units