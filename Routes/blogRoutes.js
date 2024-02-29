const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  getBlogByIdController,
  updateBlogController,
  deleteBlogController,
  userBlogController,
} = require("../Controllers/blogController");



const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const uploader = multer({ storage: storage });


//rout object
const router = express.Router();


//get all blogs || GET
router.get("/all-blogs", getAllBlogsController);

//create a blog || POST
router.post("/create", uploader.single("image"), createBlogController);

//get one blog || Get
router.get("/get-blog/:id", getBlogByIdController);

//Update a blog || PUT
router.put("/update-blog/:id", uploader.single("image"), updateBlogController);

//delete a blog || Delete
router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", userBlogController);




module.exports = router;
