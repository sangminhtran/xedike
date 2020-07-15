const express = require("express");
const userController = require("./controller");
const router = express.Router();
const {authenticate, authorize}=require('../../../middleware/auth')
const {uploadImage} = require('../../../middleware/uploadImage')






//GET: {host}/api/users (PUBLIC)
//GET: {host}/api/users/:id
//POST: {host}/api/users (PUBLIC)
//PUT: {host}/api/users/:id (PRIVATE)
//DELETE: {host}/api/users/:id

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put(
  "/:id",
  authenticate,
  authorize(["driver", "passenger"]),
  userController.updateUserById
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUserById
);
router.post(
  "/upload-avatar/:id",
  uploadImage('avatar'),
  userController.uploadAvatar
);

router.post("/login", userController.login);

module.exports = router;
