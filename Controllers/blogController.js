const mongoose = require("mongoose");
const blogModel = require("../Models/blogModel");
const userModel = require("../Models/UserModel");

const Upload = require("../Middlewares/upload")




//get all blogs
exports.getAllBlogsController = async (req, res) => {

    try {
        const blogs = await blogModel.find({}).populate("user");
        console.log(blogs);
        if (!blogs) {
            return res.status(404).send({
                status: false,
                message: "No Blogs found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "all blogs",
            BlogCount: blogs.length,
            blogs


        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: "Error while getting blogs",
            error
        })
    }
}


// create a blog
exports.createBlogController = async (req, res,) => {
    try {


        if (!req.file) {
            return res.status(500).json({ error: "No file found" });
        }
        //console.log(req.body)

        const upload = await Upload.uploadFile(req.file.path)
        //console.log(upload)


        //console.log(image)
        const { title, description, user } = req.body;
        if (!title || !description || !user) {
            return res.status(404).send({
                status: false,
                message: "Please provide all values."

            })
        }

        const existingUser = await userModel.findById(user)
        if (!existingUser) {
            return res.status(404).send({
                status: false,
                message: "user not found"
            })
        }

        const newBlog = new blogModel({ title, description, image: upload.secure_url, user })
        await newBlog.save();
        existingUser.blogs.push(newBlog)
        await existingUser.save()
        return res.status(200).send({
            success: true,
            message: "Blog created successfully"
        })



    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: "Error while creating blog",
            error
        })

    }
}



// get a single blog
exports.getBlogByIdController = async (req, res) => {

    try {
        const { id } = req.params;

        const singleBlog = await blogModel.findById(id)
        return res.status(201).send({
            success: true,
            message: "Single Blog fetched successfully.",
            singleBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in  getting single blog.",
            error
        })

    }


}

//update a blog
exports.updateBlogController = async (req, res) => {
    // if (!req.file) {
    //     return res.status(500).json({ error: "No file found" });
    // }
    //console.log(req.file)
    let Image;
    if (req.file) {

        const upload = await Upload.uploadFile(req.file.path)
        Image = upload.secure_url
    }



    const { id } = req.params;

    const updatedBlog = await blogModel.findByIdAndUpdate(
        id,
        { ...req.body, image: Image },
        { new: true }
    )
    return res.status(201).send({
        success: true,
        message: "Blog updated successfully",
        updatedBlog
    })
}




//delete a blog

exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params

        const blog = await blogModel.findByIdAndDelete(id).populate("user");
        console.log(blog)
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while deleting blog",
            error
        })

    }


}


// get user blog
exports.userBlogController = async (req, res) => {

    try {

        const { id } = req.params;
        const userBlogs = await userModel.findById(id).populate("blogs");
        if (!userBlogs) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User blogs fetched successfully",
            userBlogs
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while getting users blogs",
            error
        })

    }

}
