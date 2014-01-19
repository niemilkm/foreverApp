
var folderSelectedChanged;

 Template.showFoldersSelector.eachFolder = function ()
  {
  	return FoldersDB.find({}, {sort: {folderName:1}});
  };

  Template.getSectionOptions.eachSection = function ()
  {
    if (folderSelectedChanged)
    {
      var setSectionValue = document.getElementById('selectSection');
      setSectionValue.text = "All";
      setSectionValue.value = "sectionAll";
      Session.set("sectionSelected", "sectionAll");
      folderSelectedChanged = false;
    }
    return SectionsDB.find({folderName: Session.get("folderSelected")}, {sort: {sectionName:1}});
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

  Template.newNote.events =
  {
    'click input.addItem': function()
    {
      var newFolder = document.getElementById("addFolder").value.trim();
      var newSection = document.getElementById("addSection").value.trim();
      var newNote = document.getElementById("addNote").value.trim();
      var folderNameCount = FoldersDB.find( {folderName: newFolder}).count();
      if (folderNameCount > 0)
      {
        var sectionNameCount = SectionsDB.find( {folderName: newFolder, sectionName: newSection}).count();
        if (sectionNameCount > 0)
        {
        }
        else
        {
          SectionsDB.insert({folderName: newFolder, sectionName:newSection});
        }
      }
      else
      {
        FoldersDB.insert({folderName:newFolder});
        SectionsDB.insert({folderName: newFolder, sectionName:newSection});
      }
      Session.set("sectionSelected", Session.get("sectionSelected"));
      Notes.insert({folder:newFolder, section:newSection, note:newNote });
    }
  };

  Template.noteBody.events =
  {
  	'change #selectFolder': function(evt)
  	{
      Session.set("folderSelected", evt.currentTarget.value);
      folderSelectedChanged = true;
  	},

    'change #selectSection': function(evt)
    {
      Session.set("sectionSelected", evt.currentTarget.value);
    }

  };

