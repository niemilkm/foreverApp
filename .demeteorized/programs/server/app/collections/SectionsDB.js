(function(){SectionsDB = new Meteor.Collection('sectionDB');

Meteor.methods({
	insert_sectionDB: function(folderName, sectionName) {
		SectionsDB.insert({folderName:folderName, sectionName:sectionName, userID:Meteor.userId()});
	},
  //update_sectionDB: function(itemID, email_TrueFalse) {
    //SectionsDB.update({_id:itemID, userID:this.userId}, {$set: {email:email_TrueFalse}});
  //},
  remove_sectionDB: function(itemID) {
    SectionsDB.remove({_id:itemID, userID:this.userId});
  },
  insert_starterSection: function() {
    SectionsDB.insert({folderName: "Life Quotes", sectionName: "Ralph Waldo Emerson", userID: Meteor.userId()});
    SectionsDB.insert({folderName: "Life Quotes", sectionName: "Greg Anderson", userID: Meteor.userId()});
    SectionsDB.insert({folderName: "Life Quotes", sectionName: "George Bernard Shaw", userID: Meteor.userId()});
  }
});





if (Meteor.isServer)
{
	SectionsDB.allow({ 
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
