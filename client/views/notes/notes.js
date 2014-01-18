


 Template.showFoldersSelector.eachFolder = function ()
  {
  	return FoldersDB.find({}, {sort: {folderName:1}});
  };

  Template.getSectionOptions.eachSection = function ()
  {
    return SectionsDB.find({folderName: Session.get("folderSelected")}, {sectionName:1});
  };

  Template.showNotes.eachNote = function () {

    if (Session.get("folderSelected") == "folderAll" || Session.get("folderSelected") == null)
    {
      return Notes.find({}, {sort: {folder:1, section:1, note:1}});
    }
    else if (Session.get("sectionSelected") == "sectionAll")
    {
      return Notes.find({folder: Session.get("folderSelected")}, {sort: {folder:1, section:1, note:1}});
    }
    else
    {
      return Notes.find({folder: Session.get("folderSelected"), section: Session.get("sectionSelected")}, {sort: {folder:1, section:1, note:1}});
    }
    
  };

  Template.noteBody.events =
  {
  	'change #selectFolder': function(evt)
  	{
  		//var folderSelected = document.getElementById("selectFolder");
	  	//var sectionSelected = document.getElementById("selectSection");
	  	//Session.set("folderSelected", evt.currentTarget.value);
      Session.set("folderSelected", evt.currentTarget.value);
  	},

    'change #selectSection': function(evt)
    {
      //var folderSelected = document.getElementById("selectFolder");
      //var sectionSelected = document.getElementById("selectSection");
      //Session.set("folderSelected", evt.currentTarget.value);
      Session.set("sectionSelected", evt.currentTarget.value);
    }

  };

