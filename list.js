
view List {
  prop children:? node
  prop ripple:? bool = false
  prop selectable: bool = false

  renderItems () {
    return React.Children.map(props.children, (item) => {
      if (item.type === ListItem) {
        return React.cloneElement(item, {
          ripple: props.ripple,
          selectable: props.selectable
        })
      } else {
        return React.cloneElement(item)
      }
    })
  }

  render () {
    let className = style.list
    if (props.className) className += ` ${props.className}`
    return (
      <ul className={className}>
        {renderItems()}
      </ul>
    )
  }
}





const ListCheckbox = (props) => {
  const className = ClassNames([style.item, style.checkboxItem], {
    [style.withLegend]: props.legend,
    [style.disabled]: props.disabled
  }, props.className)

  return (
    <li className={className}>
      <Checkbox
        checked={props.checked}
        className={style.checkbox}
        disabled={props.disabled}
        label={<ListItemContent caption={props.caption} legend={props.legend} />}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
      />
    </li>
  )
}

ListCheckbox.propTypes = {
  caption:? string.isRequired
  checked:? bool
  className:? string
  disabled:? bool
  legend:? string
  name:? string
  onBlur:? func
  onChange:? func
  onFocus: func
}

ListCheckbox.defaultProps = {
  checked: false,
  disabled: false
}



const ListDivider = ({inset}) => {
  const className = inset ? `${style.divider} ${style.inset}` : style.divider
  return <hr className={className} />
}

ListDivider.propTypes = {
  inset: bool
}

ListDivider.defaultProps = {
  inset: false
}



view ListItem {
  prop avatar:? string
  prop caption:? string.isRequired
  prop children:? any
  prop className:? string
  prop disabled:? bool = false
  prop leftIcon:? string
  prop legend:? string
  prop onClick:? func
  prop rightIcon:? string
  prop ripple:? bool = false
  prop selectable:? bool = false
  prop to: string

  let handleClick = (event) => {
    if (onClick && !disabled) {
      onClick(event)
    }
  }

  renderContent () {
    const className = ClassNames(style.item, {
      [style.withLegend]: legend,
      [style.disabled]: disabled,
      [style.selectable]: selectable
    }, className)

    return (
      <span className={className}>
        {leftIcon ? <FontIcon className={`${style.icon} ${style.left}`} value={leftIcon} /> : null}
        {avatar ? <img className={style.avatar} src={avatar} /> : null}
        <ListItemContent caption={caption} legend={legend} />
        {rightIcon ? <FontIcon className={`${style.icon} ${style.right}`} value={rightIcon} /> : null}
      </span>
    )
  }

  render () {
    return (
      <li className={style.listItem} onClick={handleClick} onMouseDown={onMouseDown}>
        {to ? <a href={to}>{renderContent()}</a> : renderContent()}
        {children}
      </li>
    )
  }
}
  className: style.ripple,
  centered: false
})(ListItem)



const ListItemContent = ({caption, legend}) => (
  <span className={style.text}>
    <span className={style.caption}>{caption}</span>
    <span className={style.legend}>{legend}</span>
  </span>
)

ListItemContent.propTypes = {
  caption:? string.isRequired
  legend: any
}



const ListSubHeader = (props) => {
  let className = style.subheader
  if (props.className) className += ` ${props.className}`
  return <h5 className={className}>{props.caption}</h5>
}

ListSubHeader.propTypes = {
  caption:? string
  className: string
}

