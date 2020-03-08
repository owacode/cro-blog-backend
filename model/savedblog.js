const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const blog = mongoose.Schema({
  title:{type: String,required:true},
  date_added:{type: String},
  cro_id:{type:String, require:true},
  desc:{type: String,required:true},
  image:{type: String,required:true},
  blog_no:{type:Number}
}).plugin(auoInCrease.mongoosePlugin, {
  field: 'blog_no'
});

module.exports = mongoose.model('CROSavedBlog', blog, 'CROSavedBlogs')
