view FontIcon {
  prop children:? any
  prop value: string

  <fonticon yield class={['material-icons', null]}>
    {value}
    {children}
  </fonticon>
}
