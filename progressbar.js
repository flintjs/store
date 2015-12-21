

view ProgressBar {
  prop buffer:? number
  prop className:? string
  prop max:? number
  prop min:? number
  prop mode:? string
  prop multicolor:? bool
  prop type:? string//oneOf(['linear', 'circular'])
  prop value: number

  static defaultProps = {
    buffer: 0,
    className: '',
    max: 100,
    min: 0,
    mode: 'indeterminate',
    multicolor: false,
    type: 'linear',
    value: 0
  }

  calculateRatio (value) {
    if (value < props.min) return 0
    if (value > props.max) return 1
    return (value - props.min) / (props.max - props.min)
  }

  circularStyle () {
    if (props.mode !== 'indeterminate') {
      return {strokeDasharray: `${2 * Math.PI * 25 * calculateRatio(props.value)}, 400`}
    }
  }

  linearStyle () {
    if (props.mode !== 'indeterminate') {
      return {
        buffer: prefixer({transform: `scaleX(${calculateRatio(props.buffer)})`}),
        value: prefixer({transform: `scaleX(${calculateRatio(props.value)})`})
      }
    } else {
      return {}
    }
  }

  renderCircular () {
    return (
      <svg className={style.circle}>
        <circle className={style.path} style={circularStyle()} cx='30' cy='30' r='25' />
      </svg>
    )
  }

  renderLinear () {
    const {buffer, value} = linearStyle()
    return (
      <div>
        <span ref='buffer' data-ref='buffer' className={style.buffer} style={buffer}></span>
        <span ref='value' data-ref='value' className={style.value} style={value}></span>
      </div>
    )
  }

  render () {
    const className = ClassNames(style[props.type], {
      [style[props.mode]]: props.mode,
      [style.multicolor]: props.multicolor
    }, props.className)

    return (
      <div
        data-react-toolbox='progress-bar'
        aria-valuenow={props.value}
        aria-valuemin={props.min}
        aria-valuemax={props.max}
        className={className}
      >
        {props.type === 'circular' ? renderCircular() : renderLinear()}
      </div>
    )
  }
}

