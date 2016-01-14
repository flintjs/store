import { unitCombinator } from './helpers'
const unit = unitCombinator('rem')

export default {
  animations: {
    duration: .35,
    curveFastOutSlowIn: `cubic-bezier(0.4, 0, 0.2, 1)`,
    curveLinearOutSlowIn: `cubic-bezier(0, 0, 0.2, 1)`,
    curveFastOutLinearIn: `cubic-bezier(0.4, 0, 1, 1)`
  },

  Button: {
    height: unit(3.6)
  },

  preferredFont: `"Roboto", "Helvetica", "Arial", sansSerif`,

  shadows: {
    keyUmbraOpacity: `0.2`,
    keyPenumbraOpacity: `0.14`,
    ambientShadowOpacity: `0.12`
  },

  unit: unit
}
