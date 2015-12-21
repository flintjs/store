
const Component = {
  'autocomplete': Autocomplete,
  'button': Button,
  'checkbox': Checkbox,
  'datepicker': DatePicker,
  'dropdown': Dropdown,
  'input': Input,
  'radioGroup': RadioGroup,
  'slider': Slider,
  'switch': Switch,
  'timepicker': TimePicker
}

view Form {
  prop attributes:? array
  prop children:? node
  prop className:? string
  prop model:? object
  prop onChange:? func
  prop onError:? func
  prop onSubmit:? func
  prop onValid:? func
  prop storage: string

  static defaultProps = {
    attributes: [],
    className: ''
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (props.onSubmit) props.onSubmit(event)
  }

  onChange = (field, value, event) => {
    if (props.onChange) props.onChange(field, value, event)
  }

  renderFields () {
    return Object.keys(props.model).map((field, index) => {
      const properties = props.model[field]
      const Field = Component[properties.kind.toLowerCase()]
      return <Field key={index} {...properties} onChange={onChange.bind( field)} />
    })
  }

  render () {
    const className = `${style.root} ${props.className}`

    return (
      <form data-react-toolbox='form' className={className} onSubmit={onSubmit}>
        {renderFields()}
        {props.children}
      </form>
    )
  }
}
