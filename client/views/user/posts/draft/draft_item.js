Template.draftItem.helpers({
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
   },
   text: function() {
       var $message = $(this.message);
       //debugger;
       if($message.lenght > 0 && $message.find('blacknote')) {
           return $message.find('blacknote').innerHtml();
       } else {
           return this.message || '';
       }
   }
});

Template.draftItem.events({
    'click a#del': function(e) {
        if (!confirm("Удалить этот пост?")) {
            e.preventDefault();
        }
    }
})