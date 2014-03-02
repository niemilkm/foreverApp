(function(){FoldersDB = new Meteor.Collection('folderDB');

Meteor.methods({
	insert_folderDB: function(folderName) {
		FoldersDB.insert({folderName:folderName, userID:Meteor.userId()});
	},
  //update_sectionDB: function(itemID, email_TrueFalse) {
    //SectionsDB.update({_id:itemID, userID:this.userId}, {$set: {email:email_TrueFalse}});
  //},
  remove_folderDB: function(itemID) {
    FoldersDB.remove({_id:itemID, userID:this.userId});
  },
  insert_starterFolder: function() {
    FoldersDB.insert({folderName: "Life Quotes", userID:Meteor.userId()});
  }
});





if (Meteor.isServer)
{
	FoldersDB.allow({ 
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
