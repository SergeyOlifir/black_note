Template.postsDraft.helpers({ 
    posts: function() {
        //return Posts.find({userId: Meteor.user()._id, status: 0}); 
        //var page = Session.get('page');
        //
        //return Posts.find({userId: Meteor.user()._id, status: 0}, {limit: 4, skip: (page - 1) * 4}); 
        var paginator = new Paginator(Posts, 3);
        return paginator.GetCurrentPageCollectionItems({userId: Meteor.user()._id, status: 0});
    },
    
    pagination: function() {
        var paginator = new Paginator(Posts, 3);
        return paginator.DrowPagination('/user/posts/draft', {userId: Meteor.user()._id, status: 0});
    }
});