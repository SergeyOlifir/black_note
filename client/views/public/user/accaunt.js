Template.publicUserAccaunt.helpers({
   currentUser: function() {
       return Meteor.user.find({'_id': Session.get('currentViewUserId')})
   } 
});

//i8bjsiXrKrKZRxshT