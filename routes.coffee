Router.map ->
  @route 'home',
    path: '/'

  @route 'dashboard',
    path: '/dashboard'

  @route 'notes',
    path: '/notes'

  @route 'login',
    path: '/login'

  @route 'postItem',
    path: '/post_item'

  @route 'postsList',
    path: '/posts_list'

  @route 'postsData',
    path: '/postsData'

  @route 'post',
    path: '/post'

  @route 'notFound',
    path: '*'
    where: 'server'
    action: ->
      @response.statusCode = 404
      @response.end Handlebars.templates['404']()
