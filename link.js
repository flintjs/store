
const Link = (props) => {
  const className = ClassNames(style.root, {
    [style.active]: props.active
  }, props.className);

  return (
    <a {...props} data-react-toolbox='link'className={className}>
      {props.icon ? <FontIcon className={style.icon} value={props.icon} /> : null}
      {props.label ? <abbr>{props.label}</abbr> : null}
      {props.count && parseInt(props.count) !== 0 ? <small>{props.count}</small> : null}
    </a>
  );
};

Link.propTypes = {
  active:? bool
  className:? string
  count:? number
  icon:? string
  label: React.PropTypes.string
};

Link.defaultProps = {
  active: false,
  className: ''
};
