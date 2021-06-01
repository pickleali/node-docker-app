const express = require("express")
const userController = require("../controllers/authController")

const router = express.Router()

router.post("/signup", userController.signUp)
router.post("/login", userController.signIn)
router.get("/", userController.getAllUsers)
router
    .route("/:id")
    .get(userController.getOneUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;