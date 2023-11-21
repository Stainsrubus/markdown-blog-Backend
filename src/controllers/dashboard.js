import blogModel from '../models/blogs.js'

const getAllBlogs = async(req,res)=>{
    try {
        let blogs = await blogModel.find({},{_id:1,firstName:1,lastName:1,title:1,createdAt:1,description:1}).sort({createdAt:1})
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

export default {
    getAllBlogs
}