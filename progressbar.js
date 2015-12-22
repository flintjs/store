view ProgressBar {
  prop buffer:? number = 0
  prop className:? string
  prop max:? number = 100
  prop min:? number = 0
  prop mode:? string = 'indeterminate'
  prop multicolor:? bool = false
  prop type:? string = 'linear'//oneOf(['linear', 'circular'])
  prop value: number = 0

  let calculateRatio = (value) => {
    if (value < min) return 0
    if (value > max) return 1
    return (value - min) / (max - min)
  }

  let circularStyle = () => {
    if (mode !== 'indeterminate') {
      return { strokeDasharray: `${2 * Math.PI * 25 * calculateRatio(value)}, 400` }
    }
  }

  <progressbar
    class={{ mode, multicolor }}
    aria-valuenow={value}
    aria-valuemin={min}
    aria-valuemax={max}
    className={className}
  >
    <svg if={type == 'circular'} className={style.circle}>
      <circle className={style.path} style={circularStyle()} cx='30' cy='30' r='25' />
    </svg>
    <linear if={type != 'circular'}>
      <span ref='buffer' data-ref='buffer' style={mode !== 'indeterminate' && {transform: `scaleX(${calculateRatio(buffer)})`}}></span>
      <span ref='value' data-ref='value' style={mode !== 'indeterminate' && {transform: `scaleX(${calculateRatio(value)})`}}></span>
    </linear>
  </progressbar>
}

