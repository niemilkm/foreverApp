

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Note.find().count() === 0) {
        Note.insert({category: "cat1"});
  }
  });
}