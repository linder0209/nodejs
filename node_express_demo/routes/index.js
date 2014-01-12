/*
 * GET home page.
 */
"use strict";
exports.index = function (req, res) {
  res.render('index', { title: 'Home' });
};
exports.login = function (req, res) {
  res.render('login', { title: 'login page'});
};
exports.doLogin = function (req, res) {
  var user = {
    username: 'admin',
    password: 'admin'
  };
  if (req.body.username === user.username && req.body.password === user.password) {
    req.session.user = user;
    res.redirect('/home');
  } else {
    req.session.error = 'The username or password is invalid, please relogin again.';
    res.redirect('/login');
  }
};
exports.logout = function (req, res) {
  req.session.user = null;
  res.redirect('/');
};
exports.home = function (req, res) {
  res.render('home', { title: 'Home'});
};