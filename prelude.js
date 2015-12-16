export function pallete() {
  return {
    unit: 1,
    color: {
      white: '#fff'
    }
  }
}

export function rgba(r: number, g: number, b: number, a: number | float) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}