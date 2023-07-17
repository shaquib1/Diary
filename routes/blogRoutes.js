const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
} = require("../controllers/blogController");

//router object
const router = express.Router();

//routes
// GET || all blogs
router.get('/all-blog', getAllBlogsController);

//POST || create blog
router.post('/create-blog', createBlogController);

//PUT || update blog
router.put('/update-blog/:id', updateBlogController);

//GET || SIngle Blog Details
router.get('/get-blog/:id', getBlogByIdController);

//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController);


module.exports = router;
