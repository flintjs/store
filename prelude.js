import units from './units'
import colors from './colors'

export function pallete() {
  return {
    units,
    colors
  }
}

export function rgba(r: number, g: number, b: number, a: number | float) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function rgb(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`
}

// TODO
export function cubicBezier() {
  return ``
}