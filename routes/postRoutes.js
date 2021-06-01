const express = require("express")
const postConteoller = require("../controllers/postController")
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router
    .route("/")
    .get(protect, postConteoller.getAllPosts)
    .post(protect, postConteoller.createPost)

router
    .route("/:id")
    .get(protect, postConteoller.getOnePost)
    .patch(protect, postConteoller.updatePost)
    .delete(protect, postConteoller.deletePost)

module.exports = router;