Template.editPost.helpers({ 
    post: function() {
        var post = Posts.findOne(Session.get('currentEditPostId')); 
        if(post && post.userId === Meteor.user()._id) {
            return post;
        } else {
            //Meteor.Router.to('accessDenied');
            return null;
        }
        //debugger;
        //return Posts.findOne(Session.get('currentEditPostId'));
    }
});

Template.editPost.events({
   'submit form': function(event) {
        event.preventDefault();
        var post = {
            title: $(event.target).find('[name=title]').val(), 
            message: $(event.target).find('[name=message]').val(),
            status: 0
        };
        
        Meteor.call('updatePost',Session.get('currentEditPostId'), post, function(error, id) { 
            if (error)
                return alert(error.reason);
            ShowMessage('success', 'Пост успешно изменен');
            Router.go('userViewOwnPost', {_id: id});
        });
   } 
});

Template.editPost.rendered = function(){
    tinymce.init({
        selector: "textarea"
    });
};