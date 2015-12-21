view Link {
  prop active:? bool = false
  prop count:? number
  prop icon:? string
  prop label: string

  <a {...view.props} class={{ active }}>
    <FontIcon if={icon} class="icon" value={icon} />
    <abbr if={label}>{label}</abbr>
    <small if={count && parseInt(count) !== 0}>{count}</small>
  </a>
}