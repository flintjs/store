

const Drawer = (props) => {
  const className = ClassNames([style.root, style[props.type]], {
    [style.active]: props.active
  }, props.className);

  return (
    <Overlay active={props.active} onClick={props.onOverlayClick}>
      <div data-react-toolbox='drawer' className={className}>
        <aside className={style.content}>
          {props.children}
        </aside>
      </div>
    </Overlay>
  );
};

Drawer.propTypes = {
  active:? bool
  children:? node
  className:? string
  onOverlayClick:? func
  type:? oneOf(['left' 'right'])
};

Drawer.defaultProps = {
  active: false,
  className: '',
  type: 'left'
};
