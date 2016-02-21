import units from './units'
import colors from './colors'
import effects from './effects'
import type from './type'
import _fns from './fns'

export events from './events'

export function palette() {
  return {
    units,
    colors,
    effects,
    type
  }
}

export const fns = _fns
