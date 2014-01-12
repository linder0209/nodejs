/**
 * 模块依赖
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();

// all environments
// 环境变量
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//让ejs模板改为扩展名为html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// Required by session() middleware
// pass the secret for signed cookies
// (required by session())
app.use(express.cookieParser('your secret here'));
app.use(express.session());

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if (err) {
    res.locals.message = '<div class="alert alert-danger">' + err + '</div>';
  }
  next();
});

app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));

//设置多个 static-files ，这样在加载的时候就可以不用书写public和components
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/components')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//定义路由
app.get('/', routes.index);

app.all('/login', notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', authentication);
app.get('/logout', routes.logout);
app.get('/home', authentication);
app.get('/home', routes.home);

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

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
