view FontIcon {
  prop children:? any
  prop value: string
  // prop class:? any

  <fonticon yield class={['material-icons', null]}>
    {value}
    {children}
  </fonticon>
}