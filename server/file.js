Meteor.methods({
    saveFile: function(blob, name, path, encoding) {
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error(401, "You need to login to post new stories");
        }
        var path = cleanPath(path), fs =  Npm.require('fs'), crypto = Npm.require('crypto'),
        name = cleanName(name || 'file'), encoding = encoding || 'binary',
        
        chroot = Meteor.chroot || (process.env['PWD'] +'/.uploads') ;
        var extention = (/[.]/.exec(name)) ? /[^.]+$/.exec(name) : undefined;
        name = crypto.createHash('md5').update(Math.random().toString()).digest('base64') + '.' + extention;
        //path = chroot + (path ? '/' + path + '/' : '/');
        path = (path ? '/' + path + '/' : '/');
        try {
            fs.writeFileSync(chroot + path + name, blob, encoding);
        } catch (exeption) {
            console.log(exeption);
            return {status: 'error'};
        }
        
        
        
        var fields = {avatar: '/uploads' + path + name, originAvatar: '/uploads' + path + name};
                
        Meteor.users.update(user._id, {$set: {"profile.avatar": fields.avatar, "profile.originImage": fields.originAvatar}});
        
        function cleanPath(str) {
            if (str) {
                return str.replace(/\.\./g,'').replace(/\/+/g,'').
                        replace(/^\/+/,'').replace(/\/+$/,'');
            }
        }
        function cleanName(str) {
            return str.replace(/\.\./g,'').replace(/\//g,'');
        }
        
        return {status: 'success'};
    }
});