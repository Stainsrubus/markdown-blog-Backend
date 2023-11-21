import express from 'express'
import Auth from '../common/auth.js'
import BlogController from '../controllers/blogs.js'
const router = express.Router()

router.post('/create',Auth.validate, BlogController.createBlog)
router.put('/edit/:id',Auth.validate, BlogController.editBlog)
router.get('/user',Auth.validate, BlogController.getBlogsByUserId)
router.get('/',Auth.validate,Auth.adminGaurd, BlogController.getAllBlogs)
router.get('/:id',Auth.validate, BlogController.getBlogById)
router.delete('/:id',Auth.validate,BlogController.deleteBlog)

export default router