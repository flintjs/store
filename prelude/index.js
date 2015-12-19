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

export function rgba(r: number, g: number, b: number, a: number | float) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function rgb(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`
}

// type N = number | float;

// TODO
export function cubicBezier(a: N, b: N, c: N, d: N) {
  return `cubic-bezier(${a}, ${b}, ${c}, ${d})`
}

export function translateY(percent: N) {
  return { translateY: percent }
}