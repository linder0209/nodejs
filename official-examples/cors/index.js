/**
 * Module dependencies.
 */

var express = require('express'),
  app = express(),
  api = express();

// app middleware

app.use(express.static(__dirname + '/public'));

// api middleware

api.use(express.logger('dev'));
api.use(express.bodyParser());

/**
 * CORS support.
 * 类似于java中的过滤器，所有的HTTP动作被访问时，都会先执行该方法来过滤一些信息，比如验证、权限等。
 */

api.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

/**
 * POST a user.
 */

api.post('/user', function(req, res){
  console.log(req.body);
  res.send(201);
});

app.listen(3000);
api.listen(3001);

console.log('app listening on 3000');
console.log('api listening on 3001');
