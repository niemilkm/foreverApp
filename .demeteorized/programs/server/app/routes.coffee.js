(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('notes', {
    path: '/notes',
    data: function() {
      return Notes.find({
        userID: Meteor.userId()
      });
    },
    before: function() {
      if (!Meteor.user()) {
        return this.redirect("/");
      }
    },
    after: function() {
      return ga("send", "pageview", "/notes");
    }
  });
  return this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      return this.response.end(Handlebars.templates['404']());
    }
  });
});

})();
