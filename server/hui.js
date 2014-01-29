var fs = Npm.require('fs');
WebApp.connectHandlers.use(function(req, res, next) {
    var re = /^\/uploads\/(.*)$/.exec(req.url);
    if (re !== null) {
        var filePath = process.env.PWD + '/.uploads/' + re[1];
        var data = fs.readFileSync(filePath, data);
        res.writeHead(200, {
            'Content-Type': 'image'
        });
        res.write(data);
        res.end();
    } else {
        next();
    }
});