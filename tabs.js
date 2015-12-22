// const styles = {
//   tabLabelDisabledOpacity: .2,
//   tabLabelH-Adding: 1.2)unit,
//   tabLabelHeight: 4.8)unit,
//   tabTextHeight: 1.4)unit,
//   tabLabelV-Adding: (tabLabelHeight - tabTextHeight) / 2,
//   tabNavigationBorderColor: colorDivider,
//   tabPointerColor: colorPrimary,
//   tabPointerHeight: .2)unit,
//   tabText: colorBlack,
//   tabTextColor: tabText,
//   tabTextInactiveColor: rgba(tabText, 0.70),
// }
//
// view TabHeader {
//   prop active:? bool
//   prop className:? string
//   prop disabled:? bool
//   prop hidden:? bool
//   prop label:? any.isRequired
//   prop onActive:? func
//   prop onClick: func
//
//   static defaultProps = {
//     active: false,
//     className: '',
//     disabled: false,
//     hidden: false
//   }
//
//   componentDidUpdate (prevProps) {
//     if (!prevProps.active && props.active && props.onActive) {
//       props.onActive()
//     }
//   }
//
//   handleClick = () => {
//     if (!props.disabled && props.onClick) {
//       props.onClick()
//     }
//   }
//
//   render () {
//     const className = ClassNames(style.label, {
//       [style.active]: props.active,
//       [style.hidden]: props.hidden,
//       [style.disabled]: props.disabled
//     }, props.className)
//
//     return (
//       <label className={className} onClick={handleClick}>
//         {props.label}
//       </label>
//     )
//   }
// }
//
//
//
// view TabContent {
//   prop active:? bool
//   prop children:? node
//   prop className:? string
//   prop tabIndex: number
//
//   static defaultProps = {
//     active: false,
//     className: ''
//   }
//
//   render () {
//     let className = style.tab
//     if (props.active) className += ` ${style.active}`
//     if (props.className) className += ` ${props.className}`
//
//     return (
//       <section className={className} tabIndex={props.tabIndex}>
//         {props.children}
//       </section>
//     )
//   }
// }
//
//
//
// view Tabs {
//   prop children:? node
//   prop className:? string
//   prop index:? number
//   prop onChange: func
//
//   static defaultProps = {
//     index: 0
//   }
//
//   state = {
//     pointer: {}
//   }
//
//   componentDidMount () {
//     setTimeout(() => {
//       updatePointer(props.index)
//     }, 100)
//   }
//
//   componentWillReceiveProps (nextProps) {
//     updatePointer(nextProps.index)
//   }
//
//   handleHeaderClick = (idx) => {
//     if (props.onChange) props.onChange(idx)
//   }
//
//   parseChildren () {
//     const headers = []
//     const contents = []
//
//     React.Children.forEach(props.children, (item) => {
//       if (item.type === Tab) {
//         headers.push(item)
//         if (item.props.children) {
//           contents.push(<TabContent children={item.props.children}/>)
//         }
//       } else if (item.type === TabContent) {
//         contents.push(item)
//       }
//     })
//
//     return {headers, contents}
//   }
//
//   updatePointer (idx) {
//     const startPoint = view.refs.tabs.getBoundingClientRect().left
//     const label = view.refs.navigation.children[idx].getBoundingClientRect()
//     setState({
//       pointer: {
//         top: `${view.refs.navigation.getBoundingClientRect().height}px`,
//         left: `${label.left - startPoint}px`,
//         width: `${label.width}px`
//       }
//     })
//   }
//
//   renderHeaders (headers) {
//     return headers.map((item, idx) => {
//       return React.cloneElement(item, {
//         key: idx,
//         active: props.index === idx,
//         onClick: handleHeaderClick.bind( idx, item)
//       })
//     })
//   }
//
//   renderContents (contents) {
//     return contents.map((item, idx) => {
//       return React.cloneElement(item, {
//         key: idx,
//         active: props.index === idx,
//         tabIndex: idx
//       })
//     })
//   }
//
//   render () {
//     let className = style.root
//     const { headers, contents } = parseChildren()
//     if (props.className) className += ` ${props.className}`
//
//     return (
//       <div ref='tabs' className={className}>
//         <nav className={style.navigation} ref='navigation'>
//           {renderHeaders(headers)}
//         </nav>
//         <span className={style.pointer} style={state.pointer} />
//         {renderContents(contents)}
//       </div>
//     )
//   }
// }
//
//
// //
// // .root {
// //   position: `relative`,
// //   display: flex,
// //   flexDirection: column,
// // }
// //
// // .navigation {
// //   display: flex,
// //   flexDirection: row,
// //   boxShadow: inset 0 -1 tabNavigationBorderColor,
// // }
// //
// // .label {
// //   padding: tabLabelV-Adding tabLabelH-Adding,
// //   fontSize: tabTextHeight,
// //   font-weight: fontWeightSemiBold,
// //   lineHeight: 1,
// //   color: tabTextInactiveColor,
// //   textTransform: uppercase,
// //   transitionTimingFunction: animationCurveDefault,
// //   transitionDuration: animationDuration,
// //   transitionProperty: boxShadow, color,
// //   &.active {
// //     color: tabTextColor,
// //   }
// //   &.disabled {
// //     opacity: tabLabelDisabledOpacity,
// //   }
// //   &:not(.disabled) {
// //     cursor: `pointer`,
// //   }
// //   &.hidden {
// //     display: `none`,
// //   }
// // }
// //
// // .pointer {
// //   position: `absolute`,
// //   width: 0,
// //   height: tabPointerHeight,
// //   marginTop: - tabPointerHeight,
// //   backgroundColor: tabPointerColor,
// //   transitionTimingFunction: animationCurveDefault,
// //   transitionDuration: animationDuration,
// //   transitionProperty: left, width,
// // }
// //
// // .tab {
// //   display: flex,
// //   flexDirection: column,
// //   padding: tabLabelV-Adding tabLabelH-Adding,
// //   &:not(.active) {
// //     display: `none`,
// //   }
// //   &.active {
// //     display: `block`,
// //   }
// // }