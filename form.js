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
  prop attributes:? array = []
  prop children:? node
  prop model:? object
  prop onChange:? func = Flint.noop
  prop onError:? func = Flint.noop
  prop onSubmit:? func = Flint.noop
  prop onValid:? func = Flint.noop
  prop storage: string

  let _onSubmit = (event) => {
    event.preventDefault()
    onSubmit(event)
  }

  let renderFields = () => {
    return Object.keys(model).map((field, index) => {
      const properties = model[field]
      const Field = Component[properties.kind.toLowerCase()]
      return <Field key={index} {...properties} onChange={onChange.bind(field)} />
    })
  }

  <form onSubmit={_onSubmit}>
    {renderFields()}
    {children}
  </form>
}
