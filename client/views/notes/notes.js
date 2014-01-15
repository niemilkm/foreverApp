
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
  	return FoldersDB.find({}, {sort: {folderName:1}});
  };

 Template.showFoldersSelector.eachFolder = function ()
  {
  	return FoldersDB.find({}, {sort: {folderName:1}});
  };

  Template.showSectionsSelector.eachSection = function ()
  {
  	return SectionsDB.find({}, {sort: {sectionName:1}});
  };

  Template.newNote.events =
  {
  	'click input.addItem': function()
  	{
  		var newFolder = document.getElementById("addFolder").value.trim();
  		var newSection = document.getElementById("addSection").value.trim();
  		var newNote = document.getElementById("addNote").value.trim();
      var folderNameCount = FoldersDB.find( {folderName: {$in: [newFolder] } }).count();
      if (folderNameCount > 0)
      {
        var sectionNameCount = SectionsDB.find( {sectionName: {$in: [newSection] } }).count();
        if (sectionNameCount > 0)
        {
        }
        else
        {
          SectionsDB.insert({sectionName:newSection});
        }
      }
      else
      {
        FoldersDB.insert({folderName:newFolder});
        SectionsDB.insert({sectionName:newSection});
      }
      
      Notes.insert({folder:newFolder, section:newSection, note:newNote });
  	}
  };

  Template.getSectionOptions.events =
  {
  	'change .selectSection': function(evt)
  	{
  		//var folderSelected = document.getElementById("selectFolder");
	  	//var sectionSelected = document.getElementById("selectSection");
	  	Session.set("sectionSelected", evt.currentTarget.value);
  	}
  };

  Meteor.autosubscribe(function ()
  {
    Meteor.subscribe("Notes", Session.get("sectionSelected"));
  });


