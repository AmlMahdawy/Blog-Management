const express = require("express");
const router = express.Router();
const BlogsController = require('../Controllers/BlogsController');
const authorise = require('../Middlewares/Authorise')
router.get('/all', BlogsController.getAllBlogs);
router.post('/create', BlogsController.addBlog);
router.delete('/delete/:id', authorise, BlogsController.deleteBlog);
router.put("/update/:id", authorise, BlogsController.updateBlog);

module.exports = router;