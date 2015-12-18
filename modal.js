view Modal {
  prop actions:? array = []
  prop active:? bool = false
  prop children:? any
  prop onOverlayClick:? func
  prop title:? string
  prop type:? string = 'normal'

  <Overlay active={active} onClick={onOverlayClick}>
    <modal>
      <section role="body">
        <h6 if={title}>{title}</h6>
        {children}
      </section>
      <nav role="navigation">
        <Button
          repeat={actions}
          action={_}
        />
      </nav>
    </modal>
  </Overlay>

  $modal = {
    display: `flex`,
    maxWidth: `96vw`,
    maxHeight: `96vh`,
    flexDirection: `column`,
    backgroundColor: palette.dialogColorWhite,
    borderRadius: palette.dialogBorderRadius,
    boxShadow: palette.zdepthShadow5,
    opacity: 0,
    transitionDelay: palette.animationDelay,
    transitionTimingFunction: palette.animationCurveDefault,
    transitionDuration: palette.animationDuration,
    transitionProperty: opacity, transform,
    transform: translateY(palette.dialogTranslateY),
    &.active {
      opacity: 1,
      transform: translateY(0%),
    }
  }

  .small {
    width: 30vw,
  }

  .normal {
    width: 50vw,
  }

  .large {
    width: 96vw,
  }

  .title {
    @include typoTitle(),
    flexGrow: 0,
    marginBottom: 1.6 * palette.unit,
    color: palette.dialogColorTitle,
  }

  .body {
    flexGrow: 2,
    padding: palette.dialogContentPadding,
    overflowY: auto,
    color: palette.colorTextSecondary,
  }

  .navigation {
    flexGrow: 0,
    padding: palette.dialogNavigationPadding,
    textAlign: right,
  }

  .button {
    minWidth: 0,
    paddingRight: palette.dialogNavigationPadding,
    paddingLeft: palette.dialogNavigationPadding,
    marginLeft: palette.dialogNavigationPadding,
  }
}