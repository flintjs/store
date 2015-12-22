import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { unit, percent, seconds } = units

let timepickerPrimary = colors.primary
let timepickerPrimaryContrast = colors.primaryContrast
let timepickerPrimaryDark = colors.primaryDark
let clockPrimary = colors.primary
let clockPrimaryContrast = colors.primaryContrast
let clockPrimaryDark = colors.primaryDark

const styles = {
  timepickerHeaderFontSize: unit(5.2),
  timepickerHeaderPadding: unit(1),
  timepickerAmpmFontSize: unit(1.6),
  timepickerPrimaryColor: timepickerPrimary,
  timepickerPrimaryHoverColor: rgba(timepickerPrimary, 0.20),
  timepickerPrimaryContrastColor: timepickerPrimaryContrast,
  timepickerPrimaryDarkColor: timepickerPrimaryDark,
  timepickerAmpmHeight: unit(2.2),
  timepickerAmpmWidth: unit(4),
  timepickerDialogWidth: unit(30),

  clockPadding: [unit(1.5), unit(2)],
  clockPrimary,
  clockPrimaryContrast,
  clockPrimaryDark,
  clockPrimaryColor: clockPrimary,
  clockPrimaryHoverColor: rgba(clockPrimary, 0.20),
  clockPrimaryContrastColor: clockPrimaryContrast,
  clockPrimaryDarkColor: clockPrimaryDark,
  clockNumberSize: unit(2),
  clockHandWidth: unit(.4),
  clockHandDotSize: unit(1),
  clockKnobSize: unit(3.4),
  clockKnobSmallSize: unit(1.2),
}

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
  prop active:? number = false
  prop numbers:? array = []
  prop onTouchStart:? func = Flint.noop
  prop onMouseDown:? func = Flint.noop
  prop radius:? number = 0
  prop spacing:? number
  prop twoDigits: bool = false

  let rad

  on.update(() => {
    rad = radius - spacing
  })

  <face
    ref='root'
    onTouchStart={onTouchStart}
    onMouseDown={onMouseDown}>
    <number
      class={{ active }}
      key={number}>
      {twoDigits ? ('0' + number).slice(-2) : number}
    </number>
  </face>

  $face = {
    height: radius * 2,
    width: radius * 2
  }

  $number = {
    position: 'absolute',
    left: (rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + spacing),
    top: (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + spacing)
  }
}



view Hand {
  prop angle:? number = 0
  prop length:? number = 0
  prop onMove:? func
  prop onMoved:? func
  prop origin:? object = {}
  prop step: number

  let knobWidth = 0

  let componentDidMount = () => {
    knobWidth = view.refs.knob.offsetWidth
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
    return fns.angle360FromPositions(origin.x, origin.y, position.x, position.y)
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

  let handStyle

  on.render(() => {
    const className = `${style.hand} ${className}`
  })

  <hand>
    <knob ref='knob' />
  </hand>

  $hand = {
    height: length - knobWidth / 2,
    transform: `rotate(${angle}deg)`
  }
}



const outerNumbers = [0, ...fns.range(13, 24)]
const innerNumbers = [12, ...fns.range(1, 12)]
const innerSpacing = 1.7
// const step = 360 / 12

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



const minutes = fns.range(0, 60, 5)
const step = 360 / 60

view Minutes {
  prop center:? object
  prop onChange:? func = Flint.noop
  prop radius:? number
  prop selected:? number = 0
  prop spacing: number

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
  prop error:? string
  prop format:? string = '24hr'//oneOf(['24hr', 'ampm'])
  prop label:? string
  prop onChange:? func
  prop value: object

  let active = false

  let handleDismiss = () => {
    active = false
  }

  let handleInputMouseDown = (event) => {
    events.pauseEvent(event)
    active = true
  }

  let handleSelect = (value, event) => {
    if (onChange) onChange(value, event)
    active = false
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
  prop active:? bool = false
  prop className:? string
  prop format:? string = '24hr'//oneOf(['24hr', 'ampm'])
  prop onDismiss:? func
  prop onSelect:? func
  prop value: object = new Date()

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
    if (display === 'hours')
      display = 'minutes'
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

// .root {
//   padding: clockPadding,
// }
//
// .placeholder {
//   position: `relative`,
//   zIndex: zIndexHigh,
// }
//
// .wrapper {
//   position: `absolute`,
//   width: percent(100),
//   backgroundColor: colorDivider,
//   borderRadius: percent(50),
// }
//
// .face {
//   position: `absolute`,
//   top: percent(50),
//   left: percent(50),
//   zIndex: zIndexHigh,
//   cursor: `pointer`,
//   borderRadius: percent(50),
//   transform: translateX(percent(-50)) translateY(percent(-50)),
// }
//
// .number {
//   position: `relative`,
//   width: clockNumberSize,
//   height: clockNumberSize,
//   marginTop: - clockNumberSize / 2,
//   marginLeft: - clockNumberSize / 2,
//   textAlign: `center`,
//   pointerEvents: `none`,
//   userSelect: `none`,
//   &.active {
//     color: clockPrimaryContrastColor,
//   }
// }
//
// .hand {
//   position: `absolute`,
//   bottom: percent(50),
//   left: percent(50),
//   display: `block`,
//   width: clockHandWidth,
//   marginLeft: - clockHandWidth / 2,
//   backgroundColor: clockPrimaryColor,
//   transform-origin: percent(50) percent(100),
//   &:before {
//     position: `absolute`,
//     bottom: 0,
//     left: percent(50),
//     width: clockHandDotSize,
//     height: clockHandDotSize,
//     marginBottom: - clockHandDotSize / 2,
//     marginLeft: - clockHandDotSize / 2,
//     content: "",
//     backgroundColor: clockPrimaryColor,
//     borderRadius: percent(50),
//   }
//   &.small > .knob {
//     backgroundColor: clockPrimaryHoverColor,
//     &:after {
//       position: `absolute`,
//       top: percent(50),
//       left: percent(50),
//       width: clockKnobSmallSize,
//       height: clockKnobSmallSize,
//       marginTop: - clockKnobSmallSize / 2,
//       marginLeft: - clockKnobSmallSize / 2,
//       content: "",
//       background: clockPrimaryColor,
//       borderRadius: percent(50),
//     }
//     &:before {
//       position: `absolute`,
//       bottom: 0,
//       left: percent(50),
//       width: clockHandWidth,
//       height: clockKnobSize - clockKnobSmallSize,
//       marginLeft: - clockHandWidth / 2,
//       content: "",
//       background: clockPrimaryColor,
//     }
//   }
// }
//
// .knob {
//   position: `absolute`,
//   top: - clockKnobSize,
//   left: percent(50),
//   width: clockKnobSize,
//   height: clockKnobSize,
//   marginLeft: - clockKnobSize / 2,
//   cursor: `pointer`,
//   backgroundColor: clockPrimaryColor,
//   borderRadius: percent(50),
// }
// @import "../base",
// @import "./config",
//
// .input > [role="input"] {
//   cursor: `pointer`,
// }
//
// .header {
//   position: `relative`,
//   width: percent(100),
//   padding: timepickerHeaderPadding,
//   fontSize: timepickerHeaderFontSize,
//   color: timepickerPrimaryContrastColor,
//   textAlign: `center`,
//   background: timepickerPrimaryColor,
// }
//
// .hours, .minutes {
//   display: `inline-block`,
//   cursor: `pointer`,
//   opacity: .6,
// }
//
// .separator {
//   margin: 0 timepickerHeaderPadding / 2,
//   opacity: .6,
// }
//
// .ampm {
//   position: `absolute`,
//   top: percent(50),
//   right: 2)unit,
//   width: timepickerAmpmWidth,
//   height: timepickerAmpmHeight * 2,
//   marginTop: - timepickerAmpmHeight,
//   fontSize: timepickerAmpmFontSize,
//   lineHeight: timepickerAmpmHeight,
//   textAlign: `center`,
// }
//
// .am, .pm {
//   display: `block`,
//   cursor: `pointer`,
//   opacity: .6,
// }
//
// .dialog {
//   width: timepickerDialogWidth,
//   > [role="body"] {
//     padding: 0,
//     overflowY: `visible`,
//   }
//   > [role="navigation"] > .button {
//     color: timepickerPrimaryColor,
//     &:hover {
//       background: timepickerPrimaryHoverColor,
//     }
//     &:focus:not(:active) {
//       background: timepickerPrimaryHoverColor,
//     }
//   }
//   &.display-hours .hours, &.display-minutes .minutes, &.format-am .am,
//   &.format-pm .pm {
//     opacity: 1,
//   }
// }