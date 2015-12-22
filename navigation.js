import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { vh, unit, percent, seconds } = units

const styles = {
  space: unit(1),
  color: colors.black,
}

view Navigation {
  prop actions:? array = []
  prop children:? node
  prop routes:? array = []
  prop type:? string = 'horizontal'//oneOf(['vertical' 'horizontal'])

  <navigation-nav>
    <Link repeat={routes} {..._} />
    <Button repeat={actions} {..._} />
    {children}
  </navigation-nav>

  // .horizontal {
  //   > [data-react-toolbox='button'], > [data-react-toolbox='link'] {
  //     display: `inline-block`,
  //     margin: 0 navigationSpace / 2,
  //   }
  // }
  //
  // .vertical {
  //   > [data-react-toolbox='button'], > [data-react-toolbox='link'] {
  //     display: `block`,
  //     margin: navigationSpace / 2,
  //   }
  // }
  //
  // .vertical, .horizontal {
  //   padding: navigationSpace / 2,
  //
  //   > [data-react-toolbox='link'] {
  //     color: navigationColor,
  //   }
  // }
}