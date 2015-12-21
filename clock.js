

view Clock {
  prop className:? string
  prop display:? oneOf(['hours', 'minutes'])
  prop format:? oneOf(['24hr', 'ampm'])
  prop onChange:? func
  prop onHandMoved:? func
  prop time: React.PropTypes.object

  static defaultProps = {
    className: '',
    display: 'hours',
    format: '24hr',
    time: new Date()
  };

  state = {
    center: {x: null, y: null},
    radius: 0
  };

  componentDidMount () {
    window.addEventListener('resize', this.handleCalculateShape);
    this.handleCalculateShape();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleCalculateShape);
  }

  handleHourChange = (hours) => {
    if (this.props.time.getHours() !== hours) {
      this.props.onChange(time.setHours(this.props.time, this.adaptHourToFormat(hours)));
    }
  };

  handleMinuteChange = (minutes) => {
    if (this.props.time.getMinutes() !== minutes) {
      this.props.onChange(time.setMinutes(this.props.time, minutes));
    }
  };

  handleCalculateShape = () => {
    const { top, left, width } = this.refs.placeholder.getBoundingClientRect();
    this.setState({
      center: { x: left + width / 2, y: top + width / 2 },
      radius: width / 2
    });
  };

  adaptHourToFormat (hour) {
    if (this.props.format === 'ampm') {
      if (time.getTimeMode(this.props.time) === 'pm') {
        return hour < 12 ? hour + 12 : hour;
      } else {
        return hour === 12 ? 0 : hour;
      }
    } else {
      return hour;
    }
  }

  renderHours () {
    return (
      <Hours
        center={this.state.center}
        format={this.props.format}
        onChange={this.handleHourChange}
        radius={this.state.radius}
        selected={this.props.time.getHours()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved}
      />
    );
  }

  renderMinutes () {
    return (
      <Minutes
        center={this.state.center}
        onChange={this.handleMinuteChange}
        radius={this.state.radius}
        selected={this.props.time.getMinutes()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved}
      />
    );
  }

  render () {
    const animation = this.props.display === 'hours' ? ZoomOut : ZoomIn;
    return (
      <div data-react-toolbox='clock' className={style.root}>
        <div ref='placeholder' className={style.placeholder} style={{height: this.state.radius * 2}}>
          <CssTransitionGroup transitionName={animation} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div key={this.props.display} className={style.wrapper} style={{height: this.state.radius * 2}}>
              {this.props.display === 'hours' ? this.renderHours() : null}
              {this.props.display === 'minutes' ? this.renderMinutes() : null}
            </div>
          </CssTransitionGroup>
        </div>
      </div>
    );
  }
}



view Face {
  prop active:? number
  prop numbers:? array
  prop radius:? number
  prop spacing:? number
  prop twoDigits: React.PropTypes.bool

  static defaultProps = {
    active: null,
    numbers: [],
    radius: 0,
    twoDigits: false
  };

  numberStyle (rad, num) {
    return {
      position: 'absolute',
      left: (rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing),
      top: (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing)
    };
  }

  faceStyle () {
    return {
      height: this.props.radius * 2,
      width: this.props.radius * 2
    };
  }

  renderNumber (number, idx) {
    let className = style.number;
    if (number === this.props.active) className += ` ${style.active}`;
    return (
      <span
        className={className}
        style={this.numberStyle(this.props.radius - this.props.spacing, idx + 1)}
        key={number}
      >
        {this.props.twoDigits ? ('0' + number).slice(-2) : number}
      </span>
    );
  }

  render () {
    return (
      <div
        ref='root'
        className={style.face}
        onTouchStart={this.props.onTouchStart}
        onMouseDown={this.props.onMouseDown}
        style={this.faceStyle()}
      >
        {this.props.numbers.map(this.renderNumber.bind(this))}
      </div>
    );
  }
}



view Hand {
  prop angle:? number
  prop className:? string
  prop length:? number
  prop onMove:? func
  prop onMoved:? func
  prop origin:? object
  prop step: React.PropTypes.number

  static defaultProps = {
    className: '',
    angle: 0,
    length: 0,
    origin: {}
  };

  state = {
    knobWidth: 0
  };

  componentDidMount () {
    this.setState({knobWidth: this.refs.knob.offsetWidth});
  }

  getMouseEventMap () {
    return {
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp
    };
  }

  getTouchEventMap () {
    return {
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd
    };
  }

  handleMouseMove = (event) => {
    this.move(events.getMousePosition(event));
  };

  handleTouchMove = (event) => {
    this.move(events.getTouchPosition(event));
  };

  handleMouseUp = () => {
    this.end(this.getMouseEventMap());
  };

  handleTouchEnd = () => {
    this.end(this.getTouchEventMap());
  };

  mouseStart (event) {
    events.addEventsToDocument(this.getMouseEventMap());
    this.move(events.getMousePosition(event));
  }

  touchStart (event) {
    events.addEventsToDocument(this.getTouchEventMap());
    this.move(events.getTouchPosition(event));
    events.pauseEvent(event);
  }

  getPositionRadius (position) {
    const x = this.props.origin.x - position.x;
    const y = this.props.origin.y - position.y;
    return Math.sqrt(x * x + y * y);
  }

  trimAngleToValue (angle) {
    return this.props.step * Math.round(angle / this.props.step);
  }

  positionToAngle (position) {
    return utils.angle360FromPositions(this.props.origin.x, this.props.origin.y, position.x, position.y);
  }

  end (evts) {
    if (this.props.onMoved) this.props.onMoved();
    events.removeEventsFromDocument(evts);
  }

  move (position) {
    const degrees = this.trimAngleToValue(this.positionToAngle(position));
    const radius = this.getPositionRadius(position);
    if (this.props.onMove) this.props.onMove(degrees === 360 ? 0 : degrees, radius);
  }

  render () {
    const className = `${style.hand} ${this.props.className}`;
    const handStyle = prefixer({
      height: this.props.length - this.state.knobWidth / 2,
      transform: `rotate(${this.props.angle}deg)`
    });

    return (
      <div className={className} style={handStyle}>
        <div ref='knob' className={style.knob}></div>
      </div>
    );
  }
}



const outerNumbers = [0, ...utils.range(13, 24)];
const innerNumbers = [12, ...utils.range(1, 12)];
const innerSpacing = 1.7;
const step = 360 / 12;

view Hours {
  prop center:? object
  prop format:? oneOf(['24hr', 'ampm'])
  prop onChange:? func
  prop onHandMoved:? func
  prop radius:? number
  prop selected:? number
  prop spacing: React.PropTypes.number

  state = {
    inner: this.props.format === '24hr' && this.props.selected > 0 && this.props.selected <= 12
  };

  handleHandMove = (degrees, radius) => {
    const currentInner = radius < this.props.radius - this.props.spacing * innerSpacing;
    if (this.props.format === '24hr' && this.state.inner !== currentInner) {
      this.setState({inner: currentInner}, () => {
        this.props.onChange(this.valueFromDegrees(degrees));
      });
    } else {
      this.props.onChange(this.valueFromDegrees(degrees));
    }
  };

  handleMouseDown = (event) => {
    this.refs.hand.mouseStart(event);
  };

  handleTouchStart = (event) => {
    this.refs.hand.touchStart(event);
  };

  valueFromDegrees (degrees) {
    if (this.props.format === 'ampm' || this.props.format === '24hr' && this.state.inner) {
      return innerNumbers[degrees / step];
    } else {
      return outerNumbers[degrees / step];
    }
  }

  renderInnerFace (innerRadius) {
    if (this.props.format === '24hr') {
      return (
        <Face
          onTouchStart={this.handleTouchStart}
          onMouseDown={this.handleMouseDown}
          numbers={innerNumbers}
          spacing={this.props.spacing}
          radius={innerRadius}
          active={this.props.selected}
        />
      );
    }
  }

  render () {
    const { format, selected, radius, spacing, center, onHandMoved } = this.props;
    const is24hr = format === '24hr';

    return (
      <div>
          <Face
            onTouchStart={this.handleTouchStart}
            onMouseDown={this.handleMouseDown}
            numbers={is24hr ? outerNumbers : innerNumbers}
            spacing={spacing}
            radius={radius}
            twoDigits={is24hr}
            active={is24hr ? selected : (selected % 12 || 12)}
          />
          {this.renderInnerFace(radius - spacing * innerSpacing)}
          <Hand ref='hand'
            angle={selected * step}
            length={(this.state.inner ? radius - spacing * innerSpacing : radius) - spacing}
            onMove={this.handleHandMove}
            onMoved={onHandMoved}
            origin={center}
            step={step}
          />
      </div>
    );
  }
}



const minutes = utils.range(0, 60, 5);
const step = 360 / 60;

view Minutes {
  prop center:? object
  prop onChange:? func
  prop radius:? number
  prop selected:? number
  prop spacing: React.PropTypes.number

  static defaultProps = {
    selected: 0,
    onChange: null
  };

  handleHandMove = (degrees) => {
    this.props.onChange(degrees / step);
  };

  handleMouseDown = (event) => {
    this.refs.hand.mouseStart(event);
  };

  handleTouchStart = (event) => {
    this.refs.hand.touchStart(event);
  };

  render () {
    return (
      <div>
        <Face
          onTouchStart={this.handleTouchStart}
          onMouseDown={this.handleMouseDown}
          numbers={minutes}
          spacing={this.props.spacing}
          radius={this.props.radius}
          twoDigits
          active={this.props.selected}
        />
        <Hand ref='hand'
          className={minutes.indexOf(this.props.selected) === -1 ? style.small : ''}
          angle={this.props.selected * step}
          length={this.props.radius - this.props.spacing}
          onMove={this.handleHandMove}
          origin={this.props.center}
          step={step}
        />
      </div>
    );
  }
}



view TimePicker {
  prop className:? string
  prop error:? string
  prop format:? oneOf(['24hr', 'ampm'])
  prop label:? string
  prop onChange:? func
  prop value: React.PropTypes.object

  static defaultProps = {
    className: '',
    format: '24hr'
  };

  state = {
    active: false
  };

  handleDismiss = () => {
    this.setState({active: false});
  };

  handleInputMouseDown = (event) => {
    events.pauseEvent(event);
    this.setState({active: true});
  };

  handleSelect = (value, event) => {
    if (this.props.onChange) this.props.onChange(value, event);
    this.setState({active: false});
  };

  render () {
    const { value, format } = this.props;
    const formattedTime = value ? time.formatTime(value, format) : null;
    return (
      <div data-react-toolbox='time-picker'>
        <Input
          className={style.input}
          error={this.props.error}
          label={this.props.label}
          onMouseDown={this.handleInputMouseDown}
          readOnly
          type='text'
          value={formattedTime}
        />
        <TimePickerDialog
          active={this.state.active}
          className={this.props.className}
          format={format}
          onDismiss={this.handleDismiss}
          onSelect={this.handleSelect}
          value={this.props.value}
        />
      </div>
    );
  }
}



view TimePickerDialog {
  prop active:? bool
  prop className:? string
  prop format:? oneOf(['24hr', 'ampm'])
  prop onDismiss:? func
  prop onSelect:? func
  prop value: React.PropTypes.object

  static defaultProps = {
    active: false,
    format: '24hr',
    value: new Date()
  };

  state = {
    display: 'hours',
    displayTime: this.props.value
  };

  componentWillUpdate (nextProps) {
    if (!this.props.active && nextProps.active) {
      setTimeout(this.refs.clock.handleCalculateShape, 1000);
    }
  }

  handleClockChange = (value) => {
    this.setState({displayTime: value});
  };

  handleSelect = (event) => {
    this.props.onSelect(this.state.displayTime, event);
  };

  toggleTimeMode = () => {
    this.setState({displayTime: time.toggleTimeMode(this.state.displayTime)});
  };

  handleHandMoved = () => {
    if (this.state.display === 'hours') this.setState({display: 'minutes'});
  };

  switchDisplay = (display) => {
    this.setState({display});
  };

  actions = [
    { label: 'Cancel', className: style.button, onClick: this.props.onDismiss },
    { label: 'Ok', className: style.button, onClick: this.handleSelect }
  ];

  formatHours () {
    if (this.props.format === 'ampm') {
      return this.state.displayTime.getHours() % 12 || 12;
    } else {
      return this.state.displayTime.getHours();
    }
  }

  renderAMPMLabels () {
    if (this.props.format === 'ampm') {
      return (
        <div className={style.ampm}>
          <span className={style.am} onClick={this.toggleTimeMode}>AM</span>
          <span className={style.pm} onClick={this.toggleTimeMode}>PM</span>
        </div>
      );
    }
  }

  render () {
    const display = `display-${this.state.display}`;
    const format = `format-${time.getTimeMode(this.state.displayTime)}`;
    const className = ClassNames([style.dialog, style[display], style[format]], this.props.className);
    return (
      <Dialog active={this.props.active} className={className} actions={this.actions}>
        <header className={style.header}>
          <span className={style.hours} onClick={this.switchDisplay.bind(this, 'hours')}>
            {('0' + this.formatHours()).slice(-2)}
          </span>
          <span className={style.separator}>:</span>
          <span className={style.minutes} onClick={this.switchDisplay.bind(this, 'minutes')}>
            {('0' + this.state.displayTime.getMinutes()).slice(-2)}
          </span>
          {this.renderAMPMLabels()}
        </header>
        <Clock
          ref='clock'
          display={this.state.display}
          format={this.props.format}
          onChange={this.handleClockChange}
          onHandMoved={this.handleHandMoved}
          time={this.state.displayTime}
        />
      </Dialog>
    );
  }
}
