import units from './units'
import colors from './colors'
import effects from './effects'
import _fns from './fns'

export const getMousePosition = ({ pageX, pageY }) => ({ x: pageX, y: pageY })
export const getTouchPosition = ({ touches: { pageX, pageY } }) => ({ x: pageX, y: pageY })

export function palette() {
  return {
    units,
    colors,
    effects
  }
}

export const fns = _fns