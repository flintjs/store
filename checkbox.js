view Checkbox {
  prop checked:? bool = false
  prop disabled:? bool = false

  prop label:? any
  prop name:? string
  prop onBlur:? func
  prop onChange:? func
  prop onFocus: func

  let handleToggle = (event) => {
    if (event.pageX !== 0 && event.pageY !== 0) blur()
    if (!disabled && onChange) {
      onChange(!checked, event)
    }
  }

  let blur = () => view.refs.input.blur()
  let focus = () => view.refs.input.focus()

  <label class={{ disabled }}>
    <input
      {...view.props} // remove disabled
      onClick={handleToggle}
      readOnly
      ref='input'
      type='checkbox'
    />
    <Check checked={checked} disabled={disabled}/>
    <text if={label} data-role='label'>{label}</text>
  </label>
}

view Check {
  prop checked:? bool = false
  prop children:? any
  prop onMouseDown:? func = Flint.noop

  <check
    data-role='checkbox'
    onMouseDown={onMouseDown}>
    {children}
  </check>

  // className: style.ripple,
  // spread: 2.6,
  // centered: true
}