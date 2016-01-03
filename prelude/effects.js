export default {
  shadow2dp: () => ({
    boxShadow: `0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 1px 2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.2)`
  }),

  focusShadow: () => ({
    boxShadow: `0 0 8px rgba(0, 0, 0, .18), 0 8px 16px rgba(0, 0, 0, .36)`,
  }),

  shadow2dp: () => ({
    boxShadow: `0 2px 2px 0 rgba(0, 0, 0, shadowKeyPenumbraOpacity),
                  0 3px 1px 2px rgba(0, 0, 0, shadowKeyUmbraOpacity),
                  0 1px 5px 0 rgba(0, 0, 0, shadowAmbientShadowOpacity)`,
  }),

  shadow3dp: () => ({
    boxShadow: `0 3px 4px 0 rgba(0, 0, 0, shadowKeyPenumbraOpacity),
                  0 3px 3px 2px rgba(0, 0, 0, shadowKeyUmbraOpacity),
                  0 1px 8px 0 rgba(0, 0, 0, shadowAmbientShadowOpacity)`,
  }),

  shadow4dp: () => ({
    boxShadow: `0 4px 5px 0 rgba(0, 0, 0, shadowKeyPenumbraOpacity),
                  0 1px 10px 0 rgba(0, 0, 0, shadowAmbientShadowOpacity),
                  0 2px 4px 1px rgba(0, 0, 0, shadowKeyUmbraOpacity)`,
  }),

  shadow6dp: () => ({
    boxShadow: `0 6px 10px 0 rgba(0, 0, 0, shadowKeyPenumbraOpacity),
                  0 1px 18px 0 rgba(0, 0, 0, shadowAmbientShadowOpacity),
                  0 3px 5px 1px rgba(0, 0, 0, shadowKeyUmbraOpacity)`,
  }),

  shadow8dp: () => ({
    boxShadow: `0 8px 10px 1px rgba(0, 0, 0, shadowKeyPenumbraOpacity),
                  0 3px 14px 2px rgba(0, 0, 0, shadowAmbientShadowOpacity),
                  0 5px 5px 3px rgba(0, 0, 0, shadowKeyUmbraOpacity)`,
  }),

  shadow16dp: () => ({
    boxShadow: `0 16px 24px 2px rgba(0, 0, 0, shadowKeyPenumbraOpacity),
                  0 6px 30px 5px rgba(0, 0, 0, shadowAmbientShadowOpacity),
                  0 8px 10px 5px rgba(0, 0, 0, shadowKeyUmbraOpacity)`,
  }),

  // Animations
  materialAnimationFastOutSlowIn: (duration = .2) => ({
    transitionTimingFunction: animationCurveFastOutSlowIn,
    transitionDuration: duration,
  }),

  materialAnimationLinearOutSlowIn: (duration = .2) => ({
    transitionTimingFunction: animationCurveLinearOutSlowIn,
    transitionDuration: duration,
  }),

  materialAnimationFastOutLinearIn: (duration = .2) => ({
    transitionTimingFunction: animationCurveFastOutLinearIn,
    transitionDuration: duration,
  }),

  materialAnimationDefault: (duration = .2) => ({
    transitionTimingFunction: animationCurveDefault,
    transitionDuration: duration,
  }),

  noWebkitScrollbar: {
    WebkitScrollbar: {
      width: 0,
      height: 0,
    },
  },

  btnColors(name, color, background, hover) {
    // .#{name}:not([disabled]) {
    //   &.raised, &.floating {
    //     color: color,
    //     background: background,
    //   },
    //   &.flat, &.toggle {
    //     color: background,
    //     &:focus:not(:active) {
    //       background: hover,
    //     },
    //   },
    //   &.flat:hover {
    //     background: hover,
    //   },
    // },
  },
}