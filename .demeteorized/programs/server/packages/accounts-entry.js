(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Deps = Package.deps.Deps;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var RouteController = Package['iron-router'].RouteController;
var Route = Package['iron-router'].Route;
var Router = Package['iron-router'].Router;

/* Package-scope variables */
var AccountsEntry, __coffeescriptShare;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/accounts-entry/server/entry.coffee.js                                                    //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {
  var AccountsEntry;
  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
  AccountsEntry = {
    settings: {},
    config: function(appConfig) {
      return this.settings = _.extend(this.settings, appConfig);
    }
  };
  this.AccountsEntry = AccountsEntry;
  return Meteor.methods({
    entryValidateSignupCode: function(signupCode) {
      return !AccountsEntry.settings.signupCode || signupCode === AccountsEntry.settings.signupCode;
    },
    accountsCreateUser: function(username, email, password) {
      if (username) {
        return Accounts.createUser({
          username: username,
          email: email,
          password: password,
          profile: AccountsEntry.settings.defaultProfile || {}
        });
      } else {
        return Accounts.createUser({
          email: email,
          password: password,
          profile: AccountsEntry.settings.defaultProfile || {}
        });
      }
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/accounts-entry/shared/router.coffee.js                                                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Router.map(function() {
  this.route("entrySignIn", {
    path: "/sign-in",
    before: function() {
      Session.set('entryError', void 0);
      return Session.set('buttonText', 'in');
    }
  });
  this.route("entrySignUp", {
    path: "/sign-up",
    before: function() {
      Session.set('entryError', void 0);
      return Session.set('buttonText', 'up');
    }
  });
  this.route("entryForgotPassword", {
    path: "/forgot-password",
    before: function() {
      return Session.set('entryError', void 0);
    }
  });
  this.route('entrySignOut', {
    path: '/sign-out',
    before: function() {
      Session.set('entryError', void 0);
      if (AccountsEntry.settings.homeRoute) {
        Meteor.logout(function() {
          return Router.go(AccountsEntry.settings.homeRoute);
        });
      }
      return this.stop();
    }
  });
  return this.route('entryResetPassword', {
    path: 'reset-password/:resetToken',
    before: function() {
      Session.set('entryError', void 0);
      return Session.set('resetToken', this.params.resetToken);
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-entry'] = {
  AccountsEntry: AccountsEntry
};

})();
