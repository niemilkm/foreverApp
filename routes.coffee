Router.map ->
  @route 'home',
    path: '/'

  @route 'notes',
    path: '/notes/:id'
    data: ->
      Notes.findOne({_id: @params.id})
      Emails.find({userID: Meteor.userId()}).count();
    before: ->
      if !Meteor.user()
        @redirect "/"

  @route 'notFound',
    path: '*'
    where: 'server'
    action: ->
      @response.statusCode = 404
      @response.end Handlebars.templates['404']()
