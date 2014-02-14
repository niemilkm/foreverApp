Meteor.publish 'note', ->
  Notes.find({userID: this.userId})

Meteor.publish 'folderDB', ->
  FoldersDB.find({userID: this.userId})

Meteor.publish 'sectionDB', ->
  SectionsDB.find({userID: this.userId})

Meteor.publish 'email', ->
  Emails.find({userID: this.userId})