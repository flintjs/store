import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { unit, percent, seconds } = units

view Title {
  prop children:? any
  prop tag:? string

  <title tagName={tag}>
    {children}
  </title>

  $ = {
    fontSize: `2rem`,
    fontWeight: 500,
    lineHeight: unit(1),
    letterSpacing: `.02em`,
  }
}
