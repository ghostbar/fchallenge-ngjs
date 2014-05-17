'use strict';

var express = require('express');
var modRw = require('connect-modrewrite');
var app = express();

console.log(app.settings.env);

app.use(modRw([
  '!png|jpg|jpeg|gif|css|js|html|ttf|pdf|svg|webp$ /index.html [L]'
]));

if (app.settings.env === 'development') {
  app.use('/styles', express['static'](__dirname + '/.tmp/styles'));
  app.use('/scripts', express['static'](__dirname + '/.tmp/scripts'));
  app.use(express['static'](__dirname + '/app'));
}

if (app.settings.env === 'staging') {
  app.use(express['static'](__dirname + '/dist'));
}

var fs = require('fs');
var file = fs.readFileSync('Datos2.txt');
var string = file.toString().split('\n');
var counter = 0;

app.get('/data.json', function (req, res) {
  var data = string[counter];
  var async = require('async');
  data = data.split(';');
  data = data.slice(1);
 
  function runData (cb) {
    for (var i = 0; i < data.length; i++) {
      var e = data[i].split(',');

      data[i] = {
        id: i,
        type: e[0],
        x: Number(e[1]) + 100000,
        y: Number(e[2]) + 100000,
        z: Number(e[3]) + 100000
      };

      if (i === data.length - 1) {
        return cb();
      }
    }
  }

  function restruct (cb) {
    var c = 0;
    data.forEach(function (element, idx) {
      data[idx].x = (data[idx].x / 200000) * 600;
      data[idx].y = (data[idx].y / 200000) * 600;
      data[idx].z = (data[idx].z / 200000) * 600;

      c += 1;

      if (c === data.length - 1) {
        return cb();
      }
    });
  }

  /*
  function crashPrevent (cb) {
    for (var i = 0; i < data.length; i++) {
      data[i];

      if (i === data.length - 1) {
        return cb();
      }
    }
  }
  */

  function reorganize (cb) {
    var _ = require('lodash');
    data = _.sortBy(data, function (e) {
      return e.z;
    });

    return cb();
  }

  async.waterfall([runData, restruct, reorganize], function () {
    counter += 1;
    console.log(data);
    res.send(data);
  });
});

exports.startServer = function(port, path, callback) {
  var p = process.env.PORT || port;

  console.log('Starting server on port: ' + p + ', path /' + path);

  app.listen(p);

  // If there's a callback then give them a return!
  if (callback != null) {
    return callback(app);
  }
};

// If `PORT` is sent, then it will auto-start the server.
if (process.env.PORT) {
  this.startServer(process.env.PORT, 'dist');
}
