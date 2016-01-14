function unitCombinator(type) {
  return function (val) {
    return `${handleMath(val, type)}${type}`
  }
}

function handleMath(value, type) {
  return typeof value == 'string' ? eval(value.replace(type, '+')) : value
}

export default { unitCombinator }
