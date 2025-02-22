const express = require("express");
const router = express.Router();
const BlogsController = require('../Controllers/BlogsController');
router.get('/', BlogsController.getAllBlogs);
router.get('/:filter', BlogsController.getAllBlogs);
router.post('/create', BlogsController.addBlog);
router.delete('/delete/:id', BlogsController.deleteBlog);
router.put("/update/:id", BlogsController.updateBlog);

module.exports = router;