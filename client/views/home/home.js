

Template.userPage.userLoggedIn = function()
{
	Meteor.user();
};

Template.userPage.userID = function()
{
	return Meteor.user()._id;
};

/*Template.home.events =
{
	'submit input.toNotes': function(evt)
	{
		Router.go('/notes/');
	}
};*/