//  MongoDB Models
const NotApprovedBlog = require('../../model/unapproved_blog');
const NotApprovedCRO = require('../../model/unapproved_cro');
const ApprovedCRO = require('../../model/approved_cro');
const ApprovedBlog = require('../../model/approved_blog');
const AllBlog = require('../../model/all_blog');
const AllCRO = require('../../model/all_cro');

const AuthorVideo = require('../../model/author_video');
class FetchController {
  // Fetching all Blogs from DB
  getApprovedBlogs(value) {
    console.log(value, 'aaa')
    return new Promise((resolve, reject) => {
      //     const query= ApprovedBlog.find();
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
      ApprovedBlog.find({})
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getAllBlogs() {
    return new Promise((resolve, reject) => {
      AllBlog.find({})
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleAllBlogs(id) {
    return new Promise((resolve, reject) => {
      AllBlog.find({ _id: id })
        .then(result => {
          // console.log(result);
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getNotApprovedBlogs() {
    return new Promise((resolve, reject) => {
      NotApprovedBlog.find({})
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getCategoryApprovedBlogs(category) {
    return new Promise((resolve, reject) => {
      ApprovedBlog.find({ sub_category: category }).sort({ "date_added": -1 })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }


  getSingleApprovedBlogs(id) {
    return new Promise((resolve, reject) => {
      ApprovedBlog.find({ _id: id })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleNotApprovedBlog(id) {
    return new Promise((resolve, reject) => {
      NotApprovedBlog.find({ _id: id })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  getApprovedBlogsByAuthor(id) {
    return new Promise((resolve, reject) => {
      this.getSingleApprovedCRO({ _id: id })
        .then(result => {
          let blogs_id = result[0].approved_blogs_added;
          return ApprovedBlog.find({ _id: { $in: blogs_id } })
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  getUnapprovedBlogsByAuthor(id) {
    return new Promise((resolve, reject) => {
      this.getSingleApprovedCRO({ _id: id })
        .then(result => {
          let blogs_id = result[0].unapproved_blogs_added;
          return NotApprovedBlog.find({ _id: { $in: blogs_id } })
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    })
  }

  getAllBlogsByAuthor(id) {
    return new Promise((resolve, reject) => {
      this.getSingleApprovedCRO({ _id: id })
        .then(result => {
          let blogs_id = result[0].all_blogs_added;
          console.log(blogs_id);
          return AllBlog.find({ _id: { $in: blogs_id } })
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
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

  //<<--------------------------------------------------------------------Video Posted By Author Starts--------------------------------------------------------------------->>

  getVideo() {
    return new Promise((resolve, reject) => {
      AuthorVideo.find({})
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getSingleVideo(id) {
    return new Promise((resolve, reject) => {
      AuthorVideo.find({ _id: id })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getAuthorVideo(email) {
    return new Promise((resolve, reject) => {
      AuthorVideo.find({ author_email: email })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  getMostLikedBlogs() {
    return new Promise((resolve, reject) => {
      ApprovedBlog.find().sort({ "likecount": -1 }).limit(5)
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err));
    })
  }

  //<<--------------------------------------------------------------------Video Posted By Author Ends--------------------------------------------------------------------->>
}

module.exports = new FetchController()

