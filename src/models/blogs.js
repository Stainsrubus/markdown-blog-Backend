import mongoose from "./index.js";

const blogSchema = new mongoose.Schema({
    title:{type:String,required:[true,"Title is required"]},    
    description:{type:String,required:[true,"Description is required"]},
    createdBy:{type:String,required:[true,"Created By is required"]},    modifiedAt:{type:Date},
    createdAt:{type:Date, default:Date.now()}
},{
    collection:'blogs',
    versionKey:false
})

const blogModel = mongoose.model('blogs',blogSchema)
export default blogModel