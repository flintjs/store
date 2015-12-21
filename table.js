

view Table {
  prop className:? string
  prop heading:? bool
  prop model:? object
  prop onChange:? func
  prop onSelect:? func
  prop selectable:? bool
  prop selected:? array
  prop source: React.PropTypes.array

  static defaultProps = {
    className: '',
    heading: true,
    selectable: true,
    selected: [],
    source: []
  };

  handleFullSelect = () => {
    if (this.props.onSelect) {
      const {source, selected} = this.props;
      const newSelected = source.length === selected.length ? [] : source.map((i, idx) => idx);
      this.props.onSelect(newSelected);
    }
  };

  handleRowSelect = (index) => {
    if (this.props.onSelect) {
      const position = this.props.selected.indexOf(index);
      const newSelected = [...this.props.selected];
      if (position !== -1) newSelected.splice(position, 1); else newSelected.push(index);
      this.props.onSelect(newSelected);
    }
  };

  handleRowChange = (index, key, value) => {
    if (this.props.onChange) {
      this.props.onChange(index, key, value);
    }
  };

  renderHead () {
    if (this.props.heading) {
      const {model, selected, source, selectable} = this.props;
      const isSelected = selected.length === source.length;
      return (
        <TableHead
          model={model}
          onSelect={this.handleFullSelect}
          selectable={selectable}
          selected={isSelected}
        />
      );
    }
  }

  renderBody () {
    const rows = this.props.source.map((data, index) => {
      return (
        <TableRow
          data={data}
          index={index}
          key={index}
          model={this.props.model}
          onChange={this.handleRowChange.bind(this, index)}
          onSelect={this.handleRowSelect.bind(this, index)}
          selectable={this.props.selectable}
          selected={this.props.selected.indexOf(index) !== -1}
        />
      );
    });

    return <tbody>{rows}</tbody>;
  }

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <table data-react-toolbox='table' className={className}>
        {this.renderHead()}
        {this.renderBody()}
      </table>
    );
  }
}



const TableHead = ({model, onSelect, selectable, selected}) => {
  let selectCell;
  const contentCells = Object.keys(model).map((key) => {
    return <th key={key}>{key}</th>;
  });

  if (selectable) {
    selectCell = (
      <th key='select' className={style.selectable}>
        <Checkbox onChange={onSelect} checked={selected} />
      </th>
    );
  }

  return (
    <thead>
      <tr>{[selectCell, ...contentCells]}</tr>
    </thead>
  );
};

TableHead.propTypes = {
  className:? string
  model:? object
  onSelect:? func
  selected: React.PropTypes.bool
};

TableHead.defaultProps = {
  className: '',
  model: {},
  selected: false
};



view TableRow {
  prop data:? object
  prop model:? object
  prop onChange:? func
  prop onSelect:? func
  prop selectable:? bool
  prop selected: React.PropTypes.bool

  handleInputChange = (key, type, event) => {
    const value = type === 'checkbox' ? event.target.checked : event.target.value;
    this.props.onChange(key, value);
  };

  renderSelectCell () {
    if (this.props.selectable) {
      return (
        <td className={style.selectable}>
          <Checkbox checked={this.props.selected} onChange={this.props.onSelect} />
        </td>
      );
    }
  }

  renderCells () {
    return Object.keys(this.props.model).map((key) => {
      return <td key={key}>{this.renderCell(key)}</td>;
    });
  }

  renderCell (key) {
    const value = this.props.data[key];
    if (this.props.onChange) {
      return this.renderInput(key, value);
    } else if (value) {
      return value.toString();
    }
  }

  renderInput (key, value) {
    const inputType = utils.inputTypeForPrototype(this.props.model[key].type);
    const inputValue = utils.prepareValueForInput(value, inputType);
    const checked = inputType === 'checkbox' && value ? true : null;
    return (
      <input
        checked={checked}
        onChange={this.handleInputChange.bind(null, key, inputType)}
        type={inputType}
        value={inputValue}
      />
    );
  }

  render () {
    const className = ClassNames(style.row, {
      [style.editable]: this.props.onChange,
      [style.selected]: this.props.selected
    });

    return (
      <tr data-react-toolbox-table='row' className={className}>
        {this.renderSelectCell()}
        {this.renderCells()}
      </tr>
    );
  }
}

