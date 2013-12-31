

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Notes.find().count() === 0) {
        Notes.insert({category: "cat1"});
  }
  });
}