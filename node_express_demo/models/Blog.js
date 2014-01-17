var mongodb = require('./mongodb');
var mongoose = mongodb.mongoose;
var Schema = mongodb.mongoose.Schema;

// Defining a schema
var blogSchema = new Schema({
  title:  String,
  category: Number,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

//define Instance methods
blogSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Blog').find({ category: this.category }, cb);
}

/**
 * Creating a model
 * @type {*|Model}
 * @example
   var weibo = new Blog({ type: 'weibo' });
   weibo.findSimilarTypes(function (err, weibo) {
      console.log(weibo);
    });
 */
var Blog = mongoose.model('Blog', blogSchema);


// Blog DAO
var BlogDAO = function () {};

BlogDAO.prototype.save = function(obj, callback) {
  var instance = new Blog(obj);
  instance.save(function(err){
    callback(err);
  });
};

BlogDAO.prototype.list = function(callback) {
  Blog.find(function(err, obj){
    callback(err, obj);
  });
};

module.exports = new BlogDAO();