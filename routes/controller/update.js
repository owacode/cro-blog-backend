//  MongoDB Models
const NotApprovedCROBlog = require('../../model/unapproved_blog');
const NotApprovedCRO = require('../../model/unapproved_cro');
const ApprovedCRO = require('../../model/approved_cro');
const ApprovedCROBlog = require('../../model/approved_blog');
const CROSavedBlog = require('../../model/savedblog');
const AllCROBlogs = require('../../model/all_blog');
const AllCRO = require('../../model/all_cro');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodeoutlook = require('nodejs-nodemailer-outlook');

const nodemailerAuthCredential = {
  user: "OWACODE@onewateracademy.org",
  pass: "Panda@21"
}
let token;
class UpdateController {

  // Update Like on a Blog
  updateLikeBlog(id) {
    console.log('hitfefe', id)
    return new Promise((resolve, reject) => {

      ApprovedCROBlog.update(
        { _id: id },
        { $inc: { 'likecount': 1 } })
        .then(response => { console.log('Like Incremented blog'); })
        .catch(err => console.log(err));
    })
  }

  // Updating a Blog
  updateBlog(value) {
    return new Promise((resolve, reject) => {

      ApprovedCROBlog.updateOne({ _id: value.id },
        {
          title: value.title,
          category: value.category,
          dateadded: value.date,
          desc: value.desc,
          image: value.imageurl
        })
        .then(response => { console.log('updated blog'); resolve(response) })
        .catch(err => reject(err));
    })
  }

  // Update Saved Blog
  updateCROSavedBlog(values) {
    console.log(values, 'update CROSavedBlog')
    return new Promise((resolve, reject) => {
      CROSavedBlog.findByIdAndUpdate({ _id: values.id }, {
        $set: {
          title: values.title,
          desc: values.desc
        }
      })
        .then(result => {
          console.log('Saved Blog Updated');
          return resolve(result);
        })
        .catch(err => {
          console.log('error in Updated Saved Blog', err);
          return reject(err);
        });
    })
  }

  // Update Saved Blog
  updateSavedWithImageBlog(values) {
    console.log(values, 'update CROSavedBlog')
    return new Promise((resolve, reject) => {
      CROSavedBlog.findByIdAndUpdate({ _id: values.id }, {
        $set: {
          title: values.title,
          desc: values.desc,
          image: values.imageurl
        }
      })
        .then(result => {
          console.log('Saved Blog Updated with Image');
          return resolve(result);
        })
        .catch(err => {
          console.log('error in Updated Saved Blog with Image', err);
          return reject(err);
        });
    })
  }

  // Approve a Blog

  approveBlog(values) {
    console.log(values, 'blog iddddddd')
    AllCROBlogs.findByIdAndUpdate({ _id: values.mainid }, { $set: { approved_id: values.approveid, status: 'approved' } })
      .then(result => console.log('Updated to approved'))
      .catch(err => console.log('error in updating approve', err));
  }

  // Delete a Approve Blog
  deleteApproveBlog(id) {
    console.log('main del hit');
    AllCROBlogs.findByIdAndUpdate({ _id: id }, { $set: { status: 'deleted' } })
      .then(result => console.log('Updated to deleted'))
      .catch(err => console.log('error in updating approve', err));
  }
  // Rejecting a Blog

  rejectBlog(values) {
    return new Promise((resolve, reject) => {
      AllCROBlogs.findByIdAndUpdate({ _id: values.mainid }, { $set: { rejected: true, status: 'rejected' } })
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
  }

  //Add UnApproved id of Blog to Main Blog
  addUnapproveIdToMainBlog(values) {
    console.log(values, 'cro iddddddd')
    AllCROBlogs.findByIdAndUpdate({ _id: values.mainid }, { $set: { unapproved_id: values.blogid } })
      .then(result => console.log('Updated to approved'))
      .catch(err => console.log('error in updating approve', err));
  }

  // Update Profile of cro
  updateCROProfile(values) {
    console.log(values, 'cro iddddddd')
    return new Promise((resolve, reject) => {
      NotApprovedCRO.findByIdAndUpdate({ _id: values.id }, {
        $set: {
          name: values.name,
          bio: values.bio,
          image: values.imageurl,
          location: values.location,
          linkedIn_id: values.linkedIn,
          twitter_id: values.twitter,
          form_filled: true
        }
      })
        .then(result => {
          console.log('Updated to NotApprovedCRO');
          this.updateCROProfileMain(values);
          resolve(result);
        })
        .catch(err => console.log('error in updating approve', err));
    })
  }

  // Update Profile of cro
  updateCROApprovedProfile(values) {
    console.log(values, 'cro iddddddd ###')
    return new Promise((resolve, reject) => {
      ApprovedCRO.findByIdAndUpdate({ _id: values.id }, {
        $set: {
          name: values.name,
          bio: values.bio,
          image: values.imageurl,
          location: values.location,
          linkedIn_id: values.linkedIn,
          twitter_id: values.twitter,
          form_filled: true
        }
      })
        .then(result => {
          console.log('Updated to ApprovedCRO');
          this.updateCROProfileMain(values);
          return resolve(result);
        })
        .catch(err => {
          console.log('error in updating approve', err)
          return reject(err);
        });
    })
  }

  // Update Profile of cro TO Main Collection
  updateCROProfileMain(values) {
    console.log(values, 'cro iddddddd')
    AllCRO.findByIdAndUpdate({ _id: values.mainid }, {
      $set: {
        name: values.name,
        bio: values.bio,
        image: values.imageurl,
        location: values.location,
        linkedIn_id: values.linkedIn,
        twitter_id: values.twitter,
        form_filled: true
      }
    })
      .then(result => {
        console.log('Updated to AllCRO');

      })
      .catch(err => console.log('error in updating approve', err));
  }

  //Add Unapprove id to cro

  addUnapproveIdToCRO(values) {
    console.log(values, 'cro iddddddd')
    AllCRO.findByIdAndUpdate({ _id: values.mainid }, { $set: { unapproved_id: values.unapproved_id } })
      .then(result => console.log('Updated to approved'))
      .catch(err => console.log('error in updating approve', err));
  }

  // Approve a cro
  approveCRO(values) {
    console.log(values, 'cro iddddddd')
    AllCRO.findByIdAndUpdate({ _id: values.mainid }, { $set: { approved_id: values.approveid, status: 'approved' } })
      .then(result => console.log('Updated to approved', result))
      .catch(err => console.log('error in updating approve', err));
  }

  // Rejecting a cro Profile
  rejectCROProfile(values) {
    console.log(values, 'mohit hit')
    return new Promise((resolve, reject) => {
      AllCRO.findByIdAndUpdate({ _id: values.mainid }, { $set: { rejected: true, status: 'rejected' } })
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
  }

  recoverPassword(email) {
    return new Promise((resolve, reject) => {
      console.log('got email', email)
      token = jwt.sign({ email: email, platform: 'blog_cro' }, '@@#%&$ve%*(tok???//-!!==+++!!!e!!n)@reset@@@@pass');
      console.log(token);
      ApprovedCRO.find({ email: email })
        .then(result => {
          console.log(result)
          if (result.length == 0) {
            reject("Email Not Exist");
          } else {
            resetPasswordUserConfirmation(email);
            return resolve("Reset Mail Send Successfully");
          }
        })
    })
  }

  updatePassword(values) {
    return new Promise((resolve, reject) => {
      console.log(values);
      saltHashPassword(values.password)
        .then(result => {
          console.log('hash !!!', result);
          return AllCRO.findOneAndUpdate({ email: values.email }, { $set: { password: result.passwordHash, salt: result.salt } });
        })
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        })
    })
  }

}

function resetPasswordUserConfirmation(email) {
  console.log('$$$$$$$$$', email, token);
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: ' "OneWater " <OWACODE@onewateracademy.org> ',
    to: email,
    subject: "Reset Password✔", // Subject line
    text: "Reset Password",
    html: `
      <h4>Reset Password For Blog cro<h4>
      <p>Click on the link to Reset Your Password <a href="https://onewater.herokuapp.com/onewater/recover-password/` + token + `">https://onewater.herokuapp.com/onewater/recover-password/` + token + `
      </a>`, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
}

// This Function is for Getting IST
function getTime() {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330;   // IST offset UTC +5:30

  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

  // ISTTime now represents the time in IST coordinates
  return ISTTime;
}

//  ################################# Crypto Salt Hash Functions Start ###############################
var genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length);   /** return required number of characters */
};

var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  };
};

function saltHashPassword(userpassword) {
  console.log('salthash hit')
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  console.log('UserPassword = ' + userpassword);
  console.log('Passwordhash = ' + passwordData.passwordHash);
  console.log('nSalt = ' + passwordData.salt);

  return new Promise((resolve, reject) => {
    resolve(passwordData);
  })
}
//  ################################# Crypto Salt Hash Function Ends ###############################
module.exports = new UpdateController();
