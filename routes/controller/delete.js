const NotApprovedBlog= require('../../model/unapproved_blog');
const NotApprovedCRO= require('../../model/unapproved_cro');
const ApprovedCRO= require('../../model/approved_cro');
const ApprovedBlog= require('../../model/approved_blog');
const updateController= require('./update');
const SavedBlog = require('../../model/savedblog');

class DeleteOperationController{
  // This methord is for deleting the unpproved blog
  // when we approved that blog
  deleteUnapprovedBlog(id){
    console.log('del hit');
    return new Promise((resolve, reject)=> {
    // updateController.deleteApproveBlog(values.mainid);

    NotApprovedBlog.findByIdAndDelete({_id:id})
    .then(result =>{
      console.log("Blog deleted from UnApproved",result);
      return resolve(result);
    })
    .catch(err =>{
      console.log("Error in Deleting Blog", err);
      return reject(err);
    })
    });
}

  deleteAuthorUnapprovedBlog(values){
    console.log('del hit');
    return new Promise((resolve, reject)=> {
    updateController.deleteApproveBlog(values.mainid);

    NotApprovedBlog.findByIdAndDelete({_id:values.unapproveid})
    .then(result =>{
      console.log("Blog deleted from UnApproved",result);
      return resolve(result);
    })
    .catch(err =>{
      console.log("Error in Deleting Blog", err);
      return reject(err);
    })
    });
}

  // This methord is for deleting the approved blog by author
  deleteApprovedBlog(values){
    return new Promise((resolve, reject)=> {

    updateController.deleteApproveBlog(values.mainid);

    ApprovedBlog.findByIdAndDelete({_id:values.approveid})
    .then(result =>{
      console.log("Blog deleted from Approved",result);
      return resolve(result);
    })
    .catch(err =>{
      console.log("Error in Deleting Blog", err);
      return reject(err);
    })
    });
}

// Deleting Saved BLog
  deleteSavedBlog(id){
      console.log('hit delete,&&&&&&&&&&&&&&&&&!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',id)
      SavedBlog.findByIdAndDelete({_id:id})
      .then(result =>{
        console.log("Saved Blog Deleted", result);
      })
      .catch(err =>{
        console.log("Error in Deleting Saved Blog", err);
      })
}

  // This methord is for deleting the unpproved author
  // when we approved that author profile
  deleteUnApprovedCRO(id){
    return new Promise((resolve, reject)=> {
      console.log('hit delete')
      NotApprovedCRO.findByIdAndDelete({_id:id})
      .then(result =>{
        console.log("Author Profile deleted from UnApproved", result);
        resolve(result);
      })
      .catch(err =>{
        console.log("Error in Deleting Author Profile", err);
        reject(err);
      })
    })
  }
}

module.exports= new DeleteOperationController();
