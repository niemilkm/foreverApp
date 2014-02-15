(function(){Notes = new Meteor.Collection('note');

Meteor.methods({
	insert_note: function(folderName, sectionName, noteName, email_TrueFalse) {
		Notes.insert({folder:folderName, section:sectionName, note:noteName, userID:Meteor.userId(), email:email_TrueFalse});
	},
  update_note: function(itemID, email_TrueFalse) {
    Notes.update({_id:itemID, userID:this.userId}, {$set: {email:email_TrueFalse}});
  },
  remove_note: function(itemID) {
    Notes.remove({_id:itemID, userID:this.userId});
  }
});





if (Meteor.isServer)
{
	Notes.allow({ 
  	insert: function(userId, doc) {
  		return false;
    },
    update: function() {
    	return false;
    },
    remove: function() {
    	return false;
  }
});
}

})();
