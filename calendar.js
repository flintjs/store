let datepickerPrimary  = colors.primary
let datepickerPrimaryContrast = colors.primaryContrast
let datepickerPrimaryDark = colors.primaryDark
let primary = colors.primary
let primaryContrast = colors.primaryContrast
let rowHeight = unit(3)
let dayPadding = unit(.2)
let titleHeight = unit(3.6)

const styles = {
  datepickerPrimary,
  datepickerPrimaryContrast,
  datepickerPrimaryDark,
  datepickerPrimaryColor: datepickerPrimary,
  datepickerPrimaryHoverColor: rgba(datepickerPrimary, 0.20),
  datepickerPrimaryContrastColor: datepickerPrimaryContrast,
  datepickerPrimaryDarkColor: datepickerPrimaryDark,
  datepickerDialogWidth: unit(33),
  datepickerInactiveOpacity: .6,
  datepickerWeekdayLineHeight: unit(2),
  datepickerWeekdayFontSize: fontSizeSmall,
  datepickerMonthFontSize: fontSizeBig,
  datepickerDayFontSize: unit(5),
  datepickerDayLineHeight: unit(4),
  datepickerYearFontSize: fontSizeSmall,

  primary,
  primaryContrast,
  primaryColor: primary,
  primaryContrastColor: primaryContrast,
  primaryHoverColor: rgba(primary, 0.21),
  arrowsColor: colors.grey600,
  arrowsFontSize: unit(2),
  yearFontSize: 2.4,
  dayFontSize: unit(1.3),
  dayDisableOpacity: 0.25,
  rowHeight,
  dayPadding,
  titleHeight,
  totalHeight: rowHeight * 7 + titleHeight + dayPadding * 12,
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
    <IconButton class="prev" icon='chevron_left' onClick={changeViewMonth.bind( 'left', -1)} />
    <IconButton class="next" icon='chevron_right' onClick={changeViewMonth.bind( 'right', 1)} />
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

  $ = {
    position: `relative`,
    height: styles.totalHeight,
    overflow: `hidden`,
    fontSize: fontSizeSmall,
    lineHeight: styles.rowHeight,
    textAlign: `center`,
    background: styles.primaryContrastColor,
  }

  const move = {
    position: `absolute`,
    top: 0,
    zIndex: units.zIndexHigh,
    height: units(3.6),
    cursor: `pointer`,
    opacity: .7,
  }

  $prev = [move, { left: 0 }]
  $next = [move, { right: 0 }]

  $years = {
    height: percent(100),
    overflowY: `auto`,
    fontSize: fontSizeBig,
  }

  $li = {
    lineHeight: 2.4,
    cursor: `pointer`,
  }

  $active = {
    fontSize: styles.yearFontSize,
    color: styles.primaryColor,
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
    flex: `0 0 (${percent(100) / 7})`,
    padding: styles.dayPadding,
  }

  $inner = [
    {
      display: `inline-block`,
      width: styles.rowHeight,
      height: styles.rowHeight,
      lineHeight: styles.rowHeight,
      borderRadius: percent(50),

      hover: {
        cursor: `pointer`
      }
    },

    disabled && {
      opacity: styles.dayDisableOpacity,

      hover: {
        cursor: `auto`
      }
    },

    active && {
      color: styles.primaryContrastColor,
      background: styles.primaryColor,
    },

    !active && !disabled && {
      hover: {
        color: styles.primaryContrastColor,
        background: styles.primaryHoverColor,
      }
    }
  ]
}



view Month {
  prop maxDate:? object
  prop minDate:? object
  prop onDayClick:? func = Flint.noop
  prop selectedDate:? object
  prop viewDate: object

  let handleDayClick = (day) => onDayClick(day)

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
  <week>
    <weekletter repeat={range(0, 7)}>
      {time.getFullDayOfWeek(i).charAt(0)}
    </weekletter>
  </week>
  <days>{renderDays()}</days>

  $ = {
    backgroundColor: styles.primaryContrastColor,
  }

  $title = {
    display: `inline-block`,
    fontWeight: 500,
    lineHeight: styles.rowHeight,
  }

  $week = {
    display: `flex`,
    height: styles.rowHeight,
    flexWrap: `wrap`,
    fontSize: styles.dayFontSize,
    lineHeight: styles.rowHeight,
    opacity: .5,
  }

  $weekletter = {
    flex: `0 0 (${percent(100) / 7})`,
  }

  $days = {
    display: `flex`,
    flexWrap: `wrap`,
    fontSize: styles.dayFontSize,
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

  let date
  let active = false

  on.props(() => {
    date = value ? `${value.getDate()} ${time.getFullMonth(value)} ${value.getFullYear()}` : null
  })

  let handleDismiss = () => {
    active = false
  }

  let handleInputMouseDown = (event) => {
    events.pauseEvent(event)
    active = true
  }

  let handleSelect = (value, event) => {
    onChange(value, event)
    active = false
  }

  <Input
    // className={style.input}
    error={error}
    onMouseDown={handleInputMouseDown}
    label={label}
    readOnly
    type='text'
    value={date}
  />
  <DatePickerDialog
    active={active}
    // className={className}
    maxDate={maxDate}
    minDate={minDate}
    onDismiss={handleDismiss}
    onSelect={handleSelect}
    value={value}
  />
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
    <header>
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

  $header = {
    padding: [unit(1.6), unit(2)],
    color: styles.datepickerPrimaryContrastColor,
    cursor: `pointer`,
    backgroundColor: styles.datepickerPrimaryColor,
  }

  $year = {
    display: `inline-block`,
    transition: `opacity, fontSize animationDuration animationCurveDefault`,
    fontSize: display == 'years' ? styles.fontSizeNormal : styles.datepickerYearFontSize,
    opacity: display == 'months' ? styles.datepickerInactiveOpacity : `auto`,
  }

  $date = {
    display: `block`,
    fontWeight: styles.fontWeightSemiBold,
    textTransform: `capitalize`,
    transition: `opacity animationDuration animationCurveDefault`,
    opacity: display == 'years' ? styles.datepickerInactiveOpacity : `auto`,
  }

  $wrapper = {
    padding: [unit(.5), unit(0)],
  }
}