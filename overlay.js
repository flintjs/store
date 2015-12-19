view Overlay {
  prop active:? bool
  prop children:? node
  prop className:? string
  prop invisible:? bool = false
  prop onClick:? func

  let app, node

  on.mount(() => {
    app = document.querySelector('[data-react-toolbox="app"]') || document.body
    node = document.createElement('div')
    node.setAttribute('data-react-toolbox', 'overlay')
    app.appendChild(node)
    handleRender()
  })

  on.render(handleRender)

  on.unmount(() => {
    ReactDOM.unmountComponentAtNode(node)
    app.removeChild(node)
  })

  function handleRender () {
    ReactDOM.render(
      <div>
        <div onClick={onClick} />
        {children}
      </div>
    , node)
  }

  <noscript />
}