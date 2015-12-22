view Clock {
  prop display:? string = 'hours'//oneOf(['hours', 'minutes'])
  prop format:? string = '24hr'//oneOf(['24hr', 'ampm'])
  prop onChange:? func = Flint.noop
  prop onHandMoved:? func = Flint.noop
  prop time: object = new Date()

  let center = {x: null, y: null}
  let radius = 0

  let componentDidMount = () => {
    window.addEventListener('resize', handleCalculateShape)
    handleCalculateShape()
  }

  let componentWillUnmount = () => {
    window.removeEventListener('resize', handleCalculateShape)
  }

  let handleHourChange = (hours) => {
    if (time.getHours() !== hours) {
      onChange(time.setHours(time, adaptHourToFormat(hours)))
    }
  }

  let handleMinuteChange = (minutes) => {
    if (time.getMinutes() !== minutes) {
      onChange(time.setMinutes(time, minutes))
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
    if (format === 'ampm') {
      if (time.getTimeMode(time) === 'pm') {
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
        format={format}
        onChange={handleHourChange}
        radius={state.radius}
        selected={time.getHours()}
        spacing={state.radius * 0.18}
        onHandMoved={onHandMoved}
      />
    )
  }

  let renderMinutes = () => {
    return (
      <Minutes
        center={state.center}
        onChange={handleMinuteChange}
        radius={state.radius}
        selected={time.getMinutes()}
        spacing={state.radius * 0.18}
        onHandMoved={onHandMoved}
      />
    )
  }

  let render = () => {
    const animation = display === 'hours' ? ZoomOut : ZoomIn
    return (
      <div data-react-toolbox='clock' className={style.root}>
        <div ref='placeholder' className={style.placeholder} style={{height: state.radius * 2}}>
          <CssTransitionGroup transitionName={animation} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div key={display} className={style.wrapper} style={{height: state.radius * 2}}>
              {display === 'hours' ? renderHours() : null}
              {display === 'minutes' ? renderMinutes() : null}
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
      left: (rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + spacing),
      top: (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + spacing)
    }
  }

  let faceStyle = () => {
    return {
      height: radius * 2,
      width: radius * 2
    }
  }

  let renderNumber = (number, idx) => {
    let className = style.number
    if (number === active) className += ` ${style.active}`
    return (
      <span
        className={className}
        style={numberStyle(radius - spacing, idx + 1)}
        key={number}
      >
        {twoDigits ? ('0' + number).slice(-2) : number}
      </span>
    )
  }

  let render = () => {
    return (
      <div
        ref='root'
        className={style.face}
        onTouchStart={onTouchStart}
        onMouseDown={onMouseDown}
        style={faceStyle()}
      >
        {numbers.map(renderNumber.bind()}
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
    const x = origin.x - position.x
    const y = origin.y - position.y
    return Math.sqrt(x * x + y * y)
  }

  let trimAngleToValue = (angle) => {
    return step * Math.round(angle / step)
  }

  let positionToAngle = (position) => {
    return utils.angle360FromPositions(origin.x, origin.y, position.x, position.y)
  }

  let end = (evts) => {
    if (onMoved) onMoved()
    events.removeEventsFromDocument(evts)
  }

  let move = (position) => {
    const degrees = trimAngleToValue(positionToAngle(position))
    const radius = getPositionRadius(position)
    if (onMove) onMove(degrees === 360 ? 0 : degrees, radius)
  }

  let render = () => {
    const className = `${style.hand} ${className}`
    const handStyle = prefixer({
      height: length - state.knobWidth / 2,
      transform: `rotate(${angle}deg)`
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
    inner: format === '24hr' && selected > 0 && selected <= 12
  }

  let handleHandMove = (degrees, radius) => {
    const currentInner = radius < radius - spacing * innerSpacing
    if (format === '24hr' && state.inner !== currentInner) {
      setState({inner: currentInner}, () => {
        onChange(valueFromDegrees(degrees))
      })
    } else {
      onChange(valueFromDegrees(degrees))
    }
  }

  let handleMouseDown = (event) => {
    view.refs.hand.mouseStart(event)
  }

  let handleTouchStart = (event) => {
    view.refs.hand.touchStart(event)
  }

  let valueFromDegrees = (degrees) => {
    if (format === 'ampm' || format === '24hr' && state.inner) {
      return innerNumbers[degrees / step]
    } else {
      return outerNumbers[degrees / step]
    }
  }

  let renderInnerFace = (innerRadius) => {
    if (format === '24hr') {
      return (
        <Face
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          numbers={innerNumbers}
          spacing={spacing}
          radius={innerRadius}
          active={selected}
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
    onChange(degrees / step)
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
          spacing={spacing}
          radius={radius}
          twoDigits
          active={selected}
        />
        <Hand ref='hand'
          className={minutes.indexOf(selected) === -1 ? style.small : ''}
          angle={selected * step}
          length={radius - spacing}
          onMove={handleHandMove}
          origin={center}
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
    if (onChange) onChange(value, event)
    let active = false
  }

  let render = () => {
    const { value, format } = props
    const formattedTime = value ? time.formatTime(value, format) : null
    return (
      <div data-react-toolbox='time-picker'>
        <Input
          className={style.input}
          error={error}
          label={label}
          onMouseDown={handleInputMouseDown}
          readOnly
          type='text'
          value={formattedTime}
        />
        <TimePickerDialog
          active={state.active}
          className={className}
          format={format}
          onDismiss={handleDismiss}
          onSelect={handleSelect}
          value={value}
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
    displayTime: value
  }

  let componentWillUpdate = (nextProps) => {
    if (!active && nextProps.active) {
      setTimeout(view.refs.clock.handleCalculateShape, 1000)
    }
  }

  let handleClockChange = (value) => {
    let displayTime = value
  }

  let handleSelect = (event) => {
    onSelect(state.displayTime, event)
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
    { label: 'Cancel', className: style.button, onClick: onDismiss },
    { label: 'Ok', className: style.button, onClick: handleSelect }
  ]

  let formatHours = () => {
    if (format === 'ampm') {
      return state.displayTime.getHours() % 12 || 12
    } else {
      return state.displayTime.getHours()
    }
  }

  let renderAMPMLabels = () => {
    if (format === 'ampm') {
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
    const className = ClassNames([style.dialog, style[display], style[format]], className)
    return (
      <Dialog active={active} className={className} actions={actions}>
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
          format={format}
          onChange={handleClockChange}
          onHandMoved={handleHandMoved}
          time={state.displayTime}
        />
      </Dialog>
    )
  }
}
