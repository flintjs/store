import { fns, palette } from './prelude'
const { colors, units, effects } = palette()
const { em, unit, percent, seconds } = units

const styles = {
  backgroundColor: colors.grey300,
  borderRadius: unit(3.4 / 2),
  clearColor: colors.grey500,
  color: colors.grey700,
  fontSize: unit(1.3),
  height: unit(3.4),
  padding: unit(0.6),
  textPadding: unit(0.4)
}

view Chip {
  prop children:? string
  prop photo:? string | object
  prop title:? string
  prop onRemove:? func = Motion.noop

  <chip>
    <Avatar class="photo" if={photo && typeof photo === 'string'} image={photo} />
    <photo if={photo && typeof photo !== 'string'}>{photo}</photo>
    <text>{ typeof title === 'string' ? title : children }</text>
    { view.props.onRemove ? <FontIcon class="cancel" value="cancel" onClick={onRemove} /> : '' }
  </chip>

  $ = [
    {
      alignItems: 'center',
      backgroundColor: styles.backgroundColor,
      borderRadius: styles.borderRadius,
      display: 'inline-flex',
      flexDirection: 'row',
      fontSize: styles.fontSize,
      justifyContent: 'flex-start',
      lineHeight: styles.height,
      padding: [0, styles.padding],
      position: 'relative'
    },
    photo && {
      paddingLeft: styles.height
    }
  ]

  $photo = {
    height: styles.height,
    left: 0,
    position: 'absolute',
    top: 0,
    width: styles.height
  }

  $text = {
    color: styles.color,
    padding: [0, styles.textPadding],
    whiteSpace: 'nowrap'
  }

  $cancel = {
    color: styles.clearColor,
    cursor: 'pointer',
    display: 'flex',
    fontSize: 20,
    lineHeight: 1,
    verticalAlign: 'middle'
  }
}
