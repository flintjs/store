
view List {
  prop children:? node
  prop className:? string
  prop ripple:? bool
  prop selectable: React.PropTypes.bool

  static defaultProps = {
    className: '',
    ripple: false,
    selectable: false
  };

  renderItems () {
    return React.Children.map(this.props.children, (item) => {
      if (item.type === ListItem) {
        return React.cloneElement(item, {
          ripple: this.props.ripple,
          selectable: this.props.selectable
        });
      } else {
        return React.cloneElement(item);
      }
    });
  }

  render () {
    let className = style.list;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <ul className={className}>
        {this.renderItems()}
      </ul>
    );
  }
}





const ListCheckbox = (props) => {
  const className = ClassNames([style.item, style.checkboxItem], {
    [style.withLegend]: props.legend,
    [style.disabled]: props.disabled
  }, props.className);

  return (
    <li className={className}>
      <Checkbox
        checked={props.checked}
        className={style.checkbox}
        disabled={props.disabled}
        label={<ListItemContent caption={props.caption} legend={props.legend} />}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
      />
    </li>
  );
};

ListCheckbox.propTypes = {
  caption:? string.isRequired
  checked:? bool
  className:? string
  disabled:? bool
  legend:? string
  name:? string
  onBlur:? func
  onChange:? func
  onFocus: React.PropTypes.func
};

ListCheckbox.defaultProps = {
  checked: false,
  disabled: false
};



const ListDivider = ({inset}) => {
  const className = inset ? `${style.divider} ${style.inset}` : style.divider;
  return <hr className={className} />;
};

ListDivider.propTypes = {
  inset: React.PropTypes.bool
};

ListDivider.defaultProps = {
  inset: false
};



view ListItem {
  prop avatar:? string
  prop caption:? string.isRequired
  prop children:? any
  prop className:? string
  prop disabled:? bool
  prop leftIcon:? string
  prop legend:? string
  prop onClick:? func
  prop rightIcon:? string
  prop ripple:? bool
  prop selectable:? bool
  prop to: React.PropTypes.string

  static defaultProps = {
    disabled: false,
    ripple: false,
    selectable: false
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };

  renderContent () {
    const className = ClassNames(style.item, {
      [style.withLegend]: this.props.legend,
      [style.disabled]: this.props.disabled,
      [style.selectable]: this.props.selectable
    }, this.props.className);

    return (
      <span className={className}>
        {this.props.leftIcon ? <FontIcon className={`${style.icon} ${style.left}`} value={this.props.leftIcon} /> : null}
        {this.props.avatar ? <img className={style.avatar} src={this.props.avatar} /> : null}
        <ListItemContent caption={this.props.caption} legend={this.props.legend} />
        {this.props.rightIcon ? <FontIcon className={`${style.icon} ${style.right}`} value={this.props.rightIcon} /> : null}
      </span>
    );
  }

  render () {
    return (
      <li className={style.listItem} onClick={this.handleClick} onMouseDown={this.props.onMouseDown}>
        {this.props.to ? <a href={this.props.to}>{this.renderContent()}</a> : this.renderContent()}
        {this.props.children}
      </li>
    );
  }
}
  className: style.ripple,
  centered: false
})(ListItem);



const ListItemContent = ({caption, legend}) => (
  <span className={style.text}>
    <span className={style.caption}>{caption}</span>
    <span className={style.legend}>{legend}</span>
  </span>
);

ListItemContent.propTypes = {
  caption:? string.isRequired
  legend: React.PropTypes.any
};



const ListSubHeader = (props) => {
  let className = style.subheader;
  if (props.className) className += ` ${props.className}`;
  return <h5 className={className}>{props.caption}</h5>;
};

ListSubHeader.propTypes = {
  caption:? string
  className: React.PropTypes.string
};

