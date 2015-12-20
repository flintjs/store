

view Title {
  prop children:? any
  prop tag:? string

  <title tagName={tag}>
    {children}
  </title>

  $ = {
    fontSize: `2rem`,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: `.02em`,
  }
}