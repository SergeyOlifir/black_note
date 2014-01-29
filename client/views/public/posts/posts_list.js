
Template.postsList.helpers({ 
    posts: function() {
        return Posts.find(); 
    },
    hui: function() {
        return "HUI";
    }
});
