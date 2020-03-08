const mongoose= require('mongoose');

const blog = mongoose.Schema({
  title:{type: String,required:true},
  date_added:{type: Date},
  read_time:{type:String},
  cro_id:{type:String, required:true},
  cro_image:{type:String},
  cro_name:{type:String},
  desc:{type: String,required:true},
  main_id:{type:String},
  image:{type: String,required:true}
})

module.exports = mongoose.model('NotApprovedCROBlog', blog, 'NotApprovedCROBlogs')
