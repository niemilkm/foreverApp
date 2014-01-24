
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
      return Notes.find({}, {sort: {folder:1, section:1, note:1, email:1}});
    }
    else if (Session.get("sectionSelected") == "sectionAll")
    {
      return Notes.find({folder: Session.get("folderSelected")}, {sort: {folder:1, section:1, note:1, email:1}});
    }
    else
    {
      return Notes.find({folder: Session.get("folderSelected"), section: Session.get("sectionSelected")}, {sort: {folder:1, section:1, note:1, email:1}});
    }
    
  };

  Template.noteList.emailCheckedValue = function ()
  {
    var emailBoxChecked = Notes.findOne({_id: this._id}, {email:1});
    if (emailBoxChecked.email)
    {
      return 'checked';
    }
    else
      return '';
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

  Template.noteList.events =
  {
    'click input.deleteItem': function(evt)
    {
      var itemID = evt.currentTarget.id;

      //var folderNameFromID = Notes.find({_id: itemID}, {fields: {folder:1}}).fetch();
      //var folderCount = Notes.find({_id: itemID}, {folder: {$in: folderNameFromID}}).count();

      var deleteNotesFolderID = Notes.find({_id: itemID}, {fields: {folder:1, section:1}});
      deleteNotesFolderID.forEach(function (note)
      {
        Session.set("folderToDelete", note.folder);
        Session.set("sectionToDelete", note.section);
      });

      var Notes_foldersCount = Notes.find({folder: Session.get("folderToDelete")}, {folder:1}).count();
      if (Notes_foldersCount == 1)
      {
        var deleteFoldersDBFolderID = FoldersDB.find({folderName: Session.get("folderToDelete")}, {_id:1});
        deleteFoldersDBFolderID.forEach(function (folderDB)
        {
          FoldersDB.remove({_id: folderDB._id});
        });

        var deleteSectionDBFolderID = SectionsDB.find({folderName: Session.get("folderToDelete")}, {_id:1});
        deleteSectionDBFolderID.forEach(function (sectionDB)
        {
          SectionsDB.remove({_id: sectionDB._id});
        });
      }
      else
      {
        var Notes_foldersAndSectionsCount = Notes.find({folder: Session.get("folderToDelete"), section: Session.get("sectionToDelete")}, {_id:1}).count();
        if (Notes_foldersAndSectionsCount == 1)
        {
          var deleteSectionDBFolderID = SectionsDB.find({folderName: Session.get("folderToDelete"), sectionName: Session.get("sectionToDelete")}, {_id:1});
          deleteSectionDBFolderID.forEach(function (sectionDB)
          {
            SectionsDB.remove({_id: sectionDB._id});
          });
        }
      }
      Notes.remove({_id: itemID});
    },

    'click input.emailItem': function(evt)
    {
      var itemID = event.currentTarget.value;

      if (event.currentTarget.checked)
      {
        Notes.update({_id: itemID}, {$set: {email: true}});
      }
      else
      {
        Notes.update({_id: itemID}, {$set: {email: false}});
      }


      
      
    }




  }



