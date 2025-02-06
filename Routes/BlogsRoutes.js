const express= require(express);
const router=express.router();
const BlogsController= require('../Controllers/BlogsController')
router.get('/',BlogsController.getAllBlogs);
router.post('/',BlogsController.addBlog);
router.delete('/:id',BlogsController.deleteBlog);
router.put("/:id",BlogsController.updateBlog);

 module.exports=router;