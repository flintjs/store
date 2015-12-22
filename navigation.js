view Navigation {
  prop actions:? array = []
  prop children:? node
  prop routes:? array = []
  prop type:? string = 'horizontal'//oneOf(['vertical' 'horizontal'])

  <navigation-nav>
    <Link repeat={routes} {..._} />
    <Button repeat={actions} {..._} />
    {children}
  </navigation-nav>
}