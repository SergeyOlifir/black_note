Template.userPostView.helpers({
    currentPost: function() {
        return Posts.findOne(Session.get('currentPostId'));
    }
});

Template.userPostViewDetail.helpers({
   createDate: function() {
       var date = new Date(this.submitted);
       return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + " " + date.getHours() + ':' + (( date.getMinutes() < 10 ) ? '0' + date.getMinutes() : date.getMinutes());
   },
   updated: function() {
       if(this.updated) {
           var date = new Date(this.updated);
           return 'Обновлен: ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + " " + date.getHours() + ':' + (( date.getMinutes() < 10 ) ? '0' + date.getMinutes() : date.getMinutes());
       } else {
           return '';
       }
   } 
});