import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects, type } = palette()
let { em, unit, percent, seconds } = units

const styles = {
  backgroundColor: '#fff',
  colorWhite: '#fff',
  fontSize: unit(1.4),
  padding: unit(1.6),
  paddingLarge: unit(2),
  paddingSmall: unit(.8),
  textOverlay: rgba([0,0,0], 0.35)
}

view Card {
  prop children:? any
  prop raised:? bool

  <card class={{ raised }} yield />

  $ = [
    {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      overflow: 'hidden',
      fontSize: styles.fontSize,
      background: styles.backgroundColor,
      borderRadius: unit(.2),
    },
    effects.shadow2dp()
  ]
  $raised = effects.shadow8dp()
}

view Card.Title {
  prop avatar:? string | object
  prop children:? string | object | array
  prop title:? string
  prop subtitle:? string

  let titleContent, subtitleContent, small, large

  on.props(() => {
    titleContent = title || typeof children === 'string' && children
    subtitleContent = subtitle || typeof children !== 'string' && children
    small = !!avatar
    large = !avatar
  })

  <Avatar class="avatar" if={avatar && typeof avatar === 'string'} image={avatar} />
  <avatar if={avatar && typeof avatar !== 'string'}>{avatar}</avatar>
  <text>
    <h5 class="title" if={titleContent}>{titleContent}</h5>
    <p class="subtitle" if={subtitleContent}>{subtitleContent}</p>
  </text>

  $ = [
    {
      display: `flex`,
      alignItems: 'center'
    },
    small && {
      padding: styles.padding
    },
    large && {
      padding: [
        styles.paddingLarge,
        styles.padding,
        unit(styles.padding + .2)
      ]
    }
  ]

  $avatar = {
    marginRight: unit(1.3),
  }

  $title = [
    large && {
      ...type.headline(),
      lineHeight: 1.25
    },
    small && {
      ...type.body2({ preferred: true }),
      lineHeight: 1.4
    }
  ]

  $subtitle = [
    { color: colors.textSecondary },
    small && {
      fontWeight: 500,
      lineHeight: 1.4
    }
  ]
}

view Card.Media {
  prop aspectRatio:? string // "wide" | "square"
  prop children:? any
  prop color:? string
  prop contentOverlay:? bool
  prop image:? string | object

  let ratio

  on.props(() => {
    ratio = ratio || 'wide'
  })

  <cardmedia root class={{ [aspectRatio]: true }}>
    <inner yield />
  </cardmedia>

  $cardmedia = {
    backgroundColor: color,
    backgroundImage: typeof image == 'string' ? `url('${image}')` : undefined,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 0,
    position: 'relative',
    width: '100%'
  }

  $wide = {
    paddingTop: '56.25%'
  }

  $square = {
    paddingTop: '100%'
  }

  $inner = {
    height: '100%',
    position: 'absolute',
    top: 0
  }

  const mediaContentItem = { maxWidth: '100%', maxHeight: '100%' }
  $iframe = mediaContentItem
  $video  = mediaContentItem
  $image  = mediaContentItem
}

view Card.Actions {
  prop children: any

  view.render(() =>
    view.mapElements(children, child => {
      if (view.getName(child) === 'Button')
        return view.clone(child, { class: 'actionbutton' })
      return child
    })
  )

  $actionbutton = {
    minWidth: 0,
    padding: [0, styles.paddingSmall],
    margin: [0, styles.paddingSmall / 2],
  }

  $ = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: styles.paddingSmall
  }
}

view Card.Text {
  prop children:? any

  <p>{children}</p>

  $p = {
    position: 'relative',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    padding: [ styles.padding, styles.padding ],

    lastChild: {
      paddingBottom: styles.paddingLarge
    }
  }
}
