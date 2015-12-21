
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
};

view Form {
  prop attributes:? array
  prop children:? node
  prop className:? string
  prop model:? object
  prop onChange:? func
  prop onError:? func
  prop onSubmit:? func
  prop onValid:? func
  prop storage: React.PropTypes.string

  static defaultProps = {
    attributes: [],
    className: ''
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(event);
  };

  onChange = (field, value, event) => {
    if (this.props.onChange) this.props.onChange(field, value, event);
  };

  renderFields () {
    return Object.keys(this.props.model).map((field, index) => {
      const properties = this.props.model[field];
      const Field = Component[properties.kind.toLowerCase()];
      return <Field key={index} {...properties} onChange={this.onChange.bind(this, field)} />;
    });
  }

  render () {
    const className = `${style.root} ${this.props.className}`;

    return (
      <form data-react-toolbox='form' className={className} onSubmit={this.onSubmit}>
        {this.renderFields()}
        {this.props.children}
      </form>
    );
  }
}
