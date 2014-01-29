Template.accauntSettings.helpers({
    currentUser: function() {
        return Meteor.users.findOne(Meteor.userId());
    }
});

Template.userAccauntForm.events({
    'submit form': function(event) {
        event.preventDefault();
        var form = $(event.target);
        var user = {
            'profile.name':  form.find('[name="username"]').val(),
            'profile.sex': '',//form.find('[name="usersex"]').val(),
            'profile.age': new Date(form.find('[name="userage"]').val()).getTime().toString() !== 'NaN' ? new Date(form.find('[name="userage"]').val()).getTime() : '',
            'profile.abaut': form.find('[name="abaut"]').val(),
            'profile.job': form.find('[name="job"]').val()
        };
        //user.sex = '';
        if(form.find('[name="usersex"]')[0].checked) {
            user['profile.sex'] = form.find('[name="usersex"]')[0].value;
        }
        
        if(form.find('[name="usersex"]')[1].checked) {
            user['profile.sex'] = form.find('[name="usersex"]')[1].value;
        }
        
        Meteor.call('updateUser', user, function(error, id) { 
            if (error)
                return alert(error.reason);
            ShowMessage('success', 'Персональная информация обновлена');
        });
    }
});

Template.userAccauntForm.helpers({
    userBirthDate: function() {
        console.log(this);
        if(this.profile.age !== '') {
            return new Date(this.profile.age).GetReadableDate('/');
        } else {
            return '';
        }
    },
    
    isMale: function() {
        return (this.profile.sex === 'male') ? true : false;
    },
    
    isFemale: function() {
        return (this.profile.sex === 'female') ? true : false;
    },
    email: function() {
        return (this.emails[0].address) ? this.emails[0].address : '';
    }
    
});

Template.userAccauntForm.rendered = function() {
    $('.date input').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true,
        todayHighlight: true
    });
};

Template.avatarForm.helpers({
    userAvatar: function() {
        return (this.profile.avatar) ? this.profile.avatar : '/img/foto/no_foto.jpg';
    }
});

Template.avatarModal.helpers({
    userAvatar: function() {
        return (this.profile.avatar) ? this.profile.avatar : '/img/foto/no_foto.jpg';
    }
});

var SelectionPosition;

Template.avatarForm.events({
    'change input[type="file"]': function(evt) {
        /*_.each(e.target.files, function(file) {
            //Meteor.saveFile(file, file.name);
        });*/
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                     //console.log(e.target.result);
                     $('#editModalImage').attr('src', e.target.result);
                     $('#myModal').modal('hide');
                     $('#editModal').modal();
                     $('#editModalImage').load(function(){
                         $(this).Jcrop({
                             aspectRatio: 1,
                             minSize: [400, 400],
                             maxSize: [400, 400],
                             setSelect:   [ $('#editModalImage').width() / 2 - 200, $('#editModalImage').height() / 2 - 200, $('#editModalImage').width() / 2 + 200, $('#editModalImage').height() / 2 + 200 ],
                             onSelect: function(e) {
                                 SelectionPosition = e;
                             },
                             onChange: function() {
                                 SelectionPosition = e;
                             }
                         });
                     });
                     
                };
            })(f);
            reader.readAsDataURL(f);
        }
        
    }
});

Template.editAvatarModal.events({
    'click #apply': function(e) {
        e.preventDefault();
        //console.log(SelectionPosition);
        CropImage($('#editModalImage')[0], SelectionPosition.x * (-1), SelectionPosition.y * (-1), SelectionPosition.w, SelectionPosition.h, $('#editModalImage').width(), $('#editModalImage').height(), function(canvas){
            canvas.toBlob(function(file){
                console.log(file);
                Meteor.saveFile(file, file.name);
                $('#editModal').modal('hide');
            }, 'image/jpeg');
        });
    }
});