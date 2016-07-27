'use strict';

var express = require('express');
var path = require('path');
var winston = require('winston')
  , bodyParser = require('body-parser');

var routes = function (app) {
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './', 'index.html'));
  });
};

var app = express()
  , port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (err, req, res, next) {
  console.log(err.name);
  if (err.name == "ValidationError") {
    res.send(400, err);
  } else {
    next(err);
  }
});

app.use(express.static(path.join(__dirname, './')));

app.use(function (err, req, res, next) {
  res.send(500, err);
});

function run() {
  routes(app);
  app.listen(port, function () {
    winston.info("App running on port:" + port);
  });
}

if (module.parent) {
  module.exports.run = run;
} else {
  run();
}