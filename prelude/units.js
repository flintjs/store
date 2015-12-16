import { rgba, cubicBezier } from '../prelude'

let units = {
  unit: '1rem',

  //  Fonts
  preferredFont: `"Roboto", "Helvetica", "Arial", sansSerif`,
  fontSize: 1.6 * unit,
  fontSizeTiny: 1.2 * unit,
  fontSizeSmall: 1.4 * unit,
  fontSizeNormal: fontSize,
  fontSizeBig: 1.8 * unit,
  fontWeightThin: 300,
  fontWeightNormal: 400,
  fontWeightSemiBold: 500,
  fontWeightBold: 700,

  // Shadows
  shadowKeyUmbraOpacity: 0.2,
  shadowKeyPenumbraOpacity: 0.14,
  shadowAmbientShadowOpacity: 0.12,

  // Depth Shadows
  zdepthShadow1: `0 1px 6px ${rgba(0,0,0,0.12)}, 0 1px 4px ${rgba(0,0,0,0.24)}`,
  zdepthShadow2: `0 3px 10px ${rgba(0,0,0,0.16)}, 0 3px 10px ${rgba(0,0,0,0.23)}`,
  zdepthShadow3: `0 10px 30px ${rgba(0,0,0,0.19)}, 0 6px 10px ${rgba(0,0,0,0.23)}`,
  zdepthShadow4: `0 14px 45px ${rgba(0,0,0,0.25)}, 0 10px 18px ${rgba(0,0,0,0.22)}`,
  zdepthShadow5: `0 19px 60px ${rgba(0,0,0,0.30)}, 0 15px 20px ${rgba(0,0,0,0.22)}`,

  // Animation
  animationDuration: `.35s`,
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

units.animationDelay = units.animationDuration / 5
units.animationCurveDefault = units.animationCurveFastOutSlowIn

export default units