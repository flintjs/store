view Calendar {
  prop display:? string = 'months'//oneOf(['months', 'years'])
  prop selectedDate:? object = new Date()

  prop maxDate:? object
  prop minDate:? object
  prop onChange:? func = Flint.noop
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
    onChange(time.setDay(_viewDate, day))
  }

  let handleYearClick = (year) => {
    viewDate = time.setYear(selectedDate, year)
    onChange(viewDate)
  }

  let changeViewMonth = (direction, step) => {
    direction = direction
    viewDate = time.addMonths(_viewDate, step)
  }

  <months if={display == 'months'}>
    <IconButton className={style.prev} icon='chevron_left' onClick={changeViewMonth.bind( 'left', -1)} />
    <IconButton className={style.next} icon='chevron_right' onClick={changeViewMonth.bind( 'right', 1)} />
    <CssTransitionGroup transitionName={animation = direction === 'left' ? SlideLeft : SlideRight} transitionEnterTimeout={350} transitionLeaveTimeout={350}>
      <CalendarMonth
        key={_viewDate.getMonth()}
        maxDate={maxDate}
        minDate={minDate}
        viewDate={_viewDate}
        selectedDate={selectedDate}
        onDayClick={handleDayClick}
      />
    </CssTransitionGroup>
  </months>
  <years-ul if={display != months} ref="years" className={style.years}>
    <li
      repeat={utils.range(1900, 2100)}
      {...({
        className: year === _viewDate.getFullYear() ? style.active : '',
        key: year,
        ref: year === _viewDate.getFullYear() ? 'activeYear' : null,
        onClick: handleYearClick.bind( year)
      })}>
      {_}
    </li>
  </years-ul>
}



view Day {
  prop day:? number
  prop disabled:? bool
  prop onClick:? func = Flint.noop
  prop selectedDate:? object
  prop viewDate: object

  let dayStyle = () => {
    if (day === 1) {
      return {
        marginLeft: `${time.getFirstWeekDay(viewDate) * 100 / 7}%`
      }
    }
  }

  let isSelected = () => {
    const sameYear = viewDate.getFullYear() === selectedDate.getFullYear()
    const sameMonth = viewDate.getMonth() === selectedDate.getMonth()
    const sameDay = day === selectedDate.getDate()
    return sameYear && sameMonth && sameDay
  }

  let render = () => {
    const className = ClassNames(style.day, {
      [style.active]: isSelected(),
      [style.disabled]: disabled
    })

    return (
      <div className={className} style={dayStyle()}>
        <span onClick={onClick}>
          {day}
        </span>
      </div>
    )
  }
}



view Month {
  prop maxDate:? object
  prop minDate:? object
  prop onDayClick:? func = Flint.noop
  prop selectedDate:? object
  prop viewDate: object

  let handleDayClick = (day) => {
    if (onDayClick) onDayClick(day)
  }

  let renderWeeks = () => {
    return utils.range(0, 7).map(i => {
      return <span key={i}>{time.getFullDayOfWeek(i).charAt(0)}</span>
    })
  }

  let renderDays = () => {
    return utils.range(1, time.getDaysInMonth(viewDate) + 1).map(i => {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), i)
      const disabled = time.dateOutOfRange(date, minDate, maxDate)

      return (
        <CalendarDay
          key={i}
          day={i}
          disabled={disabled}
          onClick={!disabled ? handleDayClick.bind( i) : null}
          selectedDate={selectedDate}
          viewDate={viewDate}
        />
      )
    })
  }

  let render = () => {
    return (
      <div className={style.month}>
        <span className={style.title}>
          {time.getFullMonth(viewDate)} {viewDate.getFullYear()}
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
  prop onChange:? func = Flint.noop
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
    if (onChange) onChange(value, event)
    let active = false
  }

  let render = () => {
    const { value } = props
    const date = value ? `${value.getDate()} ${time.getFullMonth(value)} ${value.getFullYear()}` : null

    return (
      <div data-toolbox='date-picker'>
        <Input
          className={style.input}
          error={error}
          onMouseDown={handleInputMouseDown}
          label={label}
          readOnly
          type='text'
          value={date}
        />
        <DatePickerDialog
          active={active}
          className={className}
          maxDate={maxDate}
          minDate={minDate}
          onDismiss={handleDismiss}
          onSelect={handleSelect}
          value={value}
        />
      </div>
    )
  }
}

view CalendarDialog {
  prop active:? bool = false
  prop maxDate:? object
  prop minDate:? object
  prop onDismiss:? func = Flint.noop
  prop onSelect:? func = Flint.noop
  prop value: object = new Date()

  let date = value
  let display = 'months'

  let handleCalendarChange = (value) => {
    display = 'months'
    date = value

    if (time.dateOutOfRange(value, minDate, maxDate)) {
      date = maxDate || minDate
    }
  }

  let handleSelect = (event) => onSelect(date, event)
  let handleSwitchDisplay = _ => display = _

  let actions = [
    { label: 'Cancel', className: style.button, onClick: onDismiss },
    { label: 'Ok', className: style.button, onClick: handleSelect }
  ]

  <Dialog active={active} type="custom" actions={actions}>
      <header className={{ [`display-${display}`]: true }}>
        <year onClick={handleSwitchDisplay.bind( 'years')}>
          {date.getFullYear()}
        </year>
        <date-h3 onClick={handleSwitchDisplay.bind( 'months')}>
          {time.getShortDayOfWeek(date.getDay())}, {time.getShortMonth(date)} {date.getDate()}
        </date-h3>
      </header>

      <wrapper>
        <Calendar
          display={display}
          maxDate={maxDate}
          minDate={minDate}
          onChange={handleCalendarChange}
          selectedDate={date} />
      </wrapper>
  </Dialog>
}

