
FoldersDB = new Meteor.Collection('folderDB');




if (Meteor.isServer)
{

	FoldersDB.allow({ 
  	insert: function() {
    	return true;
    },
    update: function() {
    	return true;
    },
    remove: function() {
    	return true;
  }
});

}