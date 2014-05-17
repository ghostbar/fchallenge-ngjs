var express = require("express"),
    modRw = require('connect-modrewrite'),
    app = express(),
    oneDay = 86400000;

console.log(app.settings.env);


app.use(modRw([
  '!png|jpg|jpeg|gif|css|js|html|ttf|pdf|svg|webp$ /index.html [L]'
]));

if (app.settings.env === 'development') {
  app.use('/styles', express["static"](__dirname + '/.tmp/styles'));
  app.use('/scripts', express["static"](__dirname + '/.tmp/scripts'));
  app.use(express["static"](__dirname + '/app'));
}

if (app.settings.env === 'staging') {
  app.use(express["static"](__dirname + '/dist'));
}

exports.startServer = function(port, path, callback) {
  var p = process.env.PORT || port;

  console.log("Starting server on port: " + p + ", path /" + path);

  app.listen(p);

  // If there's a callback then give them a return!
  if (callback != null) {
    return callback(app);
  }
};

// If `PORT` is sent, then it will auto-start the server.
if (process.env.PORT) {
  this.startServer(process.env.PORT, "dist");
}
