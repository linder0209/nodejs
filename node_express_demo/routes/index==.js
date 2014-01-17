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



//定义路由
app.get('/', routes.index);

app.all('/login', notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', authentication);
app.get('/logout', routes.logout);
app.get('/home', authentication);
app.get('/home', routes.home);

// 发布博客路由
app.get('/blog/list',blog.list);//显示博客列表
app.post('/blog/save',blog.save);//保存修改
//app.get('/blog/json/:name',movie.movieJSON);//JSON数据

// 过滤函数
function authentication(req, res, next) {
  if (!req.session.user) {
    req.session.error = 'Please login at first.';
    return res.redirect('/login');
  }
  next();
}
function notAuthentication(req, res, next) {
  if (req.session.user) {
    return res.redirect('/home');
  }
  next();
}