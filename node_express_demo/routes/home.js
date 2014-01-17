/**
 * Created by wangyanjun on 14-1-15.
 * home routes
 */

exports.index = function (req, res) {
  res.render('home/index', { title: 'Home' });
};
