

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Notes.find().count() === 0) {
        Notes.insert({folder: "Other", section: "Other", note: "My First Note"});
  }
  });

}