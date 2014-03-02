(function(){Notes = new Meteor.Collection('note');

Meteor.methods({
	insert_note: function(folderName, sectionName, noteName, email_checked) {
		Notes.insert({folder:folderName, section:sectionName, note:noteName, userID:Meteor.userId(), email:email_checked});
	},
  update_note: function(itemID, email_checked) {
    Notes.update({_id:itemID, userID:this.userId}, {$set: {email:email_checked}});
  },
  remove_note: function(itemID) {
    Notes.remove({_id:itemID, userID:this.userId});
  },
  insert_starterNotes: function() {
    Notes.insert({folder:"Life Quotes", section:"Ralph Waldo Emerson", note:"Do not go where the path may lead, go instead where there is no path and leave a trail.", userID:Meteor.userId(), email:"checked"});
    Notes.insert({folder:"Life Quotes", section:"Greg Anderson", note:"Focus on the journey not the destination. Joy is found not in finishing an activity but in doing it.", userID:Meteor.userId(), email:"checked"});
    Notes.insert({folder:"Life Quotes", section:"George Bernard Shaw", note:"Life isn't about finding yourself. Life is about creating yourself.", userID:Meteor.userId(), email:"checked"});
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
