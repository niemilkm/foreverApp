
  Template.showNotes.eachNote = function () {
  	var folderSelected = document.getElementById("selectFolder");
  	var sectionSelected = document.getElementById("selectSection");
  	if ((folderSelected == "folderAll" || folderSelected == null) && (sectionSelected == "sectionAll" || sectionSelected == null))
  	{
  		return Notes.find({}, {sort: {folder:1, section:1, note:1}});
  	}
  	else if (folderSelected != "folderAll" && sectionSelected != "sectionAll")
  	{
  		return Notes.find({folder: folderSelected, section: sectionSelected}, {sort: {folder:1, section:1, note:1}});
  	}
  	else if (folderSelected != "folderAll")
  	{
  		return Notes.find({folder: folderSelected}, {sort: {folder:1, section:1, note:1}});
  	}
  	else
  	{
  		return Notes.find({section: sectionSelected}, {sort: {folder:1, section:1, note:1}});
  	}
    
  };

  Template.showFoldersMenu.eachFolder = function ()
  {
  	return Notes.find({}, {sort: {folder:1}});
  };

 Template.showFoldersSelector.eachFolder = function ()
  {
  	return Notes.find({}, {sort: {folder:1}});
  };

  Template.showSectionsSelector.eachSection = function ()
  {
  	return Notes.find({}, {sort: {section:1}});
  };

  Template.newNote.events =
  {
  	'click input.addItem': function()
  	{
  		var newFolder = document.getElementById("addFolder").value.trim();
  		var newSection = document.getElementById("addSection").value.trim();
  		var newNote = document.getElementById("addNote").value.trim();
  		Notes.insert({folder:newFolder, section:newSection, note:newNote });
  	}
  };

  Template.getSectionOptions.events =
  {
  	'change .selectSection': function()
  	{
  		var folderSelected = document.getElementById("selectFolder");
	  	var sectionSelected = document.getElementById("selectSection");
	  	if ((folderSelected == "folderAll" && sectionSelected == "sectionAll") || folderSelected == null || sectionSelected == null)
	  	{
	  		return Notes.find({}, {sort: {folder:1, section:1, note:1}});
	  	}
	  	else if (folderSelected != "folderAll" && sectionSelected != "sectionAll" )
	  	{
	  		return Notes.find({folder: folderSelected, section: sectionSelected}, {sort: {folder:1, section:1, note:1}});
	  	}
	  	else if (folderSelected != "folderAll")
	  	{
	  		return Notes.find({folder: folderSelected}, {sort: {folder:1, section:1, note:1}});
	  	}
	  	else
	  	{
	  		return Notes.find({section: sectionSelected}, {sort: {folder:1, section:1, note:1}});
	  	}
  	}
  };


