Template.postSubmit.events({ 
    'submit form': function(event) {
        event.preventDefault();
        var post = {
            title: $(event.target).find('[name=title]').val(), 
            message: $(event.target).find('[name=message]').val(),
            status: 0
        };
        
        Meteor.call('post', post, function(error, id) { 
            if (error)
                return alert(error.reason);
            Router.go('userViewOwnPost', {_id: id});
        });
    }
});


Template.postSubmit.rendered = function(){
    tinymce.init({
        selector: "textarea",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste moxiemanager"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
    });
};