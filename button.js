import { rgba, palette } from './prelude'

let styles

Flint.preload(() => {
  let { color, unit } = palette()

  styles = {
    neutralColor: color.white,
    neutralColorContrast: color.grey900,
    neutralColorHover: rgba(color.grey900, 0.20),
    primaryColorContrast: color.primaryContrast,
    primaryColorHover: rgba(color.primary, 0.20),
    primaryColor: color.primary,
    accentColorContrast: color.primaryContrast,
    accentColorHover: rgba(color.accent, 0.20),
    accentColor: color.accent,
    disabledTextColor: rgba(color.black, 0.26),
    disabledBackgroundColor: rgba(color.black, 0.12),
    borderRadius: 0.2 * unit,
    floatingFontSize: unit * 2.4,
    floatingHeight: unit * 5.6,
    floatingMiniHeight: unit * 4,
    floatingMiniFontSize: this.floatingMiniHeight / 2.25,
    height: unit * 3.6,
    squaredIconMargin: unit * .6,
    squaredMinWidth: 9 * unit,
    squaredPadding: [0, unit * 1.2],
    toggleFontSize: unit * 2,
  }
})

view Button {

}