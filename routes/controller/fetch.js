//  MongoDB Models
const NotApprovedCROBlog = require('../../model/unapproved_blog');
const NotApprovedCRO = require('../../model/unapproved_cro');
const ApprovedCRO = require('../../model/approved_cro');
const ApprovedCROBlog = require('../../model/approved_blog');
const AllCROBlogs = require('../../model/all_blog');
const AllCRO = require('../../model/all_cro');
const croVideo = require('../../model/cro_video');
const CROSavedBlog = require('../../model/savedblog');

class FetchController {
  // Fetching all Blogs from DB
  getApprovedCROBlogs(value) {
    console.log(value, 'aaa')
    return new Promise((resolve, reject) => {
      //     const query= ApprovedCROBlog.find();
      //     const pagesize= +value.pagesize;
      //     const currentpage= +value.currentpage;
      //     let fetchblogs;

      //     if(pagesize && currentpage){
      //       query
      //       .skip(pagesize * (currentpage - 1))
      //       .limit(pagesize);
      //     }
      //     query
      //     .then(documents=> {
      //       // console.log(documents,'dsdw');
      //       fetchblogs= documents;
      //       return Blog.count();
      //     })
      //     .then(totalBlogs=> resolve(fetchblogs, totalBlogs))
      //     .catch(err => reject(err));
      ApprovedCROBlog.find({})
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getAllCROBlogs() {
    return new Promise((resolve, reject) => {
      AllCROBlogs.find({})
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleAllCROBlogs(id) {
    return new Promise((resolve, reject) => {
      AllCROBlogs.find({ _id: id })
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getNotApprovedCROBlogs() {
    return new Promise((resolve, reject) => {
      NotApprovedCROBlog.find({})
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getCategoryApprovedCROBlogs(category) {
    return new Promise((resolve, reject) => {
      ApprovedCROBlog.find({ sub_category: category }).sort({ "date_added": -1 })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleApprovedCROBlogs(id) {
    return new Promise((resolve, reject) => {
      ApprovedCROBlog.find({ _id: id })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleNotApprovedCROBlog(id) {
    return new Promise((resolve, reject) => {
      NotApprovedCROBlog.find({ _id: id })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getApprovedBlogsByCRO(id) {
    return new Promise((resolve, reject) => {
      this.getSingleApprovedCRO(id)
        .then(result => {
          console.log(result,'result')
          let blogs_id = result[0].approved_blogs_added;
          return ApprovedCROBlog.find({ _id: { $in: blogs_id } })
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  getUnApprovedBlogsByCRO(id) {
    return new Promise((resolve, reject) => {
      this.getSingleApprovedCRO({ _id: id })
        .then(result => {
          let blogs_id = result[0].unapproved_blogs_added;
          return NotApprovedCROBlog.find({ _id: { $in: blogs_id } })
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  getAllCROBlogsByCRO(id) {
    return new Promise((resolve, reject) => {
      this.getSingleApprovedCRO({ _id: id })
        .then(result => {
          let blogs_id = result[0].all_blogs_added;
          console.log(blogs_id);
          return AllCROBlogs.find({ _id: { $in: blogs_id } })
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  getCROSavedBlogs(id) {
    return new Promise((resolve, reject) => {
      CROSavedBlog.find({cro_id:id}).sort({ "date_added": -1 })
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    })
  }

  getSingleCROSavedBlog(id) {
    return new Promise((resolve, reject) => {
      CROSavedBlog.findOne({_id:id})
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    })
  }

  /* <!------------------------------------------------------**********BLOG END***********-------------------------------------------!> */
  getNotApprovedCRO() {
    return new Promise((resolve, reject) => {
      NotApprovedCRO.find({})
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleNotApprovedCRO(id) {
    return new Promise((resolve, reject) => {
      NotApprovedCRO.find({ _id: id })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleApprovedCRO(id) {
    console.log(id, 'dwfcwe')
    return new Promise((resolve, reject) => {
      ApprovedCRO.find({ _id: id })
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getApprovedCRO() {
    return new Promise((resolve, reject) => {
      ApprovedCRO.find({})
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getAllCRO() {
    return new Promise((resolve, reject) => {
      AllCRO.find({})
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleAllCRO(id) {
    return new Promise((resolve, reject) => {
      AllCRO.find({ _id: id })
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  //<<--------------------------------------------------------------------Video Posted By cro Starts--------------------------------------------------------------------->>

  getVideo() {
    return new Promise((resolve, reject) => {
      croVideo.find({})
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleVideo(id) {
    return new Promise((resolve, reject) => {
      croVideo.find({ _id: id })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getcroVideo(email) {
    return new Promise((resolve, reject) => {
      croVideo.find({ cro_email: email })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getMostLikedBlogs() {
    return new Promise((resolve, reject) => {
      ApprovedCROBlog.find().sort({ "likecount": -1 }).limit(5)
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  //<<--------------------------------------------------------------------Video Posted By cro Ends--------------------------------------------------------------------->>
}

module.exports = new FetchController()

