view Drawer {
  prop active:? bool = false
  prop children:? Node
  prop onOverlayClick:? func = Flint.noop
  prop type:? string = 'left'//oneOf(['left' 'right'])

  <Overlay active={active} onClick={onOverlayClick}>
    <drawer>
      <content-aside>
        {children}
      </content-aside>
    </drawer>
  </Overlay>
}