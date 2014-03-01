

Meteor.startup ->
  Fiber = Npm.require("fibers")
  setInterval (->
    Fiber(->
      allUsers = Meteor.users.find().fetch()
      userData = undefined
      _.each allUsers, (userData) ->
	      userIDFromLoop = userData._id
	      userEmailFromLoop = userData.emails[0].address
	      emailNoteCount = Notes.find({userID: userIDFromLoop, email:true}).count()
	      console.log userEmailFromLoop
	      if (emailNoteCount > 0 && Emails.findOne({userID: userIDFromLoop}).emailUser)
	      	emailNote = Notes.find({userID: userIDFromLoop, email:true}, {sort: {folder: 1}}).fetch()
	      	randomNoteIndex = Math.floor(Math.random() * emailNoteCount)
	      	textSend = emailNote[randomNoteIndex].folder + " - " + emailNote[randomNoteIndex].section + " - " + emailNote[randomNoteIndex].note
	      	Email.send
	        	to: userEmailFromLoop
	        	from: userEmailFromLoop
	        	subject: "Remember Note"
	        	text: textSend
	    ).run()
  ), 43200000

  Meteor.methods update_emailVerification: ->
	  Meteor.users.update
	    _id: @userId
	  ,
	    $set:
	      "emails.0.verified": true
