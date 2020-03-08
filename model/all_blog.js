const mongoose= require('mongoose');

const blog = mongoose.Schema({
  approved_id:{type:String},
  unapproved_id:{type:String},
  author_id:{type:String},
  author_image:{type:String},
  author_name:{type:String},
  title:{type: String,required:true},
  read_time:{type:String},
  date_added:{type: Date},
  desc:{type:String},
  image:{type: String,required:true},
  rejected:{type:Boolean, default:false},
  status:{type:String, default:'pending'}
})

module.exports = mongoose.model('AllCROBlogs', blog, 'AllCROBlogs');
