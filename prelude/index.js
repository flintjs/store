import units from './units'
import colors from './colors'
import effects from './effects'

export function palette() {
  return {
    units,
    colors,
    effects
  }
}

export function rgba(r: number | array, g: Num, b:? number, a:? Num) {
  if (Array.isArray(r)) {
    return [...r, g] // g = alpha
  }

  return [r, g, b, a]
}

export function rgb(r: number, g: number, b: number) {
  return [r, g, b]
}

// type N = number | float;

// TODO
export function cubicBezier(a: Num, b: Num, c: Num, d: Num) {
  return `cubic-bezier(${a}, ${b}, ${c}, ${d})`
}

export function translateY(percent: Num) {
  return { y: percent }
}