Template.accauntPanel.events({
    'click a#logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
});

Template.accauntPanel.helpers({
    userAvatar: function() {
        if(Meteor.user()) {
            var user = Meteor.user();
            return (user.profile.avatar) ? user.profile.avatar : '/img/foto/no_foto.jpg';
        } else {
            return '/img/foto/no_foto.jpg';
        }
    }
});