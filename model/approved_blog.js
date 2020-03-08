const mongoose= require('mongoose');
// Package to make a field of table auto-increasement
const auoInCrease = require('mongodb-autoincrement');
/**
 * Create Blog Model
 * Add AutoIncrease Plugin
 */
const blog = mongoose.Schema({
  title:{type: String,required:true},
  category:{type: String,required:true},
  sub_category:{type: String,required:true},
  read_time:{type: String},
  date_added:{type: String},
  date_approved:{type: Date},
  cro_id:{type:String, require:true},
  cro_image:{type:String},
  cro_name:{type:String},
  main_id:{type:String, require:true},
  desc:{type: String,required:true},
  tags:[],
  likes:[],
  likecount:{type:Number},
  image:{type: String,required:true},
  blog_no:{type:Number}
}).plugin(auoInCrease.mongoosePlugin, {
  field: 'blog_no'
});

module.exports = mongoose.model('ApprovedCROBlog', blog, 'ApprovedCROBlogs')
