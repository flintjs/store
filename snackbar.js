

view Snackbar {
  prop action:? string
  prop active:? bool
  prop className:? string
  prop icon:? string
  prop label:? string.isRequired
  prop onClick:? func
  prop onTimeout:? func
  prop timeout:? number
  prop type: React.PropTypes.string

  componentDidUpdate () {
    if (this.props.active && this.props.timeout) {
      setTimeout(() => {
        this.props.onTimeout();
      }, this.props.timeout);
    }
  }

  render () {
    const {action, active, icon, label, onClick, type } = this.props;
    const className = ClassNames([style.root, style[type]], {
      [style.active]: active
    }, this.props.className);

    return (
      <Overlay invisible>
        <div data-react-toolbox='snackbar' className={className}>
          {icon ? <FontIcon value={icon} className={style.icon} /> : null}
          <span className={style.label}>{label}</span>
          {action ? <Button className={style.button} label={action} onClick={onClick}/> : null}
        </div>
      </Overlay>
    );
  }
}

