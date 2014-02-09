Meteor.publish 'note', ->
  Notes.find()

Meteor.publish 'folderDB', ->
  FoldersDB.find()

Meteor.publish 'sectionDB', ->
  SectionsDB.find()

Meteor.publish 'email', ->
  Emails.find()