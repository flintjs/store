const styles = {
  verticalPadding: unit(.8),
  horizontalPadding: unit(1.6),
  contentLeftSpacing: unit(7.2),
  subheaderHeight: unit(4.8),
  subheaderFontSize: unit(1.4),
  subheaderFontWeight: 500,
  dividerHeight: unit(.1),

  itemMinHeight: unit(4.8),
  itemMinHeightLegend: unit(7.2),
  itemHoverColor: colors.grey200,
  itemLegendMarginTop: unit(.3),
  itemIconFontSize: unit(2.4),
  itemIconSize: unit(1.8),
  itemRightIconMargin: listContentLeftSpacing - listHorizontalPadding - listItemIconSize,
  itemAvatarHeight: unit(4),
  itemAvatarMargin: unit(.8),
}

view List {
  prop children:? node
  prop ripple:? bool = false
  prop selectable: bool = false

  <list-ul>
    {React.Children.map(children, (item) => {
      if (item.type === ListItem) {
        return React.cloneElement(item, {
          ripple: ripple,
          selectable: selectable
        })
      } else {
        return React.cloneElement(item)
      }
    })}
  </list-ul>

  $ = {
    position: `relative`,
    display: `inline-block`,
    width: percent(100),
    padding: [listVerticalPadding, 0],
    textAlign: left,
    whiteSpace: `nowrap`,
    listStyle: `none`,
  }

  // .checkbox {
  //   display: flex,
  //   width: percent(100),
  //   minHeight: listItemMinHeight,
  //   alignItems: `center`,
  //   margin: 0,
  //   cursor: `pointer`,
  //   > [data-role='checkbox'] {
  //     marginRight: listItem-right-icon-margin,
  //   }
  //   > [data-role='label'] {
  //     paddingLeft: 0,
  //   }
  // }
  //
  // .ripple {
  //   color: colorTextSecondary,
  // }
  //
  // .text {
  //   flex-grow: 1,
  // }
  //
  // .caption {
  //   display: `block`,
  //   fontSize: fontSizeNormal,
  //   color: colorText,
  // }
  //
  // .legend {
  //   display: `block`,
  //   paddingTop: listItem-legend-marginTop,
  //   fontSize: fontSizeSmall,
  //   color: colorTextSecondary,
  //   whiteSpace: normal,
  // }
  //
  // .avatar {
  //   display: flex,
  //   flex: 0 0 `auto`,
  //   width: listItemAvatarHeight,
  //   height: listItemAvatarHeight,
  //   margin: listItemAvatarMargin listHorizontalPadding listItemAvatarMargin 0,
  //   overflow: `hidden`,
  //   borderRadius: percent(50),
  // }
  //
  // .right, .left {
  //   display: flex,
  //   alignItems: `center`,
  //   verticalAlign: middle,
  //   &.icon {
  //     fontSize: listItem-icon-fontSize,
  //     color: colorTextSecondary,
  //   }
  // }
  //
  // .right {
  //   marginLeft: listHorizontalPadding,
  // }
  //
  // .left {
  //   &.icon {
  //     width: listItemIconSize,
  //     marginRight: listItem-right-icon-margin,
  //   }
  // }
}

view ListCheckbox {
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
      className={style.checkbox}
      disabled={disabled}
      label={<ListItemContent caption={caption} legend={legend} />}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  </listcheckbox-li>
}

view ListDivider {
  prop inset:? bool = false

  <listdivider-hr class={{ inset }} />

  $ = {
    height: listDividerHeight,
    margin: [-listDividerHeight, 0, 0],
    backgroundColor: colorDivider,
    border: 0,

    // &.inset {
    //   marginRight: listHorizontalPadding,
    //   marginLeft: listContentLeftSpacing,
    // }
    // .list + & {
    //   marginTop: - listVerticalPadding,
    // }
    // .listItem ~ & {
    //   margin: listVerticalPadding 0,
    // }
  }
}

view ListItem {
  prop caption: string

  prop avatar:? string
  prop children:? any
  prop disabled:? bool = false
  prop leftIcon:? string
  prop legend:? string
  prop onClick:? func = Flint.noop
  prop rightIcon:? string
  prop ripple:? bool = false
  prop selectable:? bool = false
  prop to: string

  let handleClick = event => !disabled && onClick(event)

  let renderContent = () =>
      <span class={{ legend, disabled, selectable }}>
        {leftIcon ? <FontIcon className={`${style.icon} ${style.left}`} value={leftIcon} /> : null}
        {avatar ? <img className={style.avatar} src={avatar} /> : null}
        <ListItemContent caption={caption} legend={legend} />
        {rightIcon ? <FontIcon className={`${style.icon} ${style.right}`} value={rightIcon} /> : null}
      </span>

  <listitem-li onClick={handleClick} onMouseDown={onMouseDown}>
    {to ? <a href={to}>{renderContent()}</a> : renderContent()}
    {children}
  </listitem-li>

  $ = {
    position: `relative`,
  }

  $item = {
    position: `relative`,
    display: `flex`,
    minHeight: listItemMinHeight,
    alignItems: `center`,
    padding: [0, listHorizontalPadding],
    color: colorText,

    // &.selectable:not(.disabled):hover {
    //   cursor: `pointer`,
    //   backgroundColor: listItemHoverColor,
    // }
    // &.withLegend {
    //   height: listItem-minHeight-legend,
    // }
    // &.disabled {
    //   pointerEvents: `none`,
    //   &:not(.checkboxItem) {
    //     opacity: .5,
    //   }
    //   > .checkbox > [data-role='label'] {
    //     opacity: .5,
    //   }
    // }
  }
}

view ListItemContent {
  prop caption: string
  prop legend: any

  <caption>{caption}</caption>
  <legend>{legend}</legend>
}

view ListSubHeader {
  prop caption:? string

  <h5>{caption}</h5>

  $h5 = {
    paddingLeft: listHorizontalPadding,
    margin: [-listVerticalPadding, 0, 0],
    fontSize: listSubheaderFontSize,
    fontWeight: listSubheaderFontWeight,
    lineHeight: listSubheaderHeight,
    color: colorTextSecondary,
  }
}