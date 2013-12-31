
  Template.showNotes.eachNote = function () {
    return Notes.find({}, {sort: {category:1}});
  };
