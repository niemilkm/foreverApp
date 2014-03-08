
  Template.notes.forFirstUserCreateEmailDBEntry = function()
  {
    console.log("called first template");
    if (!Meteor.user().emails[0].verified)
    {
      Meteor.call("insert_email", true);
      console.log("inserted email db");
      Meteor.call("insert_starterNotes");
      console.log("added starter quotes");
      Meteor.call("insert_starterFolder");
      Meteor.call("insert_starterSection");
      Meteor.call("update_emailVerification");
      console.log("updated email verification");
    }
  };

 Template.showSelector.eachFolder = function ()
  {
    console.log("eachFolder");
  	return FoldersDB.find({userID:Meteor.userId()}, {sort: {folderName:1}});
  };

  Template.showSelector.eachSection = function ()
  {
    var sessionFolderSelected = Session.get("folderSelected");
    console.log("eachSection");
    if (sessionFolderSelected != null && sessionFolderSelected != "folderAll")
    {
      return SectionsDB.find({folderName: sessionFolderSelected});
    }
    return;
  };

  Template.showNotes.eachNote = function ()
  {
    console.log("eachNote");
    if (Session.get("folderSelected") == "folderAll" || Session.get("folderSelected") == null || Session.get("folderSelected") == undefined)
    {
      return Notes.find({}, {sort: {folder:1, section:1, note:1}});
    }
    else if (Session.get("sectionSelected") == "sectionAll" || Session.get("sectionSelected") == null || Session.get("sectionSelected") == undefined)
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
      console.log("event addItem");
      var newFolder = document.getElementById("addFolder").value.trim();
      var newSection = document.getElementById("addSection").value.trim();
      var note = document.getElementById("addNote");
      var newNote = note.value.trim();
      var folderNameCount = FoldersDB.find( {folderName: newFolder}).count();
      if (folderNameCount > 0)
      {
        var sectionNameCount = SectionsDB.find( {folderName: newFolder, sectionName: newSection}).count();
        if (sectionNameCount > 0)
        {
        }
        else
        {
          Meteor.call("insert_sectionDB", newFolder, newSection, function(error, user_id) {
          });
        }
      }
      else
      {
        Meteor.call("insert_folderDB", newFolder, function(error, user_id) {
        });
        Meteor.call("insert_sectionDB", newFolder, newSection, function(error, user_id) {
        });
      }
      Session.set("sectionSelected", Session.get("sectionSelected"));
      Meteor.call("insert_note", newFolder, newSection, newNote, "checked", function(error, user_id) {
      });
      note.value = '';
    }
  };

  Template.notes.events =
  {
  	'change #selectFolder': function(evt)
  	{
      console.log("event selectFolder");
      Session.set("folderSelected", evt.currentTarget.value);
      var selectOption = document.getElementById("selectSection");
      selectOption.value = "sectionAll";
      Session.set("sectionSelected", "sectionAll");
  	},

    'change #selectSection': function(evt)
    {
      console.log("event selectSection");
      Session.set("sectionSelected", evt.currentTarget.value);
    }

  };

  Template.noteList.events =
  {
    'click input.deleteItem': function(evt)
    {
      console.log("event deleteItem");
      var itemID = evt.currentTarget.id;
      var deleteNotesFolderID = Notes.find({_id: itemID}, {fields: {folder:1, section:1}});
      deleteNotesFolderID.forEach(function (note)
      {
        Session.set("folderToDelete", note.folder);
        Session.set("sectionToDelete", note.section);
      });

      var confirmText = 'Are you sure you want to delete this entry?';

      if (confirm(confirmText))
      {
        var Notes_foldersCount = Notes.find({folder: Session.get("folderToDelete")}, {folder:1}).count();
        if (Notes_foldersCount == 1)
        {
          var deleteFoldersDBFolderID = FoldersDB.find({folderName: Session.get("folderToDelete")}, {_id:1});
          deleteFoldersDBFolderID.forEach(function (folderDB)
          {
            Meteor.call("remove_folderDB", folderDB._id, function(error, user_id) {
            });
          });

          var deleteSectionDBFolderID = SectionsDB.find({folderName: Session.get("folderToDelete")}, {_id:1});
          deleteSectionDBFolderID.forEach(function (sectionDB)
          {
            Meteor.call("remove_sectionDB", sectionDB._id, function(error, user_id) {
            });
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
              Meteor.call("remove_sectionDB", sectionDB._id, function(error, user_id) {
              });
            });
          }
        }
        Meteor.call("remove_note", itemID, function(error, user_id) {
        })
      }
    },

    'click input.emailItem': function(evt)
    {
      console.log("event emailItem");
      var itemID = event.currentTarget.value;
      if (event.currentTarget.checked)
      {
        Meteor.call("update_note", itemID, "checked", function(error, user_id) {
        });
      }
      else
      {
        Meteor.call("update_note", itemID, "", function(error, user_id) {
        });
      }
      Session.set("emailItem", "updated");
    }
  };

  Template.showSelector.events =
  {
    'click input.radioEmailYes': function(evt)
    {
      console.log("event radioEmailYes");
      var emailsFindOne = Emails.findOne();
      Meteor.call("update_email", emailsFindOne._id, true, function(error, user_id) {
      });
    },

    'click input.radioEmailNo': function(evt)
    {
      console.log("event radioEmailNo");
      var emailsFindOne = Emails.findOne();
      Meteor.call("update_email", emailsFindOne._id, false, function(error, user_id) {
      });
    }
  }

  Template.showSelector.emailUserYes = function ()
  {
    console.log("EmailUserYes")
    var emailDBCreated = Emails.find({userID: Meteor.userId()});
    if (emailDBCreated != undefined)
    {
      if (!emailDBCreated.fetch()[0].emailUser)
        return "";
    }
    return "checked";
  };

  Template.showSelector.emailUserNo = function ()
  {
    console.log("EmailUserNo")
    var emailDBCreated = Emails.find({userID: Meteor.userId()});
    if (emailDBCreated != undefined)
    {
      if (!emailDBCreated.fetch()[0].emailUser)
        return "checked";
    }
    else
      return "";
  };


