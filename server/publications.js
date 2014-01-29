Meteor.publish('shortPostList', function() { 
    return Posts.find({}, {fields: {message: false}});
});

Meteor.publish('singlePost', function(postId) { 
    return Posts.find({'_id': postId}); 
});

Meteor.publish('usersDraftsPost', function(user) {
    if(user) {
        return Posts.find({userId: user._id, status: 0});
    }
});

Meteor.publish('editPost', function(user, postId) {
    if(user) {
        return Posts.find({userId: user._id, '_id': postId});
    }
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'username': 1, 'emails': 1, 'profile': 1}});
});

Meteor.publish('publicUserData', function(user, userId) {
    if(user) {
        return Meteor.users.find({_id: userId},
                                    {fields: {profile: 1}});
    }
});

Meteor.publish('country', function() { 
    return Country.find({});
});