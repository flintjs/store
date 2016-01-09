import units, { unit, em } from './units'

const type = {
  preferredFont() {
    return {
      font: units.preferredFont
    }
  },

  display4({ contrast = false, preferred = true } = {}) {
    return {
      // @include typoPreferredFont($usePreferred),
      fontSize: unit(11.2),
      fontWeight: 300,
      lineHeight: 1,
      letterSpacing: em(.04),
      // @if $colorContrast {
      //   opacity: .54,
      // }
    }
  },

  display3({ contrast = false, preferred = true } = {}) {
    return {
      // @include typoPreferredFont($usePreferred),
      fontSize: unit(5.6),
      fontWeight: 400,
      lineHeight: 1.35,
      letterSpacing: em(.02),

      // @if $colorContrast {
      //   opacity: .54,
      // }
    }
  },

  display2({ contrast = false, preferred = true } = {}) {
    return {
      // // @include typoPreferredFont($usePreferred),
      // fontSize: 4.5rem,
      // fontWeight: 400,
      // lineHeight: 4.8rem,
      //
      // // @if $colorContrast {
      // //   opacity: .54,
      // // }
    }
  },

  display1({ contrast = false, preferred = true } = {}) {
    return {
      // @include typoPreferredFont($usePreferred),
      // fontSize: 3.4rem,
      // fontWeight: 400,
      // lineHeight: 4rem,
      //
      // @if $colorContrast {
      //   opacity: .54,
      // }
    }
  },

  headline({ contrast = false, preferred = true } = {}) {
    return {
      ...type.preferredFont({ preferred }),
      fontSize: unit(2.4),
      fontWeight: 400,
      lineHeight: unit(3.2),
      MozOsxFontSmoothing: `grayscale`,
      opacity: contrast ? .87 : `auto`
    }
  },

  title({ contrast = false, preferred = true } = {}) {
    return {
      // @include typoPreferredFont($usePreferred),
      // fontSize: 2rem,
      // fontWeight: 500,
      // lineHeight: 1,
      // letterSpacing: .02em,
      //
      // @if $colorContrast {
      //   opacity: .87,
      // }
    }
  },

  subhead({ contrast = false, preferred = true } = {}) {
    return {
      // @include typoPreferredFont($usePreferred),
      // fontSize: 1.6rem,
      // fontWeight: 400,
      // lineHeight: unit(2.4),
      // letterSpacing: .04em,
      //
      // @if $colorContrast {
      //   opacity: .87,
      // }
    }
  },

  subhead2({ contrast = false, preferred = true } = {}) {
    return {
      // @include typoPreferredFont($usePreferred),
      // fontSize: 1.6rem,
      // fontWeight: 400,
      // lineHeight: 2.8rem,
      // letterSpacing: .04em,
      //
      // @if $colorContrast {
      //   opacity: .87,
      // }
    }
  },

  body2({ contrast = false, preferred = false } = {}) {
    return {
      ...type.preferredFont(),
      fontSize: unit(1.4),
      lineHeight: unit(2.4),
      letterSpacing: 0,
      fontWeight: preferred ? 500 : `bold`,
      opacity: contrast ? .87 : 1,
    }
  },

  body1({ contrast = false, preferred = false } = {}) {
    // @include typoPreferredFont($usePreferred),
    // fontSize: 1.4rem,
    // fontWeight: 400,
    // lineHeight: unit(2.4),
    // letterSpacing: 0,
    //
    // @if $colorContrast {
    //   opacity: .87,
    // }
  },

  caption({ contrast = false, preferred = false } = {}) {
    // @include typoPreferredFont($usePreferred),
    // fontSize: 1.2rem,
    // fontWeight: 400,
    // lineHeight: 1,
    // letterSpacing: 0,
    //
    // @if $colorContrast {
    //   opacity: .54,
    // }
  },

  blockquote({ contrast = false, preferred = true } = {}) {
    return {

    }

    // @include typoPreferredFont($usePreferred),
    // position: relative,
    // fontSize: unit(2.4),
    // fontStyle: italic,
    // fontWeight: 300,
    // lineHeight: 1.35,
    // letterSpacing: .08em,
    //
    // &:before {
    //   position: absolute,
    //   left: .5em,
    //   content: "“",
    // }
    //
    // &:after {
    //   marginLeft: .05em,
    //   content: "”",
    // }
    //
    // @if $colorContrast {
    //   opacity: .54,
    // }
  },

  menu({ contrast = false, preferred = true } = {}) {
    return {

    }

    // @include typoPreferredFont($usePreferred),
    // fontSize: 1.4rem,
    // fontWeight: 500,
    // lineHeight: 1,
    // letterSpacing: 0,
    //
    // @if $colorContrast {
    //   opacity: .87,
    // }
  },

  button({ contrast = false, preferred = true } = {}) {
    return {

    }

    // @include typoPreferredFont($usePreferred),
    // fontSize: 1.4rem,
    // fontWeight: 500,
    // lineHeight: 1,
    // textTransform: uppercase,
    // letterSpacing: 0,
    //
    // @if $colorContrast {
    //   opacity: .87,
    // }
  },
}

export default type