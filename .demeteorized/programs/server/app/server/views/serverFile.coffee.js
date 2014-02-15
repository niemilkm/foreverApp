(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {
  var Fiber;
  Fiber = Npm.require("fibers");
  return setInterval((function() {
    return Fiber(function() {
      var allUsers, userData;
      allUsers = Meteor.users.find().fetch();
      userData = void 0;
      return _.each(allUsers, function(userData) {
        var emailNote, emailNoteCount, randomNoteIndex, textSend, userEmailFromLoop, userIDFromLoop;
        userIDFromLoop = userData._id;
        userEmailFromLoop = userData.emails[0].address;
        emailNoteCount = Notes.find({
          userID: userIDFromLoop,
          email: true
        }).count();
        console.log(userEmailFromLoop);
        if (emailNoteCount > 0 && Emails.findOne({
          userID: userIDFromLoop
        }).emailUser) {
          emailNote = Notes.find({
            userID: userIDFromLoop,
            email: true
          }, {
            sort: {
              folder: 1
            }
          }).fetch();
          randomNoteIndex = Math.floor(Math.random() * emailNoteCount);
          textSend = emailNote[randomNoteIndex].folder + " - " + emailNote[randomNoteIndex].section + " - " + emailNote[randomNoteIndex].note;
          return Email.send({
            to: userEmailFromLoop,
            from: userEmailFromLoop,
            subject: "Remember Note",
            text: textSend
          });
        }
      });
    }).run();
  }), 43200000);
});

})();
