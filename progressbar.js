

view ProgressBar {
  prop buffer:? number
  prop className:? string
  prop max:? number
  prop min:? number
  prop mode:? string
  prop multicolor:? bool
  prop type:? oneOf(['linear', 'circular'])
  prop value: React.PropTypes.number

  static defaultProps = {
    buffer: 0,
    className: '',
    max: 100,
    min: 0,
    mode: 'indeterminate',
    multicolor: false,
    type: 'linear',
    value: 0
  };

  calculateRatio (value) {
    if (value < this.props.min) return 0;
    if (value > this.props.max) return 1;
    return (value - this.props.min) / (this.props.max - this.props.min);
  }

  circularStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`};
    }
  }

  linearStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {
        buffer: prefixer({transform: `scaleX(${this.calculateRatio(this.props.buffer)})`}),
        value: prefixer({transform: `scaleX(${this.calculateRatio(this.props.value)})`})
      };
    } else {
      return {};
    }
  }

  renderCircular () {
    return (
      <svg className={style.circle}>
        <circle className={style.path} style={this.circularStyle()} cx='30' cy='30' r='25' />
      </svg>
    );
  }

  renderLinear () {
    const {buffer, value} = this.linearStyle();
    return (
      <div>
        <span ref='buffer' data-ref='buffer' className={style.buffer} style={buffer}></span>
        <span ref='value' data-ref='value' className={style.value} style={value}></span>
      </div>
    );
  }

  render () {
    const className = ClassNames(style[this.props.type], {
      [style[this.props.mode]]: this.props.mode,
      [style.multicolor]: this.props.multicolor
    }, this.props.className);

    return (
      <div
        data-react-toolbox='progress-bar'
        aria-valuenow={this.props.value}
        aria-valuemin={this.props.min}
        aria-valuemax={this.props.max}
        className={className}
      >
        {this.props.type === 'circular' ? this.renderCircular() : this.renderLinear()}
      </div>
    );
  }
}

