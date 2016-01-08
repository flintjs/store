import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects, type } = palette()
let { em, unit, percent, seconds } = units

const colorWhite = '#fff'

const styles = {
  colorWhite,
  textOverlay: rgba([0,0,0], 0.35),
  backgroundColor: colorWhite,
  paddingSm: unit(.8),
  padding: unit(1.6),
  paddingLg: unit(2),
  fontSize: em(1.2),
}

const cardFont = {
  padding: [unit(styles.padding * .2), styles.cardPadding],
  lastChild: { paddingBottom: styles.cardPaddingLg },
  text: { paddingTop: 0 }
}

view Card {
  prop children:? any
  prop raised:? bool

  <card class={{ raised }} yield />

  $ = [
    effects.shadow2dp(),

    {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      overflow: 'hidden',
      fontSize: styles.fontSize,
      background: styles.backgroundColor,
      borderRadius: unit(.2),
    }
  ]

  $raised = effects.shadow2dp()
}

view Card.Actions {
  prop children: any

  view.render(() =>
    view.clone(children, {
      // pass styles to child buttons
      style: {
        minWidth: 0,
        padding: [0, styles.paddingSm],
        margin: [0, styles.paddingSm / 2],

        firstChild: {
          marginLeft: '0',
        },

        lastChild: {
          marginRight: '0',
        }
      }
    })
  )

  $ = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexStart',
    padding: styles.paddingSm
  }
}

view Card.Media {
  prop aspectRatio:? string // "wide" | "square"
  prop children:? any
  prop color:? string
  prop contentOverlay:? bool
  prop image:? string | object

  <cardmedia class={[aspectRatio, { aspectRatio, contentOverlay }]}>
    <inner yield />
  </cardmedia>

  $ = {
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundColor: color,
    backgroundImage: typeof image == 'string' ? `url('${image}')` : undefined
  }

  $wide = {
    paddingTop: '56.25%'
  }

  $square = {
    paddingTop: '100%'
  }

  $content = {
    position: 'relative',
    top: '0',
    left: '0',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flexEnd',
    overflow: 'hidden',
  }

  $aspectRatio = {
    height: '0',
    width: '100%',

    content: {
      position: 'absolute',
      height: '100%',
    },

    'content > iframe, .content > video, .content > img': {
      maxWidth: '100%',
    }
  }

  // $contentOverlay = {
  //   .cardTitle, .cardActions, .cardText {
  //     backgroundColor: '$cardTextOverlay',
  //   }
  // }
}

view Card.Text {
  prop children:? any

  view.style = styles.font
}

view Card.Title {
  prop avatar:? string | object
  prop children:? string | object | array
  prop title:? string
  prop subtitle:? string

  let small, titleContent

  on.props(() => {
    small = !!avatar
    titleContent = title || children
  })

  <Avatar class="avatar" if={typeof avatar == 'string'} image={avatar} />
  <avatar if={typeof avatar == 'object'}>{avatar}</avatar>
  <text>
    <Title class="title" if={titleContent && typeof titleContent == 'string'}>{titleContent}</Title>
    <Title class="subtitle" subtitle if={subtitle}>{subtitle}</Title>
    <p class="children" if={children && typeof children != 'string'}>{children}</p>
  </text>

  $ = [
    cardFont,

    {
      flexFlow: `row`,
      alignItems: 'center'
    },

    small && {
      padding: styles.padding,
    },

    !small && {
      padding: [styles.paddingLg, styles.padding, unit(styles.padding + .2)]
    }
  ]

  $avatar = {
    marginRight: unit(1.3),
  }

  $title = [
    {
      padding: '',
      lineHeight: small ? 1.5 : 1.25
    },

    !small && type.headline()
  ]

  $subtitle = [
    {
      color: colors.textSecondary
    },

    small && {
      fontSize: 10,
      fontWeight: 500,
      lineHeight: 1.4
    }
  ]
}
