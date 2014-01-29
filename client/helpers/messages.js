Messages = new Meteor.Collection(null);

ShowMessage = function(type, message) { 
    Messages.insert({message: message, type: type});
};

ClearMessages = function() { 
    Messages.remove({seen: true});
}