import defaultTheme from './theme'

export default function (theme = defaultTheme) {
  const { preferredFont, unit } = theme

  function typoButton(colorContrast = false, userPreferred = true) {
    return {
      fontSize: unit(1.4),
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1,
      textTransform: 'uppercase',
      ...(colorContrast ? { opacity: .87 } : {}),
      ...(userPreferred ? { fontFamily: preferredFont } : {})
    }
  }

  return { typoButton }
}
