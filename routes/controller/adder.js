//  MongoDB Models
const NotApprovedCROBlog = require('../../model/unapproved_blog');
const NotApprovedCRO = require('../../model/unapproved_cro');
const ApprovedCRO = require('../../model/approved_cro');
const ApprovedCROBlog = require('../../model/approved_blog');
const AllCROBlogs = require('../../model/all_blog');
const AllCRO = require('../../model/all_cro');
const CROSavedBlog = require('../../model/savedblog');
const croVideo = require('../../model/cro_video');

// Controllers
const deleteController = require('./delete');
const updateController = require('./update');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodeoutlook = require('nodejs-nodemailer-outlook');
const nodemailerAuthCredential = {
  user: "OWACODE@onewateracademy.org",
  pass: "Panda@21"
}

let token;

class AdderOperationController {

  // Like a Blog
  likeTheBlog(values) {
    return new Promise((resolve, res) => {
      ApprovedCROBlog.findByIdAndUpdate({ _id: values.blogid }, {
        $addToSet: { likes: values.userid }
      })
        .then(result => {
          console.log(result, 'after like')
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  // This methord is for adding the blogid to the cro account (only for approved blogs)
  addLikeBlogToUser(values) {
    ApprovedCRO.findByIdAndUpdate({ _id: values.blogid }, {
      $addToSet: { approved_blogs_added: values.blogid }
    })
      .then(result => console.log("Adding blog to account Successfull", result))
      .catch(err => console.log("Adding blog to account Error", err));
  }

  addVideoBycro(value) {
    console.log('hitfefe', value)
    return new Promise((resolve, reject) => {
      const video = new croVideo({
        cro_email: value.email,
        cro_name: value.name,
        title: value.title,
        date_added: getTime(),
        desc: value.desc,
        link: value.link
      })
      video.save()
        .then((result) => {
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  // This methord is for posting a new blog
  //Initially Posting a New Blog will be saved in notapproved collection
  addNewBlogToUnApproved(value) {
    console.log('hitfefe', value)
    return new Promise((resolve, reject) => {
      this.addBlogToMain(value)
        .then((result) => {
          console.log(result, 'dwdw')
          const blog = new NotApprovedCROBlog({
            title: value.title,
            category: value.category,
            date_added: getTime(),
            cro_id: value.croid,
            cro_image: value.croimage,
            cro_name: value.croname,
            read_time: value.readtime,
            desc: value.desc,
            image: value.imageurl,
            main_id: result._id,
            likecount: 0
          })

          return blog.save()
        })

        .then((result) => {
          let id = {
            croid: result.cro_id,
            blogid: result._id,
            mainid: result.main_id
          }
          console.log(id, 'mohit cro$$$$$$$$$$$$')
          this.addUnApprovedCROBlogToUser(id);
          id = {
            mainid: result.main_id,
            blogid: result._id,
          }
          updateController.addUnapproveIdToMainBlog(id);
          // AdminMailForBlog(value);
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  // This methord is for posting a new blog
  //Initially Posting a New Blog will be saved in notapproved collection
  addNewBlogToApproved(value) {
    console.log(value, 'approved details category');
    return new Promise((resolve, reject) => {

      // First Deleting the unapproved blog from the collection
      deleteController.deleteUnApprovedCROBlog(value.unapproveid)
        .then(result => {
          console.log("not approved blog", result);
          const blog = new ApprovedCROBlog({
            title: result.title,
            category: value.category,
            sub_category: value.subcategory,
            read_time: result.read_time,
            date_added: result.date_added,
            date_approved: getTime(),
            cro_id: result.cro_id,
            cro_image: result.cro_image,
            cro_name: result.cro_name,
            main_id: result.main_id,
            desc: result.desc,
            likes: [],
            likecount: 0,
            blog_no: 0,
            tags: result.tags,
            image: result.image
          })
          return blog.save();
        })
        .then((result) => {
          const id = {
            croid: result.cro_id,
            blogid: result._id
          }
          console.log(id,'cro details0');
          this.addApprovedCROBlogToUser(id);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  //This is for adding the blog to collection where all the blogs are stored
  addBlogToMain(values) {
    console.log('hit all blogs', values);
    return new Promise((resolve, reject) => {
      const blog = new AllCROBlogs({
        approved_id: 'null',
        unapproved_id: 'null',
        cro_id: values.croid,
        cro_name: values.croname,
        cro_image: values.croimage,
        read_time: values.readtime,
        rejected: false,
        status: 'pending',
        title: values.title,
        category: values.category,
        date_added: getTime(),
        desc: values.desc,
        image: values.imageurl
      })

      blog.save()
        .then(result => {
          console.log("Blog added to AllCROBlogs")
          resolve(result);
        })
        .catch(err => {
          console.log("Error in adding blog to AllCROBlogs", err);
          reject(err);
        })
    })
  }

  // This methord is for adding the blogid to the cro account (only for approved blogs)
  addApprovedCROBlogToUser(values) {
    ApprovedCRO.findByIdAndUpdate({ _id: values.croid }, {
      $addToSet: { approved_blogs_added: values.blogid }
    })
      .then(result => console.log("Adding blog to account Successfull", result))
      .catch(err => console.log("Adding blog to account Error", err));
  }

  // This methord is for adding the blogid to the cro account (for unapproved and all blogs)
  addUnApprovedCROBlogToUser(values) {
    ApprovedCRO.findByIdAndUpdate({ _id: values.croid }, {
      $addToSet: { unapproved_blogs_added: values.blogid, all_blogs_added: values.mainid }
    })
      .then(result => console.log("Adding blog to account Successfull", result))
      .catch(err => console.log("Adding blog to account Error", err));
  }

  addLikeBlogToUser(values) {
    const like = {
      blogid: values.blogid
    }
    ApprovedCRO.findByIdAndUpdate({ _id: values.croid }, { $addToSet: { liked_blog: like } })
      .then(result => console.log("Blog liked added to user"))
      .catch(err => console.log("Error in Adding Blog to liked"))
  }

  // This is for adding the new cro
  // initially cro will we unapproved
  addUnApprovedCRO(values) {
    console.log(values);
    token = jwt.sign({ email: values.email }, '@@@#%&$ve%*(tok???//---==+++!!!e!!n)@rify@@@@');
    let salt;
    let hashpass;
    return new Promise((resolve, reject) => {
      this.addcroToMain(values)
        .then(result => {
          const cro = new NotApprovedCRO({
            name: values.name,
            bio: 'null',
            image: 'null',
            linkedIn_id: 'null',
            twitter_id: 'null',
            email: values.email,
            date_added: getTime(),
            main_id: result._id,
            verified: false,
            token: result.token,
            form_filled: false,
            salt: result.salt,
            password: result.password,
          });
          return cro.save();
        })

        .then(result => {
          verifyUser(values.email);
          const data = {
            unapproved_id: result._id,
            mainid: result.main_id
          }
          updateController.addUnapproveIdToCRO(data);
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  // This is for approving the cro
  // to post the blog by approving his profile
  addApprovedCRO(values) {
    console.log("approve hit")
    return new Promise((resolve, reject) => {
      // First Deleting the Auhor Profile from UnApproved Collection
      deleteController.deleteUnApprovedCRO(values.id)
        .then(result => {
          approvecroMail(result.email);
          console.log(result, 'hit app cro')
          const cro = new ApprovedCRO({
            name: result.name,
            bio: result.bio,
            date_added: result.date_added,
            date_approved: getTime(),
            image: result.image,
            location: result.location,
            email: result.email,
            linkedIn_id: result.linkedIn_id,
            twitter_id: result.twitter_id,
            blogs_added: [],
            main_id: result.main_id,
            token: token,
            salt: result.salt,
            password: result.password,
            all_blogs_added: [],
            unapproved_blogs_added: [],
            approved_blogs_added: []
          });
          return cro.save();
        })
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
  }

  //This is for adding the cro to collection where all the cros are stored
  addcroToMain(values) {
    token = jwt.sign({ email: values.email }, '@@@#%&$ve%*(tok???//---==+++!!!e!!n)@rify@@@@');
    let salt;
    let hashpass;
    return new Promise((resolve, reject) => {
      saltHashPassword(values.password)
        .then(result => {
          salt = result.salt;
          hashpass = result.passwordHash;
          const blog = new AllCRO({
            approved_id: 'null',
            bio: 'null',
            rejected: false,
            status: 'pending',
            name: values.name,
            date_added: getTime(),
            linkedIn_id: 'null',
            twitter_id: 'null',
            email: values.email,
            image: 'null',
            verified: false,
            token: token,
            form_filled: false,
            salt: salt,
            password: hashpass,
          })
          return blog.save();
        })
        .then(result => {
          console.log("cro added to AllCRO")
          resolve(result);
        })
        .catch(err => {
          console.log("Error in adding cro to AllCRO", err);
          reject(err);
        })
    })
  }

  //This is for adding the blog to collection where all the blogs are stored
  addToCROSavedBlog(values) {
    console.log('hit to saved blogs', values);
    return new Promise((resolve, reject) => {
      const blog = new CROSavedBlog({
        cro_id: values.croid,
        title: values.title,
        date_added: getTime(),
        desc: values.desc,
        image: values.imageurl,
        blog_no: 0
      })

      blog.save()
        .then(result => {
          console.log("Blog added to saved blog");
          resolve(result);
        })
        .catch(err => {
          console.log("Error in adding blog to saved blog", err);
          reject(err);
        })
    })
  }
  // Login Function
  login(userdata) {
    return new Promise((resolve, reject) => {
      console.log(userdata);
      AllCRO.find({ email: userdata.email })
        .then(result => {
          console.log('%%%%%%%', result)
          if (result.length == 0) {
            return reject('No User Found')
          }
          const passdata = sha512(userdata.password, result[0].salt);
          if (result[0].password !== passdata.passwordHash) {
            return reject("Incorrect Password");
          }
          if (result[0].verified == false) return reject("User Email not Verified");
          const token = jwt.sign({ email: result[0].email, userid: result[0]._id }, '%%%$$#book!*!(se!!ing^^&min%$#*)((//or'
          )
          console.log(result[0]._id, result[0].unapproved_id)
          resolve({ token: token, email: userdata.email, image: result[0].image, form_filled: result[0].form_filled, mainid: result[0]._id, id: result[0].unapproved_id, approvedid: result[0].approved_id, name: result[0].name });
        })
    })
  }

  verifyMail(values) {
    return new Promise((resolve, reject) => {
      AllCRO.find({ token: values.token })
        .then(result => {
          if (!result) {
            return reject("Invalid Token");
          }
          const verification_result = jwt.verify(values.token, '@@@#%&$ve%*(tok???//---==+++!!!e!!n)@rify@@@@');
          const user = verification_result.email;
          console.log(user);
          AllCRO.findOneAndUpdate({ email: user }, { $set: { verified: true } })
            .then(result => {
              console.log(result, 'User Verified');
              return resolve(result);
            })

        })
    })
  }

}

module.exports = new AdderOperationController();

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

function verifyUser(email) {
  console.log('$$$$$$$$$', email, token);
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: ' "OneWater " <OWACODE@onewateracademy.org> ',
    to: email,
    subject: "Verify Account✔", // Subject line
    text: "Verify your Email for OneWater cro",
    html: `
      <h4>Hello Welcome to OneWater<h4>
      <p>Click on the link to Verify Your Account <a href="https://onewater-cro.herokuapp.com/activate/` + token + `">https://onewater-cro.herokuapp.com/activate/` + token + `
      </a>
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
}

function AdminMailForBlog(values) {
  console.log(values, 'cro maillllllllllllllllll$$$')
  let sendingMail = {
    from: ' "OneWater " <onewateracademy1@gmail.com> ',
    to: 'Atharva.mungee@onewateracademy.org',
    subject: "New Blog Added", // Subject line
    text: "A new cro Profile has been added Please Check AdminPanel.",
    html: `
      <h4>Blog Added By ${values.croname}<h4>
      <h4>Title: ${values.title}<h4>
      <p> A new Blog has been added Please Check AdminPanel. </p>` // html body
  }

  transporter.sendMail(sendingMail, (error, info) => {
    if (error) {
      console.log("Error Hit&&&&")
      console.log('Nodemoalier Error%%%%%%%%%', error);
    }
    else {
      console.log("Success Hit&&&&")
      console.log("Email Sent!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", info.response);
    }
  })
}

function approvecroMail(email) {
  console.log('$$$$$$$$$', email);
  nodeoutlook.sendEmail({
    auth: nodemailerAuthCredential,
    from: ' "OneWater " <OWACODE@onewateracademy.org> ',
    to: email,
    subject: "Profile Approved✔", // Subject line
    text: "Your Profile has been approved for cro",
    html: `
      <h4> Congratulations Hello Welcome to OneWater Learning Academy<h4>
      <p>Your Profile has been approved for cro. You can now Post Blogs. Login and Add Your Blog.
      `, // html body
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
}
