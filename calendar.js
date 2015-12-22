const styles = {
  datepickerPrimary: colorPrimary,
  datepickerPrimaryContrast: colorPrimaryContrast,
  datepickerPrimaryDark: colorPrimaryDark,
  datepickerPrimaryColor: datepickerPrimary,
  datepickerPrimaryHoverColor: rgba(datepickerPrimary, 0.20),
  datepickerPrimaryContrastColor: datepickerPrimaryContrast,
  datepickerPrimaryDarkColor: datepickerPrimaryDark,
  datepickerDialogWidth: 33)unit,
  datepickerInactiveOpacity: .6,
  datepickerWeekdayLineHeight: 2)unit,
  datepickerWeekdayFontSize: fontSizeSmall,
  datepickerMonthFontSize: fontSizeBig,
  datepickerDayFontSize: 5)unit,
  datepickerDayLineHeight: 4)unit,
  datepickerYearFontSize: fontSizeSmall,

  calendarPrimary: colorPrimary,
  calendarPrimaryContrast: colorPrimaryContrast,
  calendarPrimaryColor: calendarPrimary,
  calendarPrimaryContrastColor: calendarPrimaryContrast,
  calendarPrimaryHoverColor: rgba(calendarPrimary, 0.21),
  calendarArrowsColor: paletteGrey-600,
  calendarArrowsFontSize: 2)unit,
  calendarYearFontSize: 2.4,
  calendarDayFontSize: 1.3)unit,
  calendarDayDisableOpacity: 0.25,
  calendarRowHeight: 3)unit,
  calendarDayPadding: .2)unit,
  calendarTitleHeight: 3.6)unit,
  calendarTotalHeight: calendarRowHeight * 7 + calendarTitleHeight + calendarDayPadding * 12,
}

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

  .root {
    position: `relative`,
    height: calendarTotalHeight,
    overflow: `hidden`,
    fontSize: fontSizeSmall,
    lineHeight: calendarRowHeight,
    textAlign: `center`,
    background: calendarPrimaryContrastColor,
    .prev, .next {
      position: `absolute`,
      top: 0,
      zIndex: zIndexHigh,
      height: 3.6)unit,
      cursor: `pointer`,
      opacity: .7,
    }
    .prev {
      left: 0,
    }
    .next {
      right: 0,
    }
  }

  .title {
    display: `inline-block`,
    font-weight: 500,
    lineHeight: calendarRowHeight,
  }

  .years {
    height: percent(100),
    overflowY: `auto`,
    fontSize: fontSizeBig,
    > li {
      lineHeight: 2.4,
      cursor: `pointer`,
      &.active {
        fontSize: calendarYearFontSize,
        color: calendarPrimaryColor,
      }
    }
  }
}



view Day {
  prop day:? number
  prop disabled:? bool
  prop onClick:? func = Flint.noop
  prop selectedDate:? object
  prop viewDate: object

  let isSelected = () => {
    const sameYear = viewDate.getFullYear() === selectedDate.getFullYear()
    const sameMonth = viewDate.getMonth() === selectedDate.getMonth()
    const sameDay = day === selectedDate.getDate()
    return sameYear && sameMonth && sameDay
  }

  <day class={{ active, disabled }}>
    <inner onClick={onClick}>
      {day}
    </inner>
  </day>

  $ = {
    marginLeft: day === 1 ? `${time.getFirstWeekDay(viewDate) * 100 / 7}%` : 0,
    flex: 0 0 (percent(100) / 7),
    padding: calendarDayPadding,
    > span {
      display: `inline-block`,
      width: calendarRowHeight,
      height: calendarRowHeight,
      lineHeight: calendarRowHeight,
      borderRadius: percent(50),
    }
    &:hover:not(.active):not(.disabled) > span {
      color: calendarPrimaryContrastColor,
      background: calendarPrimaryHoverColor,
    }
    &.active > span {
      color: calendarPrimaryContrastColor,
      background: calendarPrimaryColor,
    }
    &:hover:not(.disabled) > span {
      cursor: `pointer`,
    }
    &.disabled {
      opacity: calendarDayDisableOpacity,
    }
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

  <title>
    {time.getFullMonth(viewDate)} {viewDate.getFullYear()}
  </title>
  <week>{renderWeeks()}</week>
  <days>{renderDays()}</days>

  $ = {
    backgroundColor: calendarPrimaryContrastColor,
  }

  $week = {
    display: `flex`,
    height: calendarRowHeight,
    flexWrap: `wrap`,
    fontSize: calendarDayFontSize,
    lineHeight: calendarRowHeight,
    opacity: .5,
    > span {
      flex: 0 0 (percent(100) / 7),
    }
  }

  $days = {
    display: flex,
    flexWrap: `wrap`,
    fontSize: calendarDayFontSize,
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

  .input > [role="input"] {
    cursor: `pointer`,
  }

  .header {
    padding: 1.6 * $unit 2)unit,
    color: datepickerPrimaryContrastColor,
    cursor: `pointer`,
    backgroundColor: datepickerPrimaryColor,
  }

  .year {
    display: `inline-block`,
    fontSize: datepickerYearFontSize,
    transition: opacity, fontSize animationDuration animationCurveDefault,
  }

  .date {
    display: `block`,
    font-weight: fontWeightSemiBold,
    textTransform: capitalize,
    transition: opacity animationDuration animationCurveDefault,
  }

  .wrapper {
    padding: $unit .5 * $unit 0,
  }

  .display-years {
    .date {
      opacity: datepickerInactiveOpacity,
    }
    .year {
      fontSize: fontSizeNormal,
    }
  }

  .display-months {
    .year {
      opacity: datepickerInactiveOpacity,
    }
  }
}

