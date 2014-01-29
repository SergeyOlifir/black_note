var ShowError = function(errorText) {
    Session.set('AuthErrors', errorText);
};

var ClearError = function() {
    
}

Template.authPopUp.helpers({
    userName: function() {
        return Meteor.user().username || 'hi!';
    }
});

Template.popupInner.helpers({
   showRegistrationPopUp: function() {
       return Session.get('showRegistrationPopUp');
   } 
});

Template.loginPopUp.helpers({
    errorMessages: function() {
        return Session.get('AuthErrors') || '';
    }
});

Template.loginPopUp.events({
    'click a#registration': function(event) {
        event.preventDefault();
        Session.set('showRegistrationPopUp', true);
        
    },
    
    'submit form': function(event) {
        event.preventDefault();
        var user = $('[name="email"]').val();
        var pass = $('[name="password"]').val();
        Meteor.loginWithPassword(user, pass, function(error) {
            if(error) {
                ShowError('Пользователь не найден');
            }
        });
    }
});

Template.registrPopUp.helpers({
    errorMessages: function() {
        return Session.get('AuthErrors')
    }
});

Template.registrPopUp.events({
    'click a#login': function(event) {
        event.preventDefault();
        Session.set('showRegistrationPopUp', false);
        
    },
    
    'submit form': function(event) {
        event.preventDefault();
        var login = $('[name="login"]').val();
        var user = $('[name="email"]').val();
        var pass = $('[name="password"]').val();
        var confpass = $('[name="confirm_password"]').val();
        Accounts.createUser({username: login, email: user, password: pass, profile: {group: 1}}, function(error) {
            console.log(error);
        });
    }
});