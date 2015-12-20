view Slider {
  prop editable:? bool = false
  prop max:? number = 100
  prop min:? number = 0
  prop onChange:? func = function(){}
  prop pinned:? bool = false
  prop snaps:? bool = false
  prop step:? number = 0.01
  prop value:? number = 0

  let inputFocused = false
  let inputValue = null
  let sliderLength = 0
  let sliderStart = 0

  on.mount(handleResize)
  on.unmount(handleResize)

  let handleInputFocus = () => {
    inputFocused = true
    inputValue = valueForInput(value)
  }

  let handleInputChange = (event) => {
    inputValue = event.target.value
  }

  let handleInputBlur = (event) => {
    const value = inputValue || 0
    inputFocused = false
    inputValue = null
    onChange(trimValue(value), event)
  }

  let handleKeyDown = (event) => {
    if ([13, 27].indexOf(event.keyCode) !== -1) {
      view.refs.input.blur()
      ReactDOM.findDOMNode(view).blur()
    }
    if (event.keyCode === 38) addToValue(step)
    if (event.keyCode === 40) addToValue(-step)
  }

  let handleMouseDown = (event) => {
    if (inputFocused) view.refs.input.blur()
    events.addEventsToDocument(getMouseEventMap())
    start(events.getMousePosition(event))
    events.pauseEvent(event)
  }

  let handleMouseMove = (event) => {
    events.pauseEvent(event)
    move(events.getMousePosition(event))
  }

  let handleMouseUp = () => {
    end(getMouseEventMap())
  }

  let handleResize = (event, callback) => {
    const {left, right} = ReactDOM.findDOMNode(view.refs.progressbar).getBoundingClientRect()
    const cb = callback || () => {}
    setState({sliderStart: left, sliderLength: right - left}, cb)
  }

  let handleSliderBlur = () => {
    events.removeEventsFromDocument(getKeyboardEvents())
  }

  let handleSliderFocus = () => {
    events.addEventsToDocument(getKeyboardEvents())
  }

  let handleTouchEnd = () => {
    end(getTouchEventMap())
  }

  let handleTouchMove = (event) => {
    move(events.getTouchPosition(event))
  }

  let handleTouchStart = (event) => {
    if (inputFocused) view.refs.input.blur()
    start(events.getTouchPosition(event))
    events.addEventsToDocument(getTouchEventMap())
    events.pauseEvent(event)
  }

  let addToValue = (increment) => {
    let value = inputFocused ? parseFloat(inputValue) : value
    value = trimValue(value + increment)
    if (value !== value) onChange(value)
  }

  let getKeyboardEvents = () => ({
    keydown: handleKeyDown
  })

  let getMouseEventMap = () => ({
    mousemove: handleMouseMove,
    mouseup: handleMouseUp
  })

  let getTouchEventMap = () => ({
    touchmove: handleTouchMove,
    touchend: handleTouchEnd
  })

  let end = (revents) => {
    events.removeEventsFromDocument(revents)
    pressed = false
  }

  let knobOffset = () => {
    return sliderLength * (value - min) / (max - min)
  }

  let move = (position) => {
    const newValue = positionToValue(position)
    if (newValue !== value) onChange(newValue)
  }

  let positionToValue = (position) => {
    return trimValue((position.x - sliderStart) / sliderLength * (max - min) + min)
  }

  let start = (position) => {
    handleResize(null, () => {
      pressed = true
      onChange(positionToValue(position))
    })
  }

  let stepDecimals = () => {
    return (step.toString().split('.')[1] || []).length
  }

  let trimValue = (value) => {
    if (value < min) return min
    if (value > max) return max
    return utils.round(value, stepDecimals())
  }

  let valueForInput = (value) => {
    const decimals = stepDecimals()
    return decimals > 0 ? value.toFixed(decimals) : value.toString()
  }

  <slider
    onBlur={handleSliderBlur}
    onFocus={handleSliderFocus}
    tabIndex='0'>
    <bar
      ref='slider'
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}>
      <knob
        ref='knob'
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}>
        <innerKnob data-value={parseInt(value)}></innerKnob>
      </knob>
      <progress>
        <ProgressBar
          ref='progressbar'
          className={style.innerprogress}
          max={max}
          min={min}
          mode='determinate'
          value={value}
        />
        <snaps if={snaps} ref='snaps'>
          <snap repeat={utils.range(0, (max - min) / step)}></snap>
        </snaps>
      </progress>
    </bar>
    <Input
      if={editable}
      ref='input'
      onFocus={handleInputFocus}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      value={inputFocused ? inputValue : valueForInput(value)}
    />
  </slider>

  const knobStyles = prefixer({transform: `translateX(${knobOffset()}px)`})
  const className = ClassNames(style.root, {
    [style.editable]: editable,
    [style.pinned]: pinned,
    [style.pressed]: pressed,
    [style.ring]: value === min
  }, className)

  $innerKnob = [
    {
      backgroundColor: `transparent`,
      border: [styles.emptyKnobBorder, `solid`, colors.divider],

      before: {
        backgroundColor: styles.mainColor,
      }
    },

    pinned && {
      before: {
        position: absolute,
        top: 0,
        left: 0,
        width: styles.pinSize,
        height: styles.pinSize,
        marginLeft: (styles.knobSize - styles.pinSize) / 2,
        content: "",
        backgroundColor: styles.mainColor,
        borderRadius: 50% 50% 50% 0,
        transition: `transform .2s ease, backgroundColor .18s ease`,
        transform: [rotate(45), scale(0), translate(0)],
      },

      after: {
        position: `absolute`,
        top: 0,
        left: 0,
        width: styles.knobSize,
        height: styles.pinSize,
        fontSize: 10,
        color: colors.Background,
        textAlign: `center`,
        content: attr(dataValue),
        transition: `transform .2s ease, backgroundColor .18s ease`,
        transform: [scale(0), translate(0)],
      }
    },

    pinned && pressed && {
      before: {
        transitionDelay: `100ms`,
        transform: [rotate(deg(45)), scale(1), translate(styles.pinElevation,  styles.pinElevation)],
      },

      after: {
        transitionDelay: `100ms`,
        transform: [scale(1), translate(0, -styles.pinElevation)],
      }
    },

    !pinned && {
      width: `100%`,
      height: `100%`,
      transform: translateZ(0),
    }
  ]

  $ = [
    editable && {
      display: `flex`,
      flexDirection: `row`,
      alignItems: `center`,
    }
  ]

  $ring = [
    progress && {
      left: styles.knobSize / 2 + styles.emptyKnobBorder * 2,
      width: calc(percent(100 - styles.emptyKnobBorder * 2)),
      transition: `left .18s ease, width .18s ease`,
    },

    pinned && progress && {
      left: styles.knobSize / 2,
      width: calc(percent(100)),
    },

    pressed && !pinned && {
      //.progress
      left: styles.knobSize / 2 + (styles.knobSize - styles.emptyKnobBorder * 2) / 2,
      width: calc(100%  (styles.knobSize - styles.emptyKnobBorder * 2) / 2),
    }
  ]

  $container = {
    position: `relative`,
    width: calc(100%  styles.knobSize),
    height: styles.knobSize,
    marginRight: styles.knobSize,
    userSelect: `none`,
    // &:not(:lastChild) {
    //   marginRight: styles.sideSeparation + styles.knobSize,
    // }
    // &:not(:firstChild) {
    //   marginLeft: styles.sideSeparation,
    // }
  }

  $knob = {
    position: relative,
    top: 0,
    left: 0,
    zIndex: units.zIndexHigher,
    display: `flex`,
    width: styles.knobSize,
    height: styles.knobSize,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `transparent`,

    before: {
      focus: {
        position: `absolute`,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: units.zIndexNormal,
        content: "",
        backgroundColor: styles.mainColor,
        borderRadius: percent(50),
        opacity: .26,
      }
    }
  }

  $innerKnob = [
    {
      zIndex: units.zIndexHigh,
      width: styles.innerKnobSize,
      height: styles.innerKnobSize,
      backgroundColor: styles.mainColor,
      borderRadius: percent(50),
      transitionTimingFunction: units.animationCurveDefault,
      transitionDuration: seconds(.1),
      transitionProperty: `height, width, backgroundColor, border`,
    },

    // from ring
    pinned && {
      backgroundColor: colors.Background,
    }
  ]

  $snaps = {
    position: `absolute`,
    top: styles.knobSize / 2 - styles.snapSize / 2,
    left: 0,
    display: `flex`,
    width: calcPercent(100 + styles.snapSize),
    height: styles.snapSize,
    flexDirection: `row`,
    pointerEvents: `none`,

    after: {
      display: `block`,
      width: styles.snapSize,
      height: styles.snapSize,
      content: "",
      backgroundColor: styles.snapColor,
      borderRadius: `50%`,
    }
  }

  $snap = {
    flex: 1,

    after: {
      display: `block`,
      width: styles.snapSize,
      height: styles.snapSize,
      content: "",
      backgroundColor: styles.snapColor,
      borderRadius: percent(50),
    }
  }

  $input = {
    width: styles.inputWidth,
    padding: 0,
    marginBottom: 0,
    // > input {
    //   textAlign: center,
    // }
  }

  $progress = {
    position: `absolute`,
    top: 0,
    left: styles.knobSize / 2,
    width: `100%`,
    height: `100%`,
  }

  $innerProgress = {
    position: `absolute`,
    top: styles.knobSize / 2 - styles.barHeight / 2,
    height: styles.barHeight,

    // [dataRef="value"] {
    //   transitionDuration: 0s,
    // }
  }
}