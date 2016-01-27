import { fns, palette } from './prelude'

let { rgba } = fns
let { colors, units, units: { unit }, styles, effects } = palette()

const avatar = {
  color: colors.white,
  background: colors.grey500,
  size: unit(4),
  fontSize: unit(2.4)
}

view Avatar {
  prop children:? Node
  prop icon:? string | Element
  prop image:? string | Element
  prop title: string

  <avatar>
    {children}
    <img class='image' src={image} title={title} />
    <FontIcon if={typeof icon == 'string'} value={icon} />
  </avatar>

  $avatar = {
    position: `relative`,
    display: `inline-block`,
    width: avatar.size,
    height: avatar.size,
    overflow: `hidden`,
    fontSize: avatar.fontSize,
    color: avatar.color,
    textAlign: `center`,
    backgroundColor: avatar.background,
    borderRadius: `50%`,
  }

  $image = {
    position: `absolute`,
    display: `block`,
    width: `100%`,
    height: `100%`,
    backgroundColor: `transparent`,
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    borderRadius: `50%`,
  }

  $letter = {
    display: `block`,
    width: `100%`,
    lineHeight: avatar.size,
  }
}
