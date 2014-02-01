Template.publicUserAccaunt.helpers({
   currentUser: function() {
       return Meteor.users.findOne({'_id': Session.get('currentViewUserId')});
   }
});

Template.userAccaunt.helpers({
     userBirthDate: function() {
        console.log(this);
        if(this.profile.age !== '') {
            return new Date(this.profile.age).GetReadableDate('.');
        } else {
            return '';
        }
    }
});

//i8bjsiXrKrKZRxshT