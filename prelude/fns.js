export function rgba(r: number | array, g: Num, b:? number, a:? Num) {
  if (Array.isArray(r)) {
    return [...r, g] // g = alpha
  }

  return [r, g, b, a]
}

export function rgb(r: number, g: number, b: number) {
  return [r, g, b]
}

// type N = number | float

// TODO
export function cubicBezier(a: Num, b: Num, c: Num, d: Num) {
  return `cubic-bezier(${a}, ${b}, ${c}, ${d})`
}

export let translateX = (x: Num) => ({ x })
export let translateY = (y: Num) => ({ y })
export let translateZ = (z: Num) => ({ z })
export let scale = (scale: Num) => ({ scale })

export default {
  rgba,
  rgb,
  cubicBezier,
  translateY,
  translateX,
  translateZ,
  scale,

  calc(a: string) {
    return `calc(${a})`
  },

  angleFromPositions(cx, cy, ex, ey) {
    const theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2
    return theta * 180 / Math.PI
  },

  angle360FromPositions(cx, cy, ex, ey) {
    const angle = angleFromPositions(cx, cy, ex, ey)
    return angle < 0 ? 360 + angle : angle
  },

  range(start = 0, stop = null, step = 1) {
    let [_start, _stop] = [0, start]
    if (stop !== null) {
      [_start, _stop] = [start, stop]
    }
    const length = Math.max(Math.ceil((_stop - _start) / step), 0)
    const range = Array(length)

    for (let idx = 0; idx < length; idx++, _start += step) {
      range[idx] = _start
    }

    return range
  },

  round(number, decimals) {
    if (!isNaN(parseFloat(number)) && isFinite(number)) {
      const decimalPower = Math.pow(10, decimals)
      return Math.round(parseFloat(number) * decimalPower) / decimalPower
    }
    return NaN
  },

  getViewport () {
    return {
      height: window.innerHeight || document.documentElement.offsetHeight,
      width: window.innerWidth || document.documentElement.offsetWidth
    }
  },

  cloneObject (object) {
    return JSON.parse(JSON.stringify(object))
  },

  inputTypeForPrototype (prototype) {
    if (prototype === Date) return 'date'
    if (prototype === Number) return 'number'
    if (prototype === Boolean) return 'checkbox'
    return 'text'
  },

  prepareValueForInput (value, type) {
    if (type === 'date') return new Date(value).toISOString().slice(0, 10)
    if (type === 'checkbox') {
      return value ? 'on' : null
    }
    return value
  }
}