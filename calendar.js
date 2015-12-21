

view Calendar {
  prop display:? oneOf(['months', 'years'])
  prop maxDate:? object
  prop minDate:? object
  prop onChange:? func
  prop selectedDate:? object
  prop viewDate: React.PropTypes.object

  static defaultProps = {
    display: 'months',
    selectedDate: new Date()
  };

  state = {
    viewDate: this.props.selectedDate
  };

  componentDidUpdate () {
    if (this.refs.activeYear) {
      this.scrollToActive();
    }
  }

  scrollToActive () {
    this.refs.years.scrollTop =
      this.refs.activeYear.offsetTop -
      this.refs.years.offsetHeight / 2 +
      this.refs.activeYear.offsetHeight / 2;
  }

  handleDayClick = (day) => {
    this.props.onChange(time.setDay(this.state.viewDate, day));
  };

  handleYearClick = (year) => {
    const viewDate = time.setYear(this.props.selectedDate, year);
    this.setState({viewDate});
    this.props.onChange(viewDate);
  };

  changeViewMonth = (direction, step) => {
    this.setState({
      direction,
      viewDate: time.addMonths(this.state.viewDate, step)
    });
  };

  renderYear (year) {
    const props = {
      className: year === this.state.viewDate.getFullYear() ? style.active : '',
      key: year,
      onClick: this.handleYearClick.bind(this, year)
    };

    if (year === this.state.viewDate.getFullYear()) {
      props.ref = 'activeYear';
    }

    return <li {...props}>{year}</li>;
  }

  renderYears () {
    return (
      <ul data-react-toolbox='years' ref="years" className={style.years}>
        {utils.range(1900, 2100).map((i) => { return this.renderYear(i); })}
      </ul>
    );
  }

  renderMonths () {
    const animation = this.state.direction === 'left' ? SlideLeft : SlideRight;
    return (
      <div data-react-toolbox='calendar'>
        <IconButton className={style.prev} icon='chevron_left' onClick={this.changeViewMonth.bind(this, 'left', -1)} />
        <IconButton className={style.next} icon='chevron_right' onClick={this.changeViewMonth.bind(this, 'right', 1)} />
        <CssTransitionGroup transitionName={animation} transitionEnterTimeout={350} transitionLeaveTimeout={350}>
          <CalendarMonth
            key={this.state.viewDate.getMonth()}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            viewDate={this.state.viewDate}
            selectedDate={this.props.selectedDate}
            onDayClick={this.handleDayClick}
          />
        </CssTransitionGroup>
      </div>
    );
  }

  render () {
    return (
      <div className={style.root}>
        {this.props.display === 'months' ? this.renderMonths() : this.renderYears()}
      </div>
    );
  }
}



view Day {
  prop day:? number
  prop disabled:? bool
  prop onClick:? func
  prop selectedDate:? object
  prop viewDate: React.PropTypes.object

  dayStyle () {
    if (this.props.day === 1) {
      return {
        marginLeft: `${time.getFirstWeekDay(this.props.viewDate) * 100 / 7}%`
      };
    }
  }

  isSelected () {
    const sameYear = this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear();
    const sameMonth = this.props.viewDate.getMonth() === this.props.selectedDate.getMonth();
    const sameDay = this.props.day === this.props.selectedDate.getDate();
    return sameYear && sameMonth && sameDay;
  }

  render () {
    const className = ClassNames(style.day, {
      [style.active]: this.isSelected(),
      [style.disabled]: this.props.disabled
    });

    return (
      <div data-react-toolbox='day' className={className} style={this.dayStyle()}>
        <span onClick={this.props.onClick}>
          {this.props.day}
        </span>
      </div>
    );
  }
}



view Month {
  prop maxDate:? object
  prop minDate:? object
  prop onDayClick:? func
  prop selectedDate:? object
  prop viewDate: React.PropTypes.object

  handleDayClick = (day) => {
    if (this.props.onDayClick) this.props.onDayClick(day);
  };

  renderWeeks () {
    return utils.range(0, 7).map(i => {
      return <span key={i}>{time.getFullDayOfWeek(i).charAt(0)}</span>;
    });
  }

  renderDays () {
    return utils.range(1, time.getDaysInMonth(this.props.viewDate) + 1).map(i => {
      const date = new Date(this.props.viewDate.getFullYear(), this.props.viewDate.getMonth(), i);
      const disabled = time.dateOutOfRange(date, this.props.minDate, this.props.maxDate);

      return (
        <CalendarDay
          key={i}
          day={i}
          disabled={disabled}
          onClick={!disabled ? this.handleDayClick.bind(this, i) : null}
          selectedDate={this.props.selectedDate}
          viewDate={this.props.viewDate}
        />
      );
    });
  }

  render () {
    return (
      <div data-react-toolbox='month' className={style.month}>
        <span className={style.title}>
          {time.getFullMonth(this.props.viewDate)} {this.props.viewDate.getFullYear()}
        </span>
        <div className={style.week}>{this.renderWeeks()}</div>
        <div className={style.days}>{this.renderDays()}</div>
      </div>
    );
  }
}




view DatePicker {
  prop className:? string
  prop error:? string
  prop label:? string
  prop maxDate:? object
  prop minDate:? object
  prop onChange:? func
  prop value: React.PropTypes.object

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
    const { value } = this.props;
    const date = value ? `${value.getDate()} ${time.getFullMonth(value)} ${value.getFullYear()}` : null;

    return (
      <div data-toolbox='date-picker'>
        <Input
          className={style.input}
          error={this.props.error}
          onMouseDown={this.handleInputMouseDown}
          label={this.props.label}
          readOnly
          type='text'
          value={date}
        />
        <DatePickerDialog
          active={this.state.active}
          className={this.props.className}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          onDismiss={this.handleDismiss}
          onSelect={this.handleSelect}
          value={this.props.value}
        />
      </div>
    );
  }
}



view CalendarDialog {
  prop active:? bool
  prop className:? string
  prop maxDate:? object
  prop minDate:? object
  prop onDismiss:? func
  prop onSelect:? func
  prop value: React.PropTypes.object

  static defaultProps = {
    active: false,
    className: '',
    value: new Date()
  };

  state = {
    date: this.props.value,
    display: 'months'
  };

  handleCalendarChange = (value) => {
    const state = {display: 'months', date: value};
    if (time.dateOutOfRange(value, this.props.minDate, this.props.maxDate)) {
      state.date = this.props.maxDate || this.props.minDate;
    }
    this.setState(state);
  };

  handleSelect = (event) => {
    if (this.props.onSelect) this.props.onSelect(this.state.date, event);
  };

  handleSwitchDisplay = (display) => {
    this.setState({ display });
  };

  actions = [
    { label: 'Cancel', className: style.button, onClick: this.props.onDismiss },
    { label: 'Ok', className: style.button, onClick: this.handleSelect }
  ];

  render () {
    const display = `display-${this.state.display}`;
    const className = ClassNames(style.dialog, this.props.className);
    const headerClassName = ClassNames(style.header, style[display]);

    return (
      <Dialog active={this.props.active} type="custom" className={className} actions={this.actions}>
          <header className={headerClassName}>
            <span className={style.year} onClick={this.handleSwitchDisplay.bind(this, 'years')}>
              {this.state.date.getFullYear()}
            </span>
            <h3 className={style.date} onClick={this.handleSwitchDisplay.bind(this, 'months')}>
              {time.getShortDayOfWeek(this.state.date.getDay())}, {time.getShortMonth(this.state.date)} {this.state.date.getDate()}
            </h3>
          </header>

          <div className={style.wrapper}>
            <Calendar
              display={this.state.display}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onChange={this.handleCalendarChange}
              selectedDate={this.state.date} />
          </div>
      </Dialog>
    );
  }
}

