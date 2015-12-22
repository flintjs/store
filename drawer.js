const styles = {
  drawerBackgroundColor: paletteGrey-50,
  drawerBorderColor: paletteGrey-300,
  drawerTextColor: paletteGrey-800,
  drawerWidth: 24)unit,
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
    @include shadow-2dp(),
    position: `absolute`,
    top: 0,
    display: `block`,
    width: drawerWidth,
    height: percent(100),
    overflowX: `hidden`,
    overflowY: `auto`,
    color: drawerTextColor,
    pointerEvents: `none`,
    backgroundColor: drawerBackgroundColor,
    transitionDelay: seconds(0),
    transitionTimingFunction: animationCurveDefault,
    transitionDuration: animationDuration,
    transitionProperty: transform,
    transform-style: preserve-3d,
    will-change: transform,
    &.active {
      pointerEvents: all,
      transitionDelay: animationDelay,
      transform: translateX(0),
    }
    &.right {
      right: 0,
      borderLeft: 1 solid drawerBorderColor,
      &:not(.active) {
        transform: translateX(percent(100)),
      }
    }
    &.left {
      left: 0,
      borderRight: 1 solid drawerBorderColor,
      &:not(.active) {
        transform: translateX(- percent(100)),
      }
    }
  }
}