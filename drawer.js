const styles = {
  backgroundColor: colors.grey50,
  borderColor: colors.grey300,
  textColor: colors.grey800,
  width: unit(24),
}

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

  $ = {
    // @include shadow-2dp(),
    position: `absolute`,
    top: 0,
    display: `block`,
    width: styles.width,
    height: percent(100),
    overflowX: `hidden`,
    overflowY: `auto`,
    color: styles.textColor,
    pointerEvents: `none`,
    backgroundColor: styles.backgroundColor,
    transitionDelay: seconds(0),
    transitionTimingFunction: `animationCurveDefault`,
    transitionDuration: `animationDuration`,
    transitionProperty: `transform`,
    transformStyle: `preserve-3d`,
    willChange: `transform`,
  }

  $active = {
    pointerEvents: `all`,
    transitionDelay: `animationDelay`,
    transform: translateX(0),
  }

  $right = {
    right: 0,
    borderLeft: [1, `solid`, styles.borderColor],
    transform: !active ? translateX(percent(100)) : `auto`,
  }

  $left = {
    left: 0,
    borderRight: [1, `solid`, styles.borderColor],
    transform: !active ? translateX(- percent(100)) : `auto`,
  }
}