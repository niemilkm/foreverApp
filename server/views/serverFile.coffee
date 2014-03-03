

Meteor.startup ->
  Fiber = Npm.require("fibers")
  setInterval (->
    Fiber(->
      allUsers = Meteor.users.find().fetch()
      userData = undefined
      _.each allUsers, (userData) ->
	      userIDFromLoop = userData._id
	      userEmailFromLoop = userData.emails[0].address
	      emailNoteCount = Notes.find({userID: userIDFromLoop, email: "checked"}).count()
	      console.log userEmailFromLoop
	      if (Emails.findOne({userID: userIDFromLoop}) != null && Emails.findOne({userID: userIDFromLoop}) != undefined)
		      if (emailNoteCount > 0 && Emails.findOne({userID: userIDFromLoop}).emailUser)
		      	emailNote = Notes.find({userID: userIDFromLoop, email: "checked"}, {sort: {folder: 1}}).fetch()
		      	randomNoteIndex = Math.floor(Math.random() * emailNoteCount)
		      	textSend = emailNote[randomNoteIndex].folder + " - " + emailNote[randomNoteIndex].section + " - " + emailNote[randomNoteIndex].note
		      	Email.send
		        	to: userEmailFromLoop
		        	from: "yournote@remembernote.com"
		        	subject: "Remember Note"
		        	text: textSend + "\n\n\nwww.remembernote.com"
	    ).run()
  ), 43200000

  Meteor.methods update_emailVerification: ->
	  Meteor.users.update
	    _id: @userId
	  ,
	    $set:
	      "emails.0.verified": true
