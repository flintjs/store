import { palette, translateY } from './prelude'

let { units, units: { unit, vw }, colors, effects } = palette()

const modal = {
  borderRadius: unit(.2),
  colorTitle: colors.black,
  colorWhite: colors.white,
  contentPadding: unit(2.4),
  navigationPadding: unit(.8),
  translateY: unit(4),
}

view Modal {
  prop actions:? array = []
  prop active:? bool = false
  prop children:? any
  prop onOverlayClick:? func
  prop title:? string
  prop type:? string = 'normal'

  view.inlineStyles()

  <Overlay active={active} onClick={onOverlayClick}>
    <window class={{ active }}>
      <section role="body">
        <Title tag="h6" if={title}>{title}</Title>
        {children}
      </section>
      <nav role="navigation">
        <Button
          repeat={actions}
          action={_}
        />
      </nav>
    </window>
  </Overlay>

  $window = {
    display: `flex`,
    maxWidth: vw(96),
    maxHeight: vw(96),
    flexDirection: `column`,
    backgroundColor: colors.white,
    borderRadius: modal.borderRadius,
    boxShadow: units.zdepthShadow5,
    opacity: 0,
    transitionDelay: units.animationDelay,
    transitionTimingFunction: units.animationCurveDefault,
    transitionDuration: units.animationDuration,
    transitionProperty: `opacity, transform`,
    transform: translateY(modal.translateY),
  }

  $active = {
    opacity: 1,
    transform: translateY(0),
  }

  $small = {
    width: vw(30),
  }

  $normal = {
    width: vw(50),
  }

  $large = {
    width: vw(96),
  }

  $section = {
    flexGrow: 2,
    padding: modal.contentPadding,
    overflowY: `auto`,
    color: colors.textSecondary,
  }

  $Title = {
    flexGrow: 0,
    marginBottom: unit(1.6),
    color: colors.black,
  }

  $navigation = {
    flexGrow: 0,
    padding: modal.navigationPadding,
    textAlign: `right`,
  }

  $button = {
    minWidth: 0,
    paddingRight: modal.navigationPadding,
    paddingLeft: modal.navigationPadding,
    marginLeft: modal.navigationPadding,
  }
}