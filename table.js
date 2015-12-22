const styles = {
  tableRowHeight: 48,
  tableRowDivider: solid 1 rgba(0,0,0,.12),
  tableRowOffset: 1.8)unit,
  tableRowHighlight: #eee,
  tableTextColor: #757575,
}

view Table {
  prop className:? string
  prop heading:? bool
  prop model:? object
  prop onChange:? func
  prop onSelect:? func
  prop selectable:? bool
  prop selected:? array
  prop source: array

  static defaultProps = {
    className: '',
    heading: true,
    selectable: true,
    selected: [],
    source: []
  }

  handleFullSelect = () => {
    if (props.onSelect) {
      const {source, selected} = props
      const newSelected = source.length === selected.length ? [] : source.map((i, idx) => idx)
      props.onSelect(newSelected)
    }
  }

  handleRowSelect = (index) => {
    if (props.onSelect) {
      const position = props.selected.indexOf(index)
      const newSelected = [...props.selected]
      if (position !== -1) newSelected.splice(position, 1) else newSelected.push(index)
      props.onSelect(newSelected)
    }
  }

  handleRowChange = (index, key, value) => {
    if (props.onChange) {
      props.onChange(index, key, value)
    }
  }

  renderHead () {
    if (props.heading) {
      const {model, selected, source, selectable} = props
      const isSelected = selected.length === source.length
      return (
        <TableHead
          model={model}
          onSelect={handleFullSelect}
          selectable={selectable}
          selected={isSelected}
        />
      )
    }
  }

  renderBody () {
    const rows = props.source.map((data, index) => {
      return (
        <TableRow
          data={data}
          index={index}
          key={index}
          model={props.model}
          onChange={handleRowChange.bind( index)}
          onSelect={handleRowSelect.bind( index)}
          selectable={props.selectable}
          selected={props.selected.indexOf(index) !== -1}
        />
      )
    })

    return <tbody>{rows}</tbody>
  }

  render () {
    let className = style.root
    if (props.className) className += ` ${props.className}`
    return (
      <table data-react-toolbox='table' className={className}>
        {renderHead()}
        {renderBody()}
      </table>
    )
  }
}



const TableHead = ({model, onSelect, selectable, selected}) => {
  let selectCell
  const contentCells = Object.keys(model).map((key) => {
    return <th key={key}>{key}</th>
  })

  if (selectable) {
    selectCell = (
      <th key='select' className={style.selectable}>
        <Checkbox onChange={onSelect} checked={selected} />
      </th>
    )
  }

  return (
    <thead>
      <tr>{[selectCell, ...contentCells]}</tr>
    </thead>
  )
}

TableHead.propTypes = {
  className:? string
  model:? object
  onSelect:? func
  selected: bool
}

TableHead.defaultProps = {
  className: '',
  model: {},
  selected: false
}



view TableRow {
  prop data:? object
  prop model:? object
  prop onChange:? func
  prop onSelect:? func
  prop selectable:? bool
  prop selected: bool

  handleInputChange = (key, type, event) => {
    const value = type === 'checkbox' ? event.target.checked : event.target.value
    props.onChange(key, value)
  }

  renderSelectCell () {
    if (props.selectable) {
      return (
        <td className={style.selectable}>
          <Checkbox checked={props.selected} onChange={props.onSelect} />
        </td>
      )
    }
  }

  renderCells () {
    return Object.keys(props.model).map((key) => {
      return <td key={key}>{renderCell(key)}</td>
    })
  }

  renderCell (key) {
    const value = props.data[key]
    if (props.onChange) {
      return renderInput(key, value)
    } else if (value) {
      return value.toString()
    }
  }

  renderInput (key, value) {
    const inputType = utils.inputTypeForPrototype(props.model[key].type)
    const inputValue = utils.prepareValueForInput(value, inputType)
    const checked = inputType === 'checkbox' && value ? true : null
    return (
      <input
        checked={checked}
        onChange={handleInputChange.bind(null, key, inputType)}
        type={inputType}
        value={inputValue}
      />
    )
  }

  render () {
    const className = ClassNames(style.row, {
      [style.editable]: props.onChange,
      [style.selected]: props.selected
    })

    return (
      <tr data-react-toolbox-table='row' className={className}>
        {renderSelectCell()}
        {renderCells()}
      </tr>
    )
  }
}

// .root {
//   width: percent(100),
//   fontSize: fontSizeTiny,
//   color: tableTextColor,
//   textAlign: left,
//   tr {
//     height: tableRowHeight,
//     lineHeight: tableRowHeight,
//     borderBottom: tableRowDivider,
//   }
//   th {
//     font-weight: fontWeightBold,
//     &:first-letter {
//       textTransform: capitalize,
//     }
//   }
//   th, td {
//     position: `relative`,
//     padding: 0 tableRowOffset,
//     &.selectable {
//       width: 1.8)unit,
//       paddingRight: 0,
//       > * {
//         margin: 0,
//       }
//     }
//   }
// }
//
// .row {
//   transition: backgroundColor animationDuration animationCurveDefault,
//   &:last-child {
//     borderColor: `transparent`,
//   }
//   > td {
//     > input {
//       display: `block`,
//       width: percent(100),
//       backgroundColor: `transparent`,
//       border: 0,
//     }
//   }
// }
//
// .selected, .row:hover {
//   backgroundColor: tableRowHighlight,
// }
//
// .editable > * {
//   cursor: `pointer`,
// }