import blogModel from '../models/blogs.js'


const createBlog = async(req,res)=>{
    try {
        const {title,description} = req.body
        if(title && description)
        { 
            await blogModel.create({
                title,
                description,
                createdBy:req.headers.userId,
            })

            res.status(201).send({
                message:"Blog Created"
            })
        }
        else
        {
            res.status(400).send({
                message:"Title, Description are required",
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const editBlog = async(req,res)=>{
    try {
        const blogId = req.params.id
        if(blogId)
        {
            const {title,description} = req.body
            let blog = await blogModel.findById(blogId)
            blog.title = title
            blog.description = description
            blog.modifiedAt = Date.now()

            await blog.save()

            res.status(200).send({
                message:"Blog Edited Successfully"
            })
        }
        else
        {
            res.status(400).send({message:"Blog Id Not found"})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const getAllBlogs = async(req,res)=>{
    try {
        let blogs = await blogModel.find({},{_id:1,title:1,description:1,createdAt:1,
            firstName:1}).sort({createdAt:0})
        res.status(200).send({
            message:"Blogs Fetched Successfully",
            blogs
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const getBlogById = async(req,res)=>{
    try {
        const blogId = req.params.id
        if(blogId)
        {
            let blog = await blogModel.findById(req.params.id)
            res.status(200).send({
                message:"Blog Data Fetched Successfully",
                blog
            })
        }
        else
        {
            res.status(400).send({message:"Blog Id Not found"})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const getBlogsByUserId = async(req,res)=>{
    try {
        let blogs = await blogModel.find({createdBy:req.headers.userId},{_id:1,title:1,description:1,createdAt:1}).sort({createdAt:1})
        res.status(200).send({
            message:"Blogs Fetched Successfully",
            blogs
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
const deleteBlog = async(req,res)=>{
    try {
        let blog = await blogModel.findOne({_id:req.params.id})
        if(blog)
        {
            await blogModel.deleteOne({_id:req.params.id})
            res.status(200).send({message:"Blog Deleted Successfully"})
        }
        else
        {
            res.status(400).send({message:"Blog not found"})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}


export default{
    createBlog,
    editBlog,
    getAllBlogs,
    getBlogById,
    getBlogsByUserId,
    deleteBlog
}