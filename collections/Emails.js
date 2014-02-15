Emails = new Meteor.Collection('email');

Meteor.methods({
	insert_email: function(emailUser_TrueFalse) {
		Emails.insert({userID: this.userId, emailUser: emailUser_TrueFalse});
	},
    update_email: function(emailsID, emailUser_TrueFalse) {
        Emails.update({_id:emailsID, userID: this.userId}, {$set: {emailUser: emailUser_TrueFalse}});
    }
});


if (Meteor.isServer)
{
	Emails.allow({ 
  	insert: function(userId, doc) {
        return false;
    },
    update: function() {
    	return true;
    },
    remove: function() {
    	return true;
    }
  });

}