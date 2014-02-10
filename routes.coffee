Router.map ->
  @route 'home',
    path: '/'

  @route 'login',
    path: '/login'

  @route 'dashboard',
    path: '/dashboard'
    before: ->
      if !Meteor.user()
        @redirect "/"

  @route 'notes',
    path: '/notes/:id'
    data: ->
      Notes.findOne({_id: @params.id})
      Emails.find({userID: Meteor.userId()}).count();
    before: ->
      if !Meteor.user()
        @redirect "/"

  @route 'login',
    path: '/login'

  @route 'notFound',
    path: '*'
    where: 'server'
    action: ->
      @response.statusCode = 404
      @response.end Handlebars.templates['404']()
