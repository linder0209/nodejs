var express = require('express')
  , app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

function User(name) {
  this.private = 'heyyyy';
  this.secret = 'something';
  this.name = name;
  this.id = 123;
}

// You'll probably want to do
// something like this so you
// dont expose "secret" data.

User.prototype.toJSON = function () {
  return {
    id: this.id,
    name: this.name
  }
};

app.use(express.logger('dev'));

// earlier on expose an object
// that we can tack properties on.
// all res.locals props are exposed
// to the templates, so "expose" will
// be present.

app.use(function (req, res, next) {
  //设置res.locals.expose
  res.locals.expose = {};
  // you could alias this as req or res.expose
  // to make it shorter and less annoying
  next();
});

// pretend we loaded a user

app.use(function (req, res, next) {
  //启动后会执行use中的方法，故req.user会被赋对象
  req.user = new User('Tobi');
  next();
});

app.get('/', function (req, res) {
  res.redirect('/user');
});

app.get('/user', function (req, res) {
  // we only want to expose the user
  // to the client for this route:
  res.locals.expose.user = req.user;
  res.render('page');
});

app.listen(3000);
console.log('app listening on port 3000');