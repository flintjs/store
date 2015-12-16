view Main {
  <Card>
    <Card.Title
      title="Hello World"
      subtitle="Subtitle here"
      avatar="https://placeimg.com/80/80/animals"
    />
    <Card.Media
      aspectRatio="wide"
      image="https://placeimg.com/800/450/nature"
    />
    <Card.Text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Card.Text>
  </Card>

  $Card = {
    width: 350
  }
}

const shadow2dp = {
  boxShadow: `0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.2)`
}

const UNIT = 1
const cardColorWhite = '#fff'
const cardTextOverlay = '#000'//rgba('#000', 0.35),
const cardBackgroundColor = cardColorWhite
const cardPaddingSm = .8 * UNIT
const cardPadding = 1.6 * UNIT
const cardPaddingLg = 2 * UNIT
const cardFontSize = '1.2em'

const cardFont = {
  padding: '($cardPadding  .2 * UNIT) $cardPadding',

  lastChild: {
    paddingBottom: '$cardPaddingLg',
  },

  text: {
    paddingTop: '0',
  }
}

view Card {
  prop children:? any
  prop raised:? bool

  <card class={{ raised }} yield />

  $ = [shadow2dp, {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    fontSize: cardFontSize,
    background: cardBackgroundColor,
    borderRadius: .2 * UNIT,

    raised: '@include shadow8dp()'
  }]
}

view Card.Actions {
  prop children:? any

  $ = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexStart',
    padding: cardPaddingSm,

    // [dataReactToolboxbutton]: {
    //   minWidth: '0',
    //   padding: `0 ${cardPaddingSm}`,
    //   margin: `0 ${cardPaddingSm} / 2`,
    //
    //   firstChild: {
    //     marginLeft: '0',
    //   },
    //
    //   lastChild: {
    //     marginRight: '0',
    //   }
    // }
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
    backgroundRepeat: 'noRepeat',
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

  view.style = cardFont
}

view Card.Title {
  prop avatar:? string | object
  prop children:? string | object | array
  prop title:? string
  prop subtitle:? string

  let small

  on.props(() => {
    small = avatar
  })

  <Avatar if={typeof avatar == 'string'} image={avatar} />
  <avatar if={typeof avatar == 'object'}>{avatar}</avatar>
  <h5 class="title" if={children && typeof children == 'string'}>{children}</h5>
  <h5 class="subtitle" if={subtitle}>{children}</h5>
  <p class="children" if={children && typeof children != 'string'}>{children}</p>

  $ = [cardFont, {
    padding: small ? 'xyz' : `${cardPaddingLg} ${cardPadding} (${cardPadding + .2 * UNIT} )`,
    display: 'flex',
    alignItems: 'center'
  }]

  $avatar = {
    marginRight: 1.3 * UNIT,
  }

  $subtitle = {
    color: '$colorTextSecondary'
  }

  $title = {
    padding: '',
    lineHeight: small ? 1.5 : 1.25
  }

  $subtitle = [{
      color: 'color-secondary'
    },
    small && {
      fontWeight: 500,
      lineHeight: 1.4
    }
  ]
}