var blogDAO = require('./../models/Blog.js');

exports.index = function (req, res) {
  res.render('blog/index', { title: 'Blog'});
};

exports.save = function (req, res) {
  var json = req.body;
  if (json.id) {//update
  } else {//insert
    blogDAO.save(json, function (err) {
      if (err) {
        res.send({'success': false, 'err': err});
      } else {
        res.send({'success': true});
      }
    });
  }
};

exports.list = function (req, res) {
  blogDAO.list(function(err, obj){
    res.send(obj);
  });
};