
var folderSelectedChanged;
var emailUser_session;
Session.set("folderSelected", "folderAll");
Session.set("sectionSelected", "sectionAll");

emailSubscription = Meteor.subscribe('email');

Deps.autorun(function() 
{
  if (emailSubscription.ready())
  {
    var emailsCollectionHasUser = Emails.find({userID: Meteor.userId()});
    if (emailsCollectionHasUser.count() < 1)
    {
      Emails.insert({userID: Meteor.userId(), emailUser: false});
    }

    if (emailsCollectionHasUser.fetch()[0].emailUser)
    {
      Session.set("emailUser", true);
    }
    else
    {
      Session.set("emailUser", false);
    }
  }
});

 Template.showFoldersSelector.eachFolder = function ()
  {
  	return FoldersDB.find({userID:Meteor.userId()}, {sort: {folderName:1}});
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
    return SectionsDB.find({folderName: Session.get("folderSelected"), userID:Meteor.userId()}, {sort: {sectionName:1}});
  };

  Template.showNotes.eachNote = function () {

    if (Session.get("folderSelected") == "folderAll" || Session.get("folderSelected") == null)
    {
      return Notes.find({userID:Meteor.userId()}, {sort: {folder:1, section:1, note:1}});
    }
    else if (Session.get("sectionSelected") == "sectionAll")
    {
      return Notes.find({folder: Session.get("folderSelected"), userID:Meteor.userId()}, {sort: {folder:1, section:1, note:1}});
    }
    else
    {
      return Notes.find({folder: Session.get("folderSelected"), section: Session.get("sectionSelected"), userID:Meteor.userId()}, {sort: {folder:1, section:1, note:1}});
    }
    
  };

  Template.noteList.emailCheckedValue = function ()
  {
    var emailBoxChecked = Notes.findOne({_id: this._id});
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
      var folderNameCount = FoldersDB.find( {folderName: newFolder, userID:Meteor.userId()}).count();
      if (folderNameCount > 0)
      {
        var sectionNameCount = SectionsDB.find( {folderName: newFolder, sectionName: newSection, userID:Meteor.userId()}).count();
        if (sectionNameCount > 0)
        {
        }
        else
        {
          SectionsDB.insert({folderName: newFolder, sectionName:newSection, userID:Meteor.userId()});
        }
      }
      else
      {
        FoldersDB.insert({folderName:newFolder, userID:Meteor.userId()});
        SectionsDB.insert({folderName: newFolder, sectionName:newSection, userID:Meteor.userId()});
      }
      Session.set("sectionSelected", Session.get("sectionSelected"));
      Notes.insert({folder:newFolder, section:newSection, note:newNote, userID:Meteor.userId(), email:false });
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

      var Notes_foldersCount = Notes.find({folder: Session.get("folderToDelete"), userID:Meteor.userId()}, {folder:1}).count();
      if (Notes_foldersCount == 1)
      {
        var deleteFoldersDBFolderID = FoldersDB.find({folderName: Session.get("folderToDelete"), userID:Meteor.userId()}, {_id:1});
        deleteFoldersDBFolderID.forEach(function (folderDB)
        {
          FoldersDB.remove({_id: folderDB._id});
        });

        var deleteSectionDBFolderID = SectionsDB.find({folderName: Session.get("folderToDelete"), userID:Meteor.userId()}, {_id:1});
        deleteSectionDBFolderID.forEach(function (sectionDB)
        {
          SectionsDB.remove({_id: sectionDB._id});
        });
      }
      else
      {
        var Notes_foldersAndSectionsCount = Notes.find({folder: Session.get("folderToDelete"), section: Session.get("sectionToDelete"), userID:Meteor.userId()}, {_id:1}).count();
        if (Notes_foldersAndSectionsCount == 1)
        {
          var deleteSectionDBFolderID = SectionsDB.find({folderName: Session.get("folderToDelete"), sectionName: Session.get("sectionToDelete"), userID:Meteor.userId()}, {_id:1});
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

  Template.emailRadioButtons.events =
  {
    'click input.radioEmailYes': function(evt)
    {
      //document.getElementById("yes").checked;
      var emailsFindOne = Emails.findOne({userID: Meteor.userId()});
      Session.set("emailUser", true);
      //Session.set("emailUserNo", '');
      Emails.update({_id: emailsFindOne._id}, {$set: {emailUser: true}});
      //emailUser_session = true;
      //document.getElementById("no").checked;
    },

    'click input.radioEmailNo': function(evt)
    {
      var emailsFindOne = Emails.findOne({userID: Meteor.userId()});
      Session.set("emailUser", false);
      //Session.set("emailUserNo", "checked");
      Emails.update({_id: emailsFindOne._id}, {$set: {emailUser: false}});
      //emailUser_session = false;
    }
  }

  Template.emailRadioButtons.emailUserYes = function ()
  {
    if (Session.get("emailUser"))
    {
      return 'checked';
    }
    else
      return '';
  };

  Template.emailRadioButtons.emailUserNo = function ()
  {
    if (Session.get("emailUser"))
    {
      return '';
    }
    else
      return 'checked';
  };


