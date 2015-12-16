import { rgba, palette } from './prelude'

let styles

Flint.preload(() => {
  let { colors, units } = palette()

  styles = {
    neutralColor: colors.white,
    neutralColorContrast: colors.grey900,
    neutralColorHover: rgba(colors.grey900, 0.20),
    primaryColorContrast: colors.primaryContrast,
    primaryColorHover: rgba(colors.primary, 0.20),
    primaryColor: colors.primary,
    accentColorContrast: colors.primaryContrast,
    accentColorHover: rgba(colors.accent, 0.20),
    accentColor: colors.accent,
    disabledTextColor: rgba(colors.black, 0.26),
    disabledBackgroundColor: rgba(colors.black, 0.12),
    borderRadius: 0.2 * units.unit,
    floatingFontSize: units.unit * 2.4,
    floatingHeight: units.unit * 5.6,
    floatingMiniHeight: units.unit * 4,
    floatingMiniFontSize: this.floatingMiniHeight / 2.25,
    height: units.unit * 3.6,
    squaredIconMargin: units.unit * .6,
    squaredMinWidth: 9 * units.unit,
    squaredPadding: [0, units.unit * 1.2],
    toggleFontSize: units.unit * 2,
  }
})

view Button {

}