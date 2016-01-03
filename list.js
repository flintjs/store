import { fns, palette } from './prelude'

let { calc, rgb, rgba, translateX, translateY, translateZ } = fns
let { colors, units, effects } = palette()
let { unit, percent, seconds } = units

let horizontalPadding = unit(1.6)
let contentLeftSpacing = unit(7.2)
let itemIconSize = unit(1.8)

const styles = {
  verticalPadding: unit(.8),
  horizontalPadding,
  contentLeftSpacing,
  subheaderHeight: unit(4.8),
  subheaderFontSize: unit(1.4),
  subheaderFontWeight: 500,
  dividerHeight: unit(.1),

  itemMinHeight: unit(4.8),
  itemMinHeightLegend: unit(7.2),
  itemHoverColor: colors.grey200,
  itemLegendMarginTop: unit(.3),
  itemIconFontSize: unit(2.4),
  itemIconSize,
  itemRightIconMargin: contentLeftSpacing - horizontalPadding - itemIconSize,
  itemAvatarHeight: unit(4),
  itemAvatarMargin: unit(.8),
}

view List {
  prop children:? node
  prop ripple:? bool = false
  prop selectable: bool = false

  <list-ul>
    {React.Children.map(children, (item) => {
      if (item.type === 'List.Item') {
        return React.cloneElement(item, {
          ripple: ripple,
          selectable: selectable
        })
      } else {
        return item
      }
    })}
  </list-ul>

  $ = {
    position: `relative`,
    display: `inline-block`,
    width: percent(100),
    padding: [styles.verticalPadding, 0],
    textAlign: `left`,
    whiteSpace: `nowrap`,
    listStyle: `none`,
  }

  // $checkbox {
  //   display: flex,
  //   width: percent(100),
  //   minHeight: styles.itemMinHeight,
  //   alignItems: `center`,
  //   margin: 0,
  //   cursor: `pointer`,
  //   > [data-role='checkbox'] {
  //     marginRight: styles.itemRightIconMargin,
  //   }
  //   > [data-role='label'] {
  //     paddingLeft: 0,
  //   }
  // }

  // .ripple {
  //   color: colorTextSecondary,
  // }


  //
  // .right, .left {
  //   display: flex,
  //   alignItems: `center`,
  //   verticalAlign: middle,
  //   &.icon {
  //     fontSize: styles.itemIconFontSize,
  //     color: colors.textSecondary,
  //   }
  // }
  //
  // .right {
  //   marginLeft: styles.horizontalPadding,
  // }
  //
  // .left {
  //   &.icon {
  //     width: listItemIconSize,
  //     marginRight: styles.itemRightIconMargin,
  //   }
  // }
}

view List.Checkbox {
  prop caption: string

  prop checked:? bool = false
  prop disabled:? bool = false
  prop legend:? string
  prop name:? string
  prop onBlur:? func = Flint.noop
  prop onChange:? func = Flint.noop
  prop onFocus:? func = Flint.noop

  <listcheckbox-li class={{ legend, disabled }}>
    <Checkbox
      checked={checked}
      disabled={disabled}
      label={<List.ItemContent caption={caption} legend={legend} />}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  </listcheckbox-li>
}

view List.Divider {
  prop inset:? bool = false

  <listdivider-hr class={{ inset }} />

  $ = {
    height: styles.dividerHeight,
    margin: [-styles.dividerHeight, 0, 0],
    backgroundColor: colors.divider,
    border: 0,

    // &.inset {
    //   marginRight: styles.horizontalPadding,
    //   marginLeft: styles.contentLeftSpacing,
    // }
    // .list + & {
    //   marginTop: - styles.verticalPadding,
    // }
    // .listItem ~ & {
    //   margin: styles.verticalPadding 0,
    // }
  }
}

view List.Item {
  prop caption: string

  prop avatar:? string
  prop children:? any
  prop disabled:? bool = false
  prop leftIcon:? string
  prop legend:? string
  prop onClick:? func = Flint.noop
  prop onMouseDown:? func = Flint.noop
  prop rightIcon:? string
  prop ripple:? bool = false
  prop selectable:? bool = false
  prop to: string

  let handleClick = event => !disabled && onClick(event)
  let wrapProps = () => to ? { tagName: 'a', href: to } : {}

  <listitem-li onClick={handleClick} onMouseDown={onMouseDown}>
    <wrap {...wrapProps()}>
      <inner>
        <FontIcon if={leftIcon} class="icon left" value={leftIcon} />
        <img if={avatar} class="avatar" src={avatar} />
        <List.ItemContent caption={caption} legend={legend} />
        <FontIcon if={rightIcon} class="icon right" value={rightIcon} />
      </inner>
      {children}
    </wrap>
  </listitem-li>

  $ = {
    position: `relative`,
  }

  $listitem = {
    position: `relative`,
    display: `flex`,
    minHeight: styles.itemMinHeight,
    alignItems: `center`,
    padding: [0, styles.horizontalPadding],
    color: colors.text,
  }

  $inner = [
    selectable && !disabled && {
      hover: {
        cursor: `pointer`,
        backgroundColor: styles.itemHoverColor,
      }
    },

    disabled && {
      pointerEvents: `none`
    }

    // &:not(.checkboxItem) {
    //   opacity: .5,
    // }
    // > .checkbox > [data-role='label'] {
    //   opacity: .5,
    // }
    // &.withLegend {
    //   height: listItem-minHeight-legend,
    // }
  ]

  $text = {
    flexGrow: 1,
  }

  $avatar = {
    display: `flex`,
    flex: `0 0 auto`,
    width: styles.itemAvatarHeight,
    height: styles.itemAvatarHeight,
    margin: [styles.itemAvatarMargin, styles.horizontalPadding, styles.itemAvatarMargin, 0],
    overflow: `hidden`,
    borderRadius: percent(50),
  }
}

view List.ItemContent {
  prop caption: string
  prop legend: any

  <caption>{caption}</caption>
  <legend>{legend}</legend>

  $caption = {
    display: `block`,
    fontSize: units.fontSizeNormal,
    color: colors.text,
  }

  $legend = {
    display: `block`,
    paddingTop: styles.itemLegendMarginTop,
    fontSize: units.fontSizeSmall,
    color: colors.textSecondary,
    whiteSpace: `normal`,
  }
}

view List.SubHeader {
  prop caption:? string

  <h5>{caption}</h5>

  $h5 = {
    paddingLeft: styles.horizontalPadding,
    margin: [-styles.verticalPadding, 0, 0],
    fontSize: styles.subheaderFontSize,
    fontWeight: styles.subheaderFontWeight,
    lineHeight: styles.subheaderHeight,
    color: colors.textSecondary,
  }
}