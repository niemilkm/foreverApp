(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('note', function() {
  return Notes.find({
    userID: this.userId
  });
});

Meteor.publish('folderDB', function() {
  return FoldersDB.find({
    userID: this.userId
  });
});

Meteor.publish('sectionDB', function() {
  return SectionsDB.find({
    userID: this.userId
  });
});

Meteor.publish('email', function() {
  return Emails.find({
    userID: this.userId
  });
});

})();
