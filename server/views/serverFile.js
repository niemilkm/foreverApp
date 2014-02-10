



/*Meteor.startup( function () 
	{
		Fiber = Npm.require('fibers');
			 setInterval( function ()
			  { Fiber(function()
			   {
			   	var numberOfUsers = Meteor.users.find().count;
			   	var allUsers = Meteor.users.find().fetch();
			   	var userData;
			   	
			   	_.each(allUsers, userData);
			   	{
			   		var userIDFromLoop = userData._id;
			   		var userEmailFromLoop = userData.emails[0].address;
				   	var emailNote = Notes.find({userID: userIDFromLoop, email: true}, {folder:1, section:1, note:1});
				   	var textSend = emailNote.folder + " - " + emailNote.section + " - " + emailNote.note;
				    console.log( "recurring function");
				    Email.send( { to: userEmailFromLoop,
				    							from: userEmailFromLoop,
				    							subject: "Remember Note",
				    							text: textSend
				    						});
				  }
			   }).run();
				}, 5000000 );
	});*/


/*if (Meteor.isServer) {
	Can put back in but not needed
  Meteor.startup(function () {
    if (Notes.find().count() === 0) {
        Notes.insert({folder: "Other", section: "Other", note: "My First Note"});
  }
  });

}*/