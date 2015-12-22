
view List {
  prop children:? node
  prop ripple:? bool = false
  prop selectable: bool = false

  <ul>
    {React.Children.map(children, (item) => {
      if (item.type === ListItem) {
        return React.cloneElement(item, {
          ripple: ripple,
          selectable: selectable
        })
      } else {
        return React.cloneElement(item)
      }
    })}
  </ul>
}

view ListCheckbox {
  prop caption: string

  prop checked:? bool = false
  prop disabled:? bool = false
  prop legend:? string
  prop name:? string
  prop onBlur:? func = Flint.noop
  prop onChange:? func = Flint.noop
  prop onFocus:? func = Flint.noop

  <listcheckbox-li class={{ legend, disabled }}>
    <Checkbox
      checked={checked}
      className={style.checkbox}
      disabled={disabled}
      label={<ListItemContent caption={caption} legend={legend} />}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  </listcheckbox-li>
}

view ListDivider {
  prop inset:? bool = false

  <listdivider-hr class={{ inset }} />
}

view ListItem {
  prop caption: string

  prop avatar:? string
  prop children:? any
  prop disabled:? bool = false
  prop leftIcon:? string
  prop legend:? string
  prop onClick:? func = Flint.noop
  prop rightIcon:? string
  prop ripple:? bool = false
  prop selectable:? bool = false
  prop to: string

  let handleClick = event => !disabled && onClick(event)

  let renderContent = () =>
      <span class={{ legend, disabled, selectable }}>
        {leftIcon ? <FontIcon className={`${style.icon} ${style.left}`} value={leftIcon} /> : null}
        {avatar ? <img className={style.avatar} src={avatar} /> : null}
        <ListItemContent caption={caption} legend={legend} />
        {rightIcon ? <FontIcon className={`${style.icon} ${style.right}`} value={rightIcon} /> : null}
      </span>

  <listitem-li onClick={handleClick} onMouseDown={onMouseDown}>
    {to ? <a href={to}>{renderContent()}</a> : renderContent()}
    {children}
  </listitem-li>
}

view ListItemContent {
  prop caption: string
  prop legend: any

  <caption>{caption}</caption>
  <legend>{legend}</legend>
}

view ListSubHeader {
  prop caption:? string

  <h5>{caption}</h5>
}