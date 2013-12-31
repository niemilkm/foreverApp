
  Template.showNotes.eachNote = function () {
    return Notes.find({}, {sort: {folder:1, section:1, note:1}});
  };

  Template.showFolders.eachFolder = function ()
  {
  	return Notes.find({}, {sort: {folder:1}});
  };
