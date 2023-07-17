const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');


// GET ALL BLOGS
exports.getAllBlogsController = async(req, res)=>{
    try {
        const blogs = await blogModel.find({})
        if (!blogs) {
          return res.status(200).send({
            success: false,
            message: "No Blogs Found",
          });
        }
        return res.status(200).send({
          success: true,
          BlogCount: blogs.length,
          message: "All Blogs lists",
          blogs,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error WHile Getting Blogs",
          error,
        });
      }
    };
    

// Create Blog
exports.createBlogController = async(req , res)=>{
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting blog",
      error,
    });
  }
};


//Update Blog
exports.updateBlogController = async(req , res)=>{
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};


//Single Blog
exports.getBlogByIdController = async(req , res)=>{
  try {
    const {id} = req.params;  //it means destructuring
    const singleBlog=await blogModel.findById(id);
    //validation
    if(!singleBlog){
      return res.status(404).send({
        success:false,
        message:"Blog not found with this id"
      })
    }
    return res.status(200).send({
      success:true,
      message:"fetch single blog",
      singleBlog,   
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message:"error while getting single blog",
      error,
    })
  }
};


//Delete Blog
exports.deleteBlogController = async(req , res)=>{
  try {
    await blogModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success:true,
      message:"Blog Deleted!"
    })
  } catch (error) {
    console.log(error);
     return res.status(400).send({
      success:false,
      message:"error while deleting blog",
      error,
     })
  }
};