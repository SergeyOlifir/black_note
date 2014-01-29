Meteor.methods({
    updateUser: function(fields) {
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error(401, "You need to login to post new stories");
        }
        
        fields = _.pick(fields, 'profile.name', 'profile.sex', 'profile.age', 'profile.abaut', 'profile.job');
                
        Meteor.users.update(user._id, {$set: fields});
    },
    
    getUserInfo: function(id) {
        if(id) {
            return Meteor.users.findOne(id);
        }
    }
});