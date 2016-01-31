let route = x => `/${x.toLowerCase()}`
let isActive = s => Flint.router.isActive(route(s))

view Main {
  let examples = [
    'All',
    'Input',
    'Autocomplete',
    'Layout',
    'Button',
    'Card',
    'Dropdown',
    'List',
    'Modal',
    'Slider',
  ]

  <Toolbox route='/toolbox' />

  <layout>
    <nav>
      <a repeat={examples}
         class={{active: isActive(_) }}
         onClick={Flint.router.link(_.toLowerCase())}>{_}</a>
    </nav>
    <body>
      <examples if={!isActive('all')} repeat={examples}>
        <example route={route(_)}>
          {view.el(`${_}Example`)}
        </example>
      </examples>
      <example route="/all">
        <examples repeat={examples}>
          <example if={_ !== 'all'}>
            {view.el(`${_}Example`)}
          </example>
        </examples>
      </example>
    </body>
  </layout>

  $layout = {
    display: 'flex',
    flexFlow: 'row'
  }

  $nav = {
    flexFlow: 'column',
    padding: [0, 20],
    width: 240
  }

  $a = {
    color: '#333',
    cursor: 'pointer',
    display: 'block',
    fontSize: 20,
    marginTop: 20,
    textDecoration: 'none'
  }

  $active = {
    fontWeight: 'bold',
  }

  $body = {
    flexGrow: 1
  }
}

view InputExample {
  let values = { normal: 'Javier Velasco Arjona' }
  const handleChange = (name, value) => { values[name] = value }

  <inputlist>
    <Input error='Use a Twitter username' type='text' value={values.normal} label='Twitter username' onChange={handleChange.bind(this, 'normal')} maxLength={12} />
    <Input type='tel' icon='phone' value={values.withIcon} label='With icon' onChange={handleChange.bind(this, 'withIcon')} />
    <Input type='email' value={values.fixedLabel} label='Label fixed' floating={false} onChange={handleChange.bind(this, 'fixedLabel')} />
    <Input type='text' value='Read only' readOnly label='Phone Number' />
    <Input type='text' label='Disabled field' disabled />
  </inputlist>

  $inputlist = {
    display: `block`,
    paddingTop: 30,
    paddingRight: 40,
  }
}

view AutocompleteExample {
  let value

  const source = {
    'ES-es': 'Spain',
    'TH-th': 'Thailand',
    'EN-gb': 'England',
    'EN-en': 'USA'
  }

  const handleChange = (v) => {
    value = v
  }

  <Autocomplete
    label='Favorite artist'
    multiple
    onChange={handleChange}
    source={source}
    value={value}
  />
}

view LayoutExample {
  <Row>
    <Col>1</Col>
    <Col>2</Col>
    <Col>3</Col>
  </Row>
  <Row>
    <Col>1</Col>
    <Col>2</Col>
    <Col>3</Col>
    <Col>4</Col>
    <Col>5</Col>
    <Col>6</Col>
  </Row>
  <Row>
    <Col repeat={12}>{_}</Col>
  </Row>

  $Col = {
    background: '#eee',
    padding: 10,
    margin: 10
  }
}

view SliderExample {
  let slider1
  let slider2 = 5
  let slider3 = 1

  <p>Normal slider</p>
  <Slider value={slider1} onChange={_ => slider1 = _} />
  <p>With steps, initial value and editable</p>
  <Slider min={0} max={10} editable value={slider2} onChange={_ => slider2 = _} />
  <p>Pinned and with snaps</p>
  <Slider pinned snaps min={0} max={10} step={1} editable value={slider3} onChange={_ => slider3 = _} />
}

view ModalExample {
  let active = false

  let handleToggle = () => {
    active = !active
  }

  let actions = [
    { label: "Cancel", onClick: handleToggle },
    { label: "Save", onClick: handleToggle }
  ]
  <Button onClick={handleToggle}>
    Show Modal
  </Button>
  <ModalExample.DeleteFile />

  <Modal
    actions={actions}
    active={active}
    title='My awesome dialog'
    onOverlayClick={handleToggle}>
    <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
  </Modal>
}

view ModalExample.DeleteFile {
  let text = "Delete file?"
  let active = false

  function commit() {
    text = "Deleted."
    active = false
    on.delay(1000, () => text = "Delete File?")
  }
  <Button onClick={() => active = true}>{text}</Button>
  <h3>(file delete modal active {active.toString()})</h3>
  <Modal active={active}
         actions={[
           { label: 'Yes', onClick: commit },
           { label: 'No', onClick: () => active = false },
         ]}>
    <p>Are you sure?</p>
  </Modal>
}

view CardExample {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  const widerCard = { width: 345 }

  // Basic card with color header and subtitle headline
  <Card style={widerCard}>
    <Card.Media aspectRatio="wide" style={{backgroundColor: '#3f51b5'}}>
      <Card.Title>Basic Card</Card.Title>
    </Card.Media>
    <Card.Title subtitle="You can also use a subtitle like this" />
    <Card.Text>{lorem}</Card.Text>
  </Card>

  // Card with background image and overlayed content
  <Card style={widerCard}>
    <Card.Media
      contentOverlay
      aspectRatio="square"
      image="https://placeimg.com/700/700/nature"
    >
      <Card.Title
        title="Title goes here"
        subtitle="Subtitle here"
      />
      <Card.Actions>
        <Button inverse label="Action 1" />
        <Button inverse label="Action 2" />
      </Card.Actions>
    </Card.Media>
  </Card>

  // Video card with avatar header, media video and buttons
  <Card style={widerCard}>
    <Card.Title
      title="Video card"
      subtitle="Subtitle here"
      avatar="https://placeimg.com/80/80/animals"
    />
    <Card.Media aspectRatio="wide">
      <iframe
        allowFullScreen
        frameBorder="0"
        height="720"
        src="https://www.youtube.com/embed/mb6Jc4juSF8?rel=0&amp;showinfo=0"
        width="1280"
      />
    </Card.Media>
    <Card.Text>
      {lorem}
    </Card.Text>
    <Card.Actions>
      <IconButton icon="share" />
    </Card.Actions>
  </Card>

  // Small card with image and controls
  <Card>
    <Card.Media aspectRatio="square" image="https://placeimg.com/400/400/nature">
      <Card.Title>Test</Card.Title>
    </Card.Media>
    <Card.Actions style={{justifyContent: 'center'}}>
      <IconButton icon="thumb_down" />
      <IconButton icon="thumb_up" />
      <IconButton icon="turned_in_not" />
    </Card.Actions>
  </Card>

  // Music cover example with controls and squared image
  <Card style={{width: 140}}>
    <Card.Media
      contentOverlay
      aspectRatio="square"
      image="https://placeimg.com/280/280/people"
    >
      <Card.Actions style={{justifyContent: 'center'}}>
        <IconButton inverse icon="fast_rewind" />
        <IconButton inverse icon="play_arrow" />
        <IconButton inverse icon="fast_forward" />
      </Card.Actions>
    </Card.Media>
  </Card>

  // Complete example with avatar header, media, title and text body
  <Card style={widerCard}>
    <Card.Title
      title="Avatar style title"
      subtitle="Subtitle here"
      avatar="https://placeimg.com/80/80/animals"
    />
    <Card.Media
      aspectRatio="wide"
      image="https://placeimg.com/800/450/nature"
    />
    <Card.Title
      title="Simple title"
      subtitle="Subtitle here"
    />
    <Card.Text>
      {lorem}
    </Card.Text>
  </Card>

  // Smaller example with media image, avatar header and action buttons
  <Card>
    <Card.Title
      avatar="https://placeimg.com/80/80/animals"
      title="Avatar Card"
      subtitle="An awesome basic card"
    />
    <Card.Media
      aspectRatio="wide"
      image="https://placeimg.com/800/450/nature"
    />
    <Card.Actions style={{ justifyContent: 'flex-end' }}>
      <IconButton icon="share" />
      <IconButton icon="favorite" />
    </Card.Actions>
  </Card>

  // Alternative layout with small image, title, subtitle and actions
  <Card>
    <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
      <Card.Title
        title="Title goes here"
        subtitle="Subtitle here"
      />
      <Card.Media
        style={{width: 80, height: 80, margin: [16, 16, 0, 0]}}
        image="https://placeimg.com/400/400/nature"
      />
    </div>
    <Card.Actions>
      <Button label="Action 1" />
      <Button label="Action 2" />
    </Card.Actions>
  </Card>

  // Another alternative layout with a bigger image and without actions
  <Card>
    <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
      <Card.Title
        title="Title goes here"
        subtitle="Subtitle here"
      />
      <Card.Media
        style={{width: 140, height: 140, margin: 16}}
        image="https://placeimg.com/400/400/nature"
      />
    </div>
  </Card>

  // Text card with title, subtitle and a couple of paragraphs
  <Card style={widerCard}>
    <Card.Title title="Hello World" subtitle="Subtitle here" />
    <Card.Text>{lorem}</Card.Text>
    <Card.Text>{lorem}</Card.Text>
  </Card>

  $ = {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100vw',
    width: '100%'
  }

  $Card = {
    display: 'flex',
    margin: 10,
  }
}

view GithubIcon {
  <svg root viewBox="0 0 284 277">
    <g><path d="M141.888675,0.0234927555 C63.5359948,0.0234927555 0,63.5477395 0,141.912168 C0,204.6023 40.6554239,257.788232 97.0321356,276.549924 C104.12328,277.86336 106.726656,273.471926 106.726656,269.724287 C106.726656,266.340838 106.595077,255.16371 106.533987,243.307542 C67.0604204,251.890693 58.7310279,226.56652 58.7310279,226.56652 C52.2766299,210.166193 42.9768456,205.805304 42.9768456,205.805304 C30.1032937,196.998939 43.9472374,197.17986 43.9472374,197.17986 C58.1953153,198.180797 65.6976425,211.801527 65.6976425,211.801527 C78.35268,233.493192 98.8906827,227.222064 106.987463,223.596605 C108.260955,214.426049 111.938106,208.166669 115.995895,204.623447 C84.4804813,201.035582 51.3508808,188.869264 51.3508808,134.501475 C51.3508808,119.01045 56.8936274,106.353063 65.9701981,96.4165325 C64.4969882,92.842765 59.6403297,78.411417 67.3447241,58.8673023 C67.3447241,58.8673023 79.2596322,55.0538738 106.374213,73.4114319 C117.692318,70.2676443 129.83044,68.6910512 141.888675,68.63701 C153.94691,68.6910512 166.09443,70.2676443 177.433682,73.4114319 C204.515368,55.0538738 216.413829,58.8673023 216.413829,58.8673023 C224.13702,78.411417 219.278012,92.842765 217.804802,96.4165325 C226.902519,106.353063 232.407672,119.01045 232.407672,134.501475 C232.407672,188.998493 199.214632,200.997988 167.619331,204.510665 C172.708602,208.913848 177.243363,217.54869 177.243363,230.786433 C177.243363,249.771339 177.078889,265.050898 177.078889,269.724287 C177.078889,273.500121 179.632923,277.92445 186.825101,276.531127 C243.171268,257.748288 283.775,204.581154 283.775,141.912168 C283.775,63.5477395 220.248404,0.0234927555 141.888675,0.0234927555" /></g>
  </svg>
}

view ButtonExample {
  <tests>
    <Button href='http://github.com' target='_blank' raised icon={<GithubIcon />}>
      Github
    </Button>
    <Button icon='bookmark' label='Bookmark' accent />
    <Button icon='bookmark' label='Bookmark' raised primary disabled />
    <Button icon='inbox' label='Inbox' flat />
    <Button icon='add' floating />
    <Button icon='add' floating accent mini />
    <IconButton icon='favorite' accent />
    <IconButton icon={<GithubIcon />} primary />
    <IconButton icon={<GithubIcon />} />
    <Button label='Submit' raised primary />
    <Button icon='add' label='Add this' flat primary />
  </tests>

  $tests = {
    display: 'block',
    flexGrow: 1
  }
}


view ListExample {
  let checkbox = false

  let handleCheckboxChange = () => {
    checkbox = !checkbox
  }

  <List selectable ripple>
    <List.SubHeader caption='Explore characters' />
    <List.Item
      avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
      caption='Dr. Manhattan'
      legend="Jonathan 'Jon' Osterman"
      rightIcon='star'
    />
    <List.Item
      avatar='https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg'
      caption='Ozymandias'
      legend='Adrian Veidt'
      rightIcon='star'
    />
    <List.Item
      avatar='https://dl.dropboxusercontent.com/u/2247264/assets/r.jpg'
      caption='Rorschach'
      legend='Walter Joseph Kovacs'
      rightIcon='star'
    />
    <List.SubHeader caption='Configuration' />
    <List.Checkbox
      caption='Notify new comics'
      checked={checkbox}
      legend='You will receive a notification when a new one is published'
      onChange={handleCheckboxChange}
    />
    <List.Item caption='Contact the publisher' leftIcon='send' />
    <List.Item caption='Remove this publication' leftIcon='delete' />
  </List>
}

view DropdownExample {
  let selected = 3

  const albums = [
    { value: 1, artist: 'Radiohead', album: 'In Rainbows', img: 'http://www.clasesdeperiodismo.com/wp-content/uploads/2012/02/radiohead-in-rainbows.png' },
    { value: 2, artist: 'QOTSA', album: 'Sons for the Deaf', img: 'http://static.musictoday.com/store/bands/93/product_large/MUDD6669.JPG' },
    { value: 3, artist: 'Kendrick Lamar', album: 'Good Kid Maad City', img: 'https://cdn.shopify.com/s/files/1/0131/9332/products/0bd4b1846ba3890f574810dbeddddf8c.500x500x1_grande.png?v=1425070323' },
    { value: 4, artist: 'Pixies', album: 'Doolittle', img: 'http://www.resident-music.com/image/cache/data/Emilys_Packshots/Pixies/Pixies_Doolittlke-500x500.jpg' }
  ]

  let handleChange = val => {
    selected = val
  }

  let customItem = (item) => {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row'
    }

    const imageStyle = {
      display: 'flex',
      width: 32,
      height: 32,
      flexGrow: 0,
      marginRight: '8px',
      backgroundColor: '#ccc'
    }

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2
    }

    return (
      <div style={containerStyle}>
        <img src={item.img} style={imageStyle}/>
        <div style={contentStyle}>
          <strong>{item.artist}</strong>
          <small>{item.album}</small>
        </div>
      </div>
    )
  }

  <Dropdown
    auto={false}
    source={albums}
    onChange={handleChange}
    label='Select your favorite album'
    template={customItem}
    value={selected}
  />
}
