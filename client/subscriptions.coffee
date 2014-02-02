Meteor.startup ->
  Meteor.subscribe("note")
  Meteor.subscribe("folderDB")
  Meteor.subscribe("sectionDB")