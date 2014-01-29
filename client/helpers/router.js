
Router.configure({
  autoRender: false,
  before: function() {
      console.log('bafore');
      ClearMessages();
  }
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home',
        layoutTemplate: 'publiclayout'
    });
    
    this.route('allPublicPosts', {
        path: '/posts',
        template: 'postsList',
        layoutTemplate: 'publiclayout'
    });
    
    this.route('createPosts', {
        path: '/posts/create',
        template: 'postSubmit',
        layoutTemplate: 'userlayout',
        before: function() {
            CheckLogedIn(this);
        }
    });
    
    this.route('draftPosts', {
        path: '/user/posts/draft',
        template: 'postsDraft',
        layoutTemplate: 'userlayout',
        before: function() {
            CheckLogedIn(this);
        }, 
        action: function() {
            this.subscribe('usersDraftsPost', Meteor.user()).wait();
            Session.set('page', 1);
            this.render();
        }
    });
    
    this.route('draftPostspagination', {
        path: '/user/posts/draft/:page',
        template: 'postsDraft',
        layoutTemplate: 'userlayout',
        before: function() {
            CheckLogedIn(this);
        }, 
        action: function() {
           console.log(this.params.page);
           this.subscribe('usersDraftsPost', Meteor.user()).wait();
           Session.set('page', this.params.page);
           this.render();
        }
    });
    
    this.route('viewPublicPost', {
        path: '/posts/view/:_id',
        template: 'postPage',
        layoutTemplate: 'publiclayout',
        before: function() {
            Session.set('currentPostId', this.params._id);
        }
    });
    
    this.route('viewPublicUserAccaunt', {
        path: '/user/:_id',
        template: 'publicUserAccaunt',
        layoutTemplate: 'publiclayout',
        before: function() {
            Session.set('currentViewUserId', this.params._id);
        }
    });
    
    this.route('editPost', {
        path: '/user/posts/edit/:_id',
        template: 'editPost',
        layoutTemplate: 'userlayout',
        before: function() {
            CheckLogedIn(this);
            Session.set('currentEditPostId', this.params._id);
        }
    });
    
    this.route('deletePost', {
        path: '/user/post/delete/:_id',
        before: function() {
            if(CheckLogedIn(this)) {
                var post = Posts.findOne(this.params._id);
                if(!ownsDocument(Meteor.user()._id, post)) {
                    this.stop();
                    this.redirect('home');
                }
            }
        },
        
        action: function() {
            ShowMessage('success', 'Пост удален');
            this.redirect('draftPosts');
        }
    });
    
    this.route('userViewOwnPost', {
        path: '/user/post/view/:_id',
        template: 'userPostView',
        layoutTemplate: 'userlayout',
        before: function() {
            if(CheckLogedIn(this)) {
                var post = Posts.findOne(this.params._id);
                if(!ownsDocument(Meteor.user()._id, post)) {
                    this.stop();
                    this.redirect('home');
                }
            }
        },
        
        action: function() {
            Session.set('currentPostId', this.params._id);
            this.render();
        }
    });
    
    this.route('userAccauntSettings', {
        path: '/user/accaunt/edit',
        template: 'accauntSettings',
        layoutTemplate: 'userlayout',
        before: function() {
            CheckLogedIn(this);
        },
        action: function() {
            this.render();
        }
    });
});

var CheckLogedIn = function(router) {
    if (Meteor.user()) {
        console.log('1');
        return true;
    } else if (Meteor.loggingIn()) {
        console.log('2');
        router.render('loading');
    } else {
        console.log('3');
        router.render('accessDenied');
    }
    console.log('ыещз');
    router.stop();
    return false;
}




