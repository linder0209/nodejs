
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , GithubView = require('./github-view')
  , md = require('marked').parse;

var app = module.exports = express();

// register .md as an engine in express view system
app.engine('md', function(str, options, fn){
  try {
    var html = md(str);
    html = html.replace(/\{([^}]+)\}/g, function(_, name){
      return options[name] || '';
    })
    fn(null, html);
  } catch(err) {
    fn(err);
  }
})

// pointing to a particular github repo to load files from it
//指定特定的路径，用views属性
app.set('views', 'visionmedia/express');

// register a new view constructor
//注册一个view 视图
app.set('view', GithubView);

app.get('/', function(req, res){
  // rendering a view relative to the repo.
  // app.locals, res.locals, and locals passed
  // work like they normally would
  //这里取得例子markdown中的模板
  res.render('examples/markdown/views/index.md', { title: 'Example' });
})

app.get('/Readme.md', function(req, res){
  // rendering a view from https://github.com/visionmedia/express/master/Readme.md
  res.render('Readme.md');
})

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
