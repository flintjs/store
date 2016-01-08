view Row {
  prop width:? number | string
  prop height:? number | string
  prop auto:? bool
  prop reverse:? bool

  $ = {
    display: `flex`,
    flexGrow: 1,
    flexDirection: !reverse ? `row` : `row-reverse`
  }
}

view Col {
  prop width:? number | string
  prop height:? number | string
  prop auto:? bool
  prop reverse:? bool

  $ = {
    display: `flex`,
    flexGrow: 1,
    flexDirection: !reverse ? `column` : `column-reverse`
  }
}