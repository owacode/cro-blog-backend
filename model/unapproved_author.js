const mongoose= require('mongoose');
const validator=require('mongoose-unique-validator');

const author = mongoose.Schema({
  name:{type: String},
  about_author:{type: String},
  image:{type: String},
  date_added:{type: Date},
  location:{type: String},
  linkedIn_id:{type: String},
  instagram_id:{type: String},
  twitter_id:{type: String},
  facebook_id:{type: String},
  email:{type: String, unique:true},
  password:{type: String},
  salt:{type: String},
  token:{type: String},
  interest_category:[],
  main_id:{type:String},
  verified:{type:Boolean},
  form_filled:{type:Boolean},
}).plugin(validator);

module.exports = mongoose.model('NotApprovedAuthor', author, 'NotApprovedAuthors')
