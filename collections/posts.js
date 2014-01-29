Posts = new Meteor.Collection('posts');

Posts.allow({
    update: ownsDocument, 
    remove: ownsDocument
});

Meteor.methods({
    post: function(postAttributes) {
        var user = Meteor.user()
        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to post new stories");
        // ensure the post has a title
        if (!postAttributes.title)
            throw new Meteor.Error(422, 'Please fill in a headline');
        
        // pick out the whitelisted keys
        var post = _.extend(_.pick(postAttributes, 'title', 'message', 'status'), { 
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });
        var postId = Posts.insert(post);
        return postId; 
    }, 
    
    updatePost: function(postId, postAttributes) {
        var user = Meteor.user()
        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to post new stories");
        // ensure the post has a title
        if (!postAttributes.title)
            throw new Meteor.Error(422, 'Please fill in a headline');
        
        // pick out the whitelisted keys
        var post = _.extend(_.pick(postAttributes, 'title', 'message', 'status'), { 
            updated: new Date().getTime(),
            //updated:
        });
        Posts.update(postId, {$set: post});
        return postId; 
    }
});