Meteor.subscribe('shortPostList');

Meteor.subscribe('userData');

Meteor.subscribe('country');

Deps.autorun(function () {
  Meteor.subscribe('singlePost', Session.get('currentPostId'));
  Meteor.subscribe('editPost', Meteor.user(), Session.get('currentEditPostId'));
  Meteor.subscribe('publicUserData', Meteor.user(), Session.get('currentViewUserId'));
});

/*Deps.autorun(function () {
  Meteor.subscribe('usersDraftsPost', Meteor.user());
});*/