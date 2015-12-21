

view Clock {
  prop className:? string
  prop display:? string//oneOf(['hours', 'minutes'])
  prop format:? string//oneOf(['24hr', 'ampm'])
  prop onChange:? func
  prop onHandMoved:? func
  prop time: object

  static defaultProps = {
    className: '',
    display: 'hours',
    format: '24hr',
    time: new Date()
  }

  state = {
    center: {x: null, y: null},
    radius: 0
  }

  let componentDidMount = () => {
    window.addEventListener('resize', handleCalculateShape)
    handleCalculateShape()
  }

  let componentWillUnmount = () => {
    window.removeEventListener('resize', handleCalculateShape)
  }

  let handleHourChange = (hours) => {
    if (props.time.getHours() !== hours) {
      props.onChange(time.setHours(props.time, adaptHourToFormat(hours)))
    }
  }

  let handleMinuteChange = (minutes) => {
    if (props.time.getMinutes() !== minutes) {
      props.onChange(time.setMinutes(props.time, minutes))
    }
  }

  let handleCalculateShape = () => {
    const { top, left, width } = view.refs.placeholder.getBoundingClientRect()
    setState({
      center: { x: left + width / 2, y: top + width / 2 },
      radius: width / 2
    })
  }

  let adaptHourToFormat = (hour) => {
    if (props.format === 'ampm') {
      if (time.getTimeMode(props.time) === 'pm') {
        return hour < 12 ? hour + 12 : hour
      } else {
        return hour === 12 ? 0 : hour
      }
    } else {
      return hour
    }
  }

  let renderHours = () => {
    return (
      <Hours
        center={state.center}
        format={props.format}
        onChange={handleHourChange}
        radius={state.radius}
        selected={props.time.getHours()}
        spacing={state.radius * 0.18}
        onHandMoved={props.onHandMoved}
      />
    )
  }

  let renderMinutes = () => {
    return (
      <Minutes
        center={state.center}
        onChange={handleMinuteChange}
        radius={state.radius}
        selected={props.time.getMinutes()}
        spacing={state.radius * 0.18}
        onHandMoved={props.onHandMoved}
      />
    )
  }

  let render = () => {
    const animation = props.display === 'hours' ? ZoomOut : ZoomIn
    return (
      <div data-react-toolbox='clock' className={style.root}>
        <div ref='placeholder' className={style.placeholder} style={{height: state.radius * 2}}>
          <CssTransitionGroup transitionName={animation} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div key={props.display} className={style.wrapper} style={{height: state.radius * 2}}>
              {props.display === 'hours' ? renderHours() : null}
              {props.display === 'minutes' ? renderMinutes() : null}
            </div>
          </CssTransitionGroup>
        </div>
      </div>
    )
  }
}



view Face {
  prop active:? number
  prop numbers:? array
  prop radius:? number
  prop spacing:? number
  prop twoDigits: bool

  static defaultProps = {
    active: null,
    numbers: [],
    radius: 0,
    twoDigits: false
  }

  let numberStyle = (rad, num) => {
    return {
      position: 'absolute',
      left: (rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + props.spacing),
      top: (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + props.spacing)
    }
  }

  let faceStyle = () => {
    return {
      height: props.radius * 2,
      width: props.radius * 2
    }
  }

  let renderNumber = (number, idx) => {
    let className = style.number
    if (number === props.active) className += ` ${style.active}`
    return (
      <span
        className={className}
        style={numberStyle(props.radius - props.spacing, idx + 1)}
        key={number}
      >
        {props.twoDigits ? ('0' + number).slice(-2) : number}
      </span>
    )
  }

  let render = () => {
    return (
      <div
        ref='root'
        className={style.face}
        onTouchStart={props.onTouchStart}
        onMouseDown={props.onMouseDown}
        style={faceStyle()}
      >
        {props.numbers.map(renderNumber.bind()}
      </div>
    )
  }
}



view Hand {
  prop angle:? number
  prop className:? string
  prop length:? number
  prop onMove:? func
  prop onMoved:? func
  prop origin:? object
  prop step: number

  static defaultProps = {
    className: '',
    angle: 0,
    length: 0,
    origin: {}
  }

  state = {
    knobWidth: 0
  }

  let componentDidMount = () => {
    let knobWidth = view.refs.knob.offsetWidth
  }

  let getMouseEventMap = () => {
    return {
      mousemove: handleMouseMove,
      mouseup: handleMouseUp
    }
  }

  let getTouchEventMap = () => {
    return {
      touchmove: handleTouchMove,
      touchend: handleTouchEnd
    }
  }

  let handleMouseMove = (event) => {
    move(events.getMousePosition(event))
  }

  let handleTouchMove = (event) => {
    move(events.getTouchPosition(event))
  }

  let handleMouseUp = () => {
    end(getMouseEventMap())
  }

  let handleTouchEnd = () => {
    end(getTouchEventMap())
  }

  let mouseStart = (event) => {
    events.addEventsToDocument(getMouseEventMap())
    move(events.getMousePosition(event))
  }

  let touchStart = (event) => {
    events.addEventsToDocument(getTouchEventMap())
    move(events.getTouchPosition(event))
    events.pauseEvent(event)
  }

  let getPositionRadius = (position) => {
    const x = props.origin.x - position.x
    const y = props.origin.y - position.y
    return Math.sqrt(x * x + y * y)
  }

  let trimAngleToValue = (angle) => {
    return props.step * Math.round(angle / props.step)
  }

  let positionToAngle = (position) => {
    return utils.angle360FromPositions(props.origin.x, props.origin.y, position.x, position.y)
  }

  let end = (evts) => {
    if (props.onMoved) props.onMoved()
    events.removeEventsFromDocument(evts)
  }

  let move = (position) => {
    const degrees = trimAngleToValue(positionToAngle(position))
    const radius = getPositionRadius(position)
    if (props.onMove) props.onMove(degrees === 360 ? 0 : degrees, radius)
  }

  let render = () => {
    const className = `${style.hand} ${props.className}`
    const handStyle = prefixer({
      height: props.length - state.knobWidth / 2,
      transform: `rotate(${props.angle}deg)`
    })

    return (
      <div className={className} style={handStyle}>
        <div ref='knob' className={style.knob}></div>
      </div>
    )
  }
}



const outerNumbers = [0, ...utils.range(13, 24)]
const innerNumbers = [12, ...utils.range(1, 12)]
const innerSpacing = 1.7
const step = 360 / 12

view Hours {
  prop center:? object
  prop format:? string//oneOf(['24hr', 'ampm'])
  prop onChange:? func
  prop onHandMoved:? func
  prop radius:? number
  prop selected:? number
  prop spacing: number

  state = {
    inner: props.format === '24hr' && props.selected > 0 && props.selected <= 12
  }

  let handleHandMove = (degrees, radius) => {
    const currentInner = radius < props.radius - props.spacing * innerSpacing
    if (props.format === '24hr' && state.inner !== currentInner) {
      setState({inner: currentInner}, () => {
        props.onChange(valueFromDegrees(degrees))
      })
    } else {
      props.onChange(valueFromDegrees(degrees))
    }
  }

  let handleMouseDown = (event) => {
    view.refs.hand.mouseStart(event)
  }

  let handleTouchStart = (event) => {
    view.refs.hand.touchStart(event)
  }

  let valueFromDegrees = (degrees) => {
    if (props.format === 'ampm' || props.format === '24hr' && state.inner) {
      return innerNumbers[degrees / step]
    } else {
      return outerNumbers[degrees / step]
    }
  }

  let renderInnerFace = (innerRadius) => {
    if (props.format === '24hr') {
      return (
        <Face
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          numbers={innerNumbers}
          spacing={props.spacing}
          radius={innerRadius}
          active={props.selected}
        />
      )
    }
  }

  let render = () => {
    const { format, selected, radius, spacing, center, onHandMoved } = props
    const is24hr = format === '24hr'

    return (
      <div>
          <Face
            onTouchStart={handleTouchStart}
            onMouseDown={handleMouseDown}
            numbers={is24hr ? outerNumbers : innerNumbers}
            spacing={spacing}
            radius={radius}
            twoDigits={is24hr}
            active={is24hr ? selected : (selected % 12 || 12)}
          />
          {renderInnerFace(radius - spacing * innerSpacing)}
          <Hand ref='hand'
            angle={selected * step}
            length={(state.inner ? radius - spacing * innerSpacing : radius) - spacing}
            onMove={handleHandMove}
            onMoved={onHandMoved}
            origin={center}
            step={step}
          />
      </div>
    )
  }
}



const minutes = utils.range(0, 60, 5)
const step = 360 / 60

view Minutes {
  prop center:? object
  prop onChange:? func
  prop radius:? number
  prop selected:? number
  prop spacing: number

  static defaultProps = {
    selected: 0,
    onChange: null
  }

  let handleHandMove = (degrees) => {
    props.onChange(degrees / step)
  }

  let handleMouseDown = (event) => {
    view.refs.hand.mouseStart(event)
  }

  let handleTouchStart = (event) => {
    view.refs.hand.touchStart(event)
  }

  let render = () => {
    return (
      <div>
        <Face
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          numbers={minutes}
          spacing={props.spacing}
          radius={props.radius}
          twoDigits
          active={props.selected}
        />
        <Hand ref='hand'
          className={minutes.indexOf(props.selected) === -1 ? style.small : ''}
          angle={props.selected * step}
          length={props.radius - props.spacing}
          onMove={handleHandMove}
          origin={props.center}
          step={step}
        />
      </div>
    )
  }
}



view TimePicker {
  prop className:? string
  prop error:? string
  prop format:? string//oneOf(['24hr', 'ampm'])
  prop label:? string
  prop onChange:? func
  prop value: object

  static defaultProps = {
    className: '',
    format: '24hr'
  }

  state = {
    active: false
  }

  let handleDismiss = () => {
    let active = false
  }

  let handleInputMouseDown = (event) => {
    events.pauseEvent(event)
    let active = true
  }

  let handleSelect = (value, event) => {
    if (props.onChange) props.onChange(value, event)
    let active = false
  }

  let render = () => {
    const { value, format } = props
    const formattedTime = value ? time.formatTime(value, format) : null
    return (
      <div data-react-toolbox='time-picker'>
        <Input
          className={style.input}
          error={props.error}
          label={props.label}
          onMouseDown={handleInputMouseDown}
          readOnly
          type='text'
          value={formattedTime}
        />
        <TimePickerDialog
          active={state.active}
          className={props.className}
          format={format}
          onDismiss={handleDismiss}
          onSelect={handleSelect}
          value={props.value}
        />
      </div>
    )
  }
}



view TimePickerDialog {
  prop active:? bool
  prop className:? string
  prop format:? string//oneOf(['24hr', 'ampm'])
  prop onDismiss:? func
  prop onSelect:? func
  prop value: object

  static defaultProps = {
    active: false,
    format: '24hr',
    value: new Date()
  }

  state = {
    display: 'hours',
    displayTime: props.value
  }

  let componentWillUpdate = (nextProps) => {
    if (!props.active && nextProps.active) {
      setTimeout(view.refs.clock.handleCalculateShape, 1000)
    }
  }

  let handleClockChange = (value) => {
    let displayTime = value
  }

  let handleSelect = (event) => {
    props.onSelect(state.displayTime, event)
  }

  let toggleTimeMode = () => {
    let displayTime = time.toggleTimeMode(state.displayTime)
  }

  let handleHandMoved = () => {
    if (state.display === 'hours') let display = 'minutes'
  }

  let switchDisplay = (display) => {
    setState({display})
  }

  actions = [
    { label: 'Cancel', className: style.button, onClick: props.onDismiss },
    { label: 'Ok', className: style.button, onClick: handleSelect }
  ]

  let formatHours = () => {
    if (props.format === 'ampm') {
      return state.displayTime.getHours() % 12 || 12
    } else {
      return state.displayTime.getHours()
    }
  }

  let renderAMPMLabels = () => {
    if (props.format === 'ampm') {
      return (
        <div className={style.ampm}>
          <span className={style.am} onClick={toggleTimeMode}>AM</span>
          <span className={style.pm} onClick={toggleTimeMode}>PM</span>
        </div>
      )
    }
  }

  let render = () => {
    const display = `display-${state.display}`
    const format = `format-${time.getTimeMode(state.displayTime)}`
    const className = ClassNames([style.dialog, style[display], style[format]], props.className)
    return (
      <Dialog active={props.active} className={className} actions={actions}>
        <header className={style.header}>
          <span className={style.hours} onClick={switchDisplay.bind( 'hours')}>
            {('0' + formatHours()).slice(-2)}
          </span>
          <span className={style.separator}>:</span>
          <span className={style.minutes} onClick={switchDisplay.bind( 'minutes')}>
            {('0' + state.displayTime.getMinutes()).slice(-2)}
          </span>
          {renderAMPMLabels()}
        </header>
        <Clock
          ref='clock'
          display={state.display}
          format={props.format}
          onChange={handleClockChange}
          onHandMoved={handleHandMoved}
          time={state.displayTime}
        />
      </Dialog>
    )
  }
}
