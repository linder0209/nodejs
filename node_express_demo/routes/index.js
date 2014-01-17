/**
 *  routes config
 */
"use strict";
var home = require('./home');
var blog = require('./blog');

module.exports = function (app) {
  app.get('/', home.index);
  app.get('/blog', blog.index);
  app.get('/blog/list', blog.list);
  app.post('/blog/save', blog.save);
};
