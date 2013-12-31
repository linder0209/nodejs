/**
 * Created by wangyanjun on 13-12-30.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs');
exports.mongoose = mongoose;