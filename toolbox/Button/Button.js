import { button, text } from './Style'

view ToolboxButton {
  prop accent:? bool = false
  prop children:? node
  prop disabled:? bool
  prop flat:? bool = false
  prop floating:? bool = false
  prop href:? string
  prop icon:? string | element
  prop inverse:? bool
  prop label:? string
  prop mini:? bool = false
  prop onMouseLeave:? func
  prop onMouseUp:? func
  prop primary:? bool = false
  prop raised:? bool = false
  prop squared:? bool
  prop toggle:? bool = false
  prop type:? string

  // Avoid keeping active after click
  const handleMouseUp = () => {
    view.refs.button.blur()
    onMouseUp && onMouseUp()
  }

  // Avoid keeping active after click when leaving button
  const handleMouseLeave = () => {
    view.refs.button.blur()
    onMouseLeave && onMouseLeave()
  }

  // Retrieve final props for button element
  const resolveProps = (props) => {
    const { href, onMouseUp, onMouseLeave, ...other } = props
    return {
      ref: 'button',
      href: href,
      onMouseLeave: handleMouseLeave,
      onMouseUp: handleMouseUp,
      tagName: href ? 'a' : 'button',
      ...other
    }
  }

  <button {...resolveProps(view.props)}>
    <text>
      {label}
      {children}
    </text>
  </button>

  $button = button({squared: true})
  $text = text()
}
