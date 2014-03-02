Router.map ->
  @route 'home',
    path: '/'

  @route 'notes',
    path: '/notes'
    data: ->
      Notes.find({userID: Meteor.userId()})
    before: ->
      if !Meteor.user()
        @redirect "/"
    after: ->
        ga "send", "pageview", "/notes"

  @route 'notFound',
    path: '*'
    where: 'server'
    action: ->
      @response.statusCode = 404
      @response.end Handlebars.templates['404']()
