Router.map ->
  @route 'home',
    template: 'home',
    path: '/'

  @route 'dashboard',
    path: '/dashboard'

  @route 'notes',
    template: 'notes',
    path: '/notes'

  @route 'login',
    path: '/login'

  @route 'notFound',
    path: '*'
    where: 'server'
    action: ->
      @response.statusCode = 404
      @response.end Handlebars.templates['404']()
