var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

// Defining a schema
var blogSchema = new Schema({
  title:  String,
  type: String,
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
  return this.model('Blog').find({ type: this.type }, cb);
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



var MovieDAO = function () {
};
module.exports = new MovieDAO();