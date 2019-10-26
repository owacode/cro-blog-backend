const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const blog = mongoose.Schema({
  title:{type: String,required:true},
  category:[],
  date_added:{type: String},
  date_approved:{type: String},
  author_id:{type:String, require:true},
  author_name:{type:String, require:true},
  desc:{type: String,required:true},
  tags:[],
  likes:[],
  image:{type: String,required:true},
  blog_no:{type:Number}
}).plugin(auoInCrease.mongoosePlugin, {
  field: 'blog_no'
});

module.exports = mongoose.model('ApprovedBlog', blog, 'ApprovedBlogs')
