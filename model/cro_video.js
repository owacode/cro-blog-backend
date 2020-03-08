const mongoose= require('mongoose');

const blog = mongoose.Schema({
  author_email:{type:String},
  author_name:{type:String},
  title:{type:String},
  date_added:{type:Date},
  link:{type:String},
  desc:{type: String}
})

module.exports = mongoose.model('AuthorVideo', blog, 'AuthorVideos');
