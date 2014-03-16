(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {
  var Fiber;
  Fiber = Npm.require("fibers");
  setInterval((function() {
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
          email: "checked"
        }).count();
        console.log(userEmailFromLoop);
        if (Emails.findOne({
          userID: userIDFromLoop
        }) !== null && Emails.findOne({
          userID: userIDFromLoop
        }) !== void 0) {
          if (emailNoteCount > 0 && Emails.findOne({
            userID: userIDFromLoop
          }).emailUser) {
            emailNote = Notes.find({
              userID: userIDFromLoop,
              email: "checked"
            }, {
              sort: {
                folder: 1
              }
            }).fetch();
            randomNoteIndex = Math.floor(Math.random() * emailNoteCount);
            textSend = emailNote[randomNoteIndex].folder + " - " + emailNote[randomNoteIndex].section + " - " + emailNote[randomNoteIndex].note;
            return Email.send({
              to: userEmailFromLoop,
              from: "yournote@remembernote.com",
              subject: "Remember Note",
              text: textSend + "\n\n\nwww.remembernote.com"
            });
          }
        }
      });
    }).run();
  }), 86400000);
  return Meteor.methods({
    update_emailVerification: function() {
      return Meteor.users.update({
        _id: this.userId
      }, {
        $set: {
          "emails.0.verified": true
        }
      });
    }
  });
});

})();
