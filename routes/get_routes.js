const express = require('express');
const routes = express.Router();
let apicache = require( 'apicache');
let cache = apicache.middleware;
let c=require("./middleware/cache.js")
// Controllers
const adderController = require('./controller/adder');
const deleteController = require('./controller/delete');
const updateController = require('./controller/update');
const fetchController = require('./controller/fetch');
// Route for Getting All Approved Blogs
routes.get('/approveblogs',c.g,c.s, (req, res) => {
  fetchController.getApprovedCROBlogs(req.body)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})
// Route for Getting All Approved Blogs
routes.get('/category/:cat',c.g,c.s, (req, res) => {
  fetchController.getCategoryApprovedCROBlogs(req.params.cat)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})
// Route for Getting All Not Approved Blogs
routes.get('/notblogs',c.g,c.s, (req, res) => {
  fetchController.getNotApprovedCROBlogs()
    .then(result => res.status(200).json({
      status: "success",
      msg: "NotApproved Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

routes.get('/notapprovedblogsbycro/:id', (req, res) => {
  console.log(req.params, 'not app by mayor')
  fetchController.getUnApprovedBlogsByCRO(req.params.id)
    .then(result => {
      res.json({
        status: "success",
        msg: "Blogs by Author Fetch Successfully",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Blogs
routes.get('/allblogs',c.g,c.s, (req, res) => {
  fetchController.getAllCROBlogs(req.body)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting a AllCROBlogs
routes.get('/allblogs/:id',c.g,c.s,(req, res) => {
  fetchController.getSingleAllCROBlogs(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting a saved blogs by author
routes.get('/crosavedblogs/:id',c.g,c.s, (req, res) => {
  console.log(req.params.id)
  fetchController.getCROSavedBlogs(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Saved Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting a saved blogs by author
routes.get('/singlecrosavedblog/:id', (req, res) => {
  console.log(req.params.id)
  fetchController.getSingleCROSavedBlog(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single Saved Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single NotApprovedCROBlog Authors
routes.get('/singlenotappblog/:id', (req, res) => {
  fetchController.getSingleNotApprovedCROBlog(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single NotApproved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single ApprovedCROBlog
routes.get('/singleappblog/:id',c.g,c.s, (req, res) => {
  console.log(req.params, 'dwdnwklnkw');
  fetchController.getSingleApprovedCROBlogs(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single Approved Blog Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

routes.get('/approvedcroblogs/:id', (req, res) => {
  console.log(req.params, 'kksnkk')
  fetchController.getApprovedBlogsByCRO(req.params.id)
    .then(result => {
      res.json({
        status: "success",
        msg: "Blogs by Author Fetch Successfully",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

routes.get('/authorunApprovedCROBlogs/:id', (req, res) => {
  console.log(req.params, 'kksnkk')
  fetchController.getUnApprovedCROBlogsByAuthor(req.params.id)
    .then(result => {
      res.json({
        status: "success",
        msg: "Blogs by Author Fetch Successfully",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

routes.get('/croallblogs/:id',c.g,c.s, (req, res) => {
  console.log(req.params, 'kksnkk')
  fetchController.getAllCROBlogsByCRO(req.params.id)
    .then(result => {
      res.json({
        status: "success",
        msg: "Blogs by Author Fetch Successfully",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})
/*<-------------------------------------------------######Blogs Routes End######--------------------------------------------------->*/
// Route for Getting Details of Author Profile
routes.get('/single-cro/:id',c.g,c.s, (req, res) => {
  console.log(req.param.id,'iddd')
  fetchController.getSingleApprovedCRO(req.params.id)
    .then(result => {
      res.status(200).json({
        status: "success",
        msg: "Author Profile",
        result: result
      })
    })
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Not Approved Authors
routes.get('/pending-cro',c.g,c.s,(req, res) => {
  fetchController.getNotApprovedCRO()
    .then(result => res.status(200).json({
      status: "success",
      msg: "NotApproved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Top 3 Approved Authors
routes.get('/top-cro', (req, res) => {
  fetchController.getTopCRO()
    .then(result => res.status(200).json({
      status: "success",
      msg: "Top 3 Approved CRO Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single Not Approved Author
routes.get('/pending-cro/:id', (req, res) => {
  fetchController.getSingleNotApprovedCRO(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single NotApproved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Approved Authors
routes.get('/approvedcro',c.g,c.s, (req, res) => {
  fetchController.getApprovedCRO()
    .then(result => res.status(200).json({
      status: "success",
      msg: "Approved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Single Approved Author
routes.get('/approvedcro/:id',c.g,c.s, (req, res) => {
  fetchController.getSingleApprovedCRO(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Approved Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Authors
routes.get('/all-cro',c.g,c.s, (req, res) => {
  fetchController.getAllCRO()
    .then(result => res.status(200).json({
      status: "success",
      msg: "All Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting All Authors
routes.get('/all-cro/:id',c.g,c.s, (req, res) => {
  fetchController.getSingleAllCRO(req.params.id)
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single All Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// Route for Getting Most Liked Blogs
routes.get('/mostlikedblogs',c.g,c.s, (req, res) => {
  fetchController.getMostLikedBlogs()
    .then(result => res.status(200).json({
      status: "success",
      msg: "Single All Author Fetch Successfully",
      result: result
    }))
    .catch(err => res.status(200).json({
      status: "error",
      payload: err
    }));
})

// This is to Verify the Token For the Password Reset Of Author

routes.get('/reset/:token', (req, res) => {
  updateController.verifyUserEmailForPasswordReset(req.params)
    .then(result => {
      res.status(200).redirect('https://onewater.herokuapp.com/onewater/recover-password');
    })
    .catch(err => {
      res.status(400).json({
        status: 'error',
        error: err
      })
    })
})

module.exports = routes;
