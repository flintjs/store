import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects, type } = palette()
let { em, unit, percent, seconds } = units

const styles = {
  backgroundColor: '#fff',
  colorWhite: '#fff',
  fontSize: unit(1.4),
  padding: unit(1.6),
  paddingLarge: unit(2.0),
  paddingSmall: unit(0.8),
  textOverlay: rgba([0,0,0], 0.35)
}

view Card {
  prop children:? any
  prop raised:? bool

  <card class={{ raised }}>
    {view.mapElements(children, child => {
      const arrayChildren = Array.isArray(children) ? children : [ children ]
      const index = arrayChildren.indexOf(child)
      const prevName = index !== 0 ? view.getName(arrayChildren[index - 1]) : null
      const currName = view.getName(child)

      if (index !== 0 &&
        [ 'Card.Title', 'Card.Text' ].includes(currName) &&
        [ 'Card.Title', 'Card.Text' ].includes(prevName)) {
        return view.clone(child, { style: { paddingTop: 0 } })
      }

      return child
    })}
  </card>

  $ = [
    {
      background: styles.backgroundColor,
      borderRadius: unit(.2),
      display: 'flex',
      flexDirection: 'column',
      fontSize: styles.fontSize,
      overflow: 'hidden',
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
  prop overlay:? bool
  prop contrast:? bool

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
      alignItems: 'center',
      display: `flex`
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
    },
    overlay && { background: styles.textOverlay },
    contrast && { color: styles.colorWhite }
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
    overlay && { color: styles.colorWhite },
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
    <inner>
      {view.mapElements(children, child => {
        const arrayChildren = Array.isArray(children) ? children : [ children ]
        const name = view.getName(child)
        let childProps = {}

        if ([ 'Card.Title', 'Card.Actions', 'Card.Text' ].includes(name)) {
          childProps.contrast = true
          childProps.overlay = contentOverlay
        }

        return view.clone(child, childProps)
      })}
    </inner>
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
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden'
  }

  $iframe = { maxWidth: '100%' }
  $video  = { maxWidth: '100%' }
  $image  = { maxWidth: '100%' }
}

view Card.Actions {
  prop children: any
  prop contrast:? bool
  prop overlay:? bool

  view.render(() =>
    view.mapElements(children, child => {
      if (view.getName(child) === 'Button')
        return view.clone(child, {
          class: 'actionbutton',
          style: {
            minWidth: 0,
            padding: [0, styles.paddingSmall],
            margin: [0, styles.paddingSmall / 2],
          }
        })
      return child
    })
  )

  $actionbutton = {
    margin: [0, styles.paddingSmall / 2],
    fistChild: { marginLeft: 0 },
    lastChild: { marginRight: 0 }
  }

  $ = [
    {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-start',
      padding: styles.paddingSmall,
    },
    overlay && { background: styles.textOverlay },
    contrast && { color: styles.colorWhite }
  ]
}

view Card.Text {
  prop children:? any

  <p root>{children}</p>

  $ = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    left: 0,
    overflow: 'hidden',
    padding: [ styles.padding, styles.padding ],
    position: 'relative',
    top: 0,
    width: '100%'
  }
}
