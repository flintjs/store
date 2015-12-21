

view Calendar {
  prop display:? string = 'months'//oneOf(['months', 'years'])
  prop selectedDate:? object = new Date()

  prop maxDate:? object
  prop minDate:? object
  prop onChange:? func
  prop viewDate: object

  let _viewDate = selectedDate

  let componentDidUpdate = () => {
    if (view.refs.activeYear) {
      scrollToActive()
    }
  }

  let scrollToActive = () => {
    view.refs.years.scrollTop =
      view.refs.activeYear.offsetTop -
      view.refs.years.offsetHeight / 2 +
      view.refs.activeYear.offsetHeight / 2
  }

  let handleDayClick = (day) => {
    props.onChange(time.setDay(_viewDate, day))
  }

  let handleYearClick = (year) => {
    const viewDate = time.setYear(props.selectedDate, year)
    setState({viewDate})
    props.onChange(viewDate)
  }

  let changeViewMonth = (direction, step) => {
    setState({
      direction,
      viewDate: time.addMonths(_viewDate, step)
    })
  }

  renderYear (year) {
    const props = {
      className: year === _viewDate.getFullYear() ? style.active : '',
      key: year,
      onClick: handleYearClick.bind( year)
    }

    if (year === _viewDate.getFullYear()) {
      props.ref = 'activeYear'
    }

    return <li {...props}>{year}</li>
  }

  renderYears () {
    return (
      <ul data-react-toolbox='years' ref="years" className={style.years}>
        {utils.range(1900, 2100).map((i) => { return renderYear(i) })}
      </ul>
    )
  }

  renderMonths () {
    const animation = state.direction === 'left' ? SlideLeft : SlideRight
    return (
      <div data-react-toolbox='calendar'>
        <IconButton className={style.prev} icon='chevron_left' onClick={changeViewMonth.bind( 'left', -1)} />
        <IconButton className={style.next} icon='chevron_right' onClick={changeViewMonth.bind( 'right', 1)} />
        <CssTransitionGroup transitionName={animation} transitionEnterTimeout={350} transitionLeaveTimeout={350}>
          <CalendarMonth
            key={_viewDate.getMonth()}
            maxDate={props.maxDate}
            minDate={props.minDate}
            viewDate={_viewDate}
            selectedDate={props.selectedDate}
            onDayClick={handleDayClick}
          />
        </CssTransitionGroup>
      </div>
    )
  }

  render () {
    return (
      <div className={style.root}>
        {props.display === 'months' ? renderMonths() : renderYears()}
      </div>
    )
  }
}



view Day {
  prop day:? number
  prop disabled:? bool
  prop onClick:? func
  prop selectedDate:? object
  prop viewDate: object

  let dayStyle = () => {
    if (props.day === 1) {
      return {
        marginLeft: `${time.getFirstWeekDay(props.viewDate) * 100 / 7}%`
      }
    }
  }

  let isSelected = () => {
    const sameYear = props.viewDate.getFullYear() === props.selectedDate.getFullYear()
    const sameMonth = props.viewDate.getMonth() === props.selectedDate.getMonth()
    const sameDay = props.day === props.selectedDate.getDate()
    return sameYear && sameMonth && sameDay
  }

  let render = () => {
    const className = ClassNames(style.day, {
      [style.active]: isSelected(),
      [style.disabled]: props.disabled
    })

    return (
      <div data-react-toolbox='day' className={className} style={dayStyle()}>
        <span onClick={props.onClick}>
          {props.day}
        </span>
      </div>
    )
  }
}



view Month {
  prop maxDate:? object
  prop minDate:? object
  prop onDayClick:? func
  prop selectedDate:? object
  prop viewDate: object

  let handleDayClick = (day) => {
    if (props.onDayClick) props.onDayClick(day)
  }

  renderWeeks () {
    return utils.range(0, 7).map(i => {
      return <span key={i}>{time.getFullDayOfWeek(i).charAt(0)}</span>
    })
  }

  renderDays () {
    return utils.range(1, time.getDaysInMonth(props.viewDate) + 1).map(i => {
      const date = new Date(props.viewDate.getFullYear(), props.viewDate.getMonth(), i)
      const disabled = time.dateOutOfRange(date, props.minDate, props.maxDate)

      return (
        <CalendarDay
          key={i}
          day={i}
          disabled={disabled}
          onClick={!disabled ? handleDayClick.bind( i) : null}
          selectedDate={props.selectedDate}
          viewDate={props.viewDate}
        />
      )
    })
  }

  render () {
    return (
      <div data-react-toolbox='month' className={style.month}>
        <span className={style.title}>
          {time.getFullMonth(props.viewDate)} {props.viewDate.getFullYear()}
        </span>
        <div className={style.week}>{renderWeeks()}</div>
        <div className={style.days}>{renderDays()}</div>
      </div>
    )
  }
}




view DatePicker {
  prop className:? string
  prop error:? string
  prop label:? string
  prop maxDate:? object
  prop minDate:? object
  prop onChange:? func
  prop value: object

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

  render () {
    const { value } = props
    const date = value ? `${value.getDate()} ${time.getFullMonth(value)} ${value.getFullYear()}` : null

    return (
      <div data-toolbox='date-picker'>
        <Input
          className={style.input}
          error={props.error}
          onMouseDown={handleInputMouseDown}
          label={props.label}
          readOnly
          type='text'
          value={date}
        />
        <DatePickerDialog
          active={state.active}
          className={props.className}
          maxDate={props.maxDate}
          minDate={props.minDate}
          onDismiss={handleDismiss}
          onSelect={handleSelect}
          value={props.value}
        />
      </div>
    )
  }
}



view CalendarDialog {
  prop active:? bool
  prop className:? string
  prop maxDate:? object
  prop minDate:? object
  prop onDismiss:? func
  prop onSelect:? func
  prop value: object

  static defaultProps = {
    active: false,
    className: '',
    value: new Date()
  }

  state = {
    date: props.value,
    display: 'months'
  }

  let handleCalendarChange = (value) => {
    const state = {display: 'months', date: value}
    if (time.dateOutOfRange(value, props.minDate, props.maxDate)) {
      state.date = props.maxDate || props.minDate
    }
    setState(state)
  }

  let handleSelect = (event) => {
    if (props.onSelect) props.onSelect(state.date, event)
  }

  let handleSwitchDisplay = (display) => {
    setState({ display })
  }

  actions = [
    { label: 'Cancel', className: style.button, onClick: props.onDismiss },
    { label: 'Ok', className: style.button, onClick: handleSelect }
  ]

  render () {
    const display = `display-${state.display}`
    const className = ClassNames(style.dialog, props.className)
    const headerClassName = ClassNames(style.header, style[display])

    return (
      <Dialog active={props.active} type="custom" className={className} actions={actions}>
          <header className={headerClassName}>
            <span className={style.year} onClick={handleSwitchDisplay.bind( 'years')}>
              {state.date.getFullYear()}
            </span>
            <h3 className={style.date} onClick={handleSwitchDisplay.bind( 'months')}>
              {time.getShortDayOfWeek(state.date.getDay())}, {time.getShortMonth(state.date)} {state.date.getDate()}
            </h3>
          </header>

          <div className={style.wrapper}>
            <Calendar
              display={state.display}
              maxDate={props.maxDate}
              minDate={props.minDate}
              onChange={handleCalendarChange}
              selectedDate={state.date} />
          </div>
      </Dialog>
    )
  }
}

