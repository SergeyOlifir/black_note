Template.messages.helpers({ 
    messages: function() {
        return Messages.find();
    }
});

Template.message.rendered = function() {
    var error = this.data; 
    console.log(this);
    Meteor.defer(function() {
        if(error) {
            Messages.update(error._id, {$set: {seen: true}}); 
        }
    });
};