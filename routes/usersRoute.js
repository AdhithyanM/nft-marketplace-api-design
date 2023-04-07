const express = require("express");

const router = express.Router();

// INTERNAL IMPORT
// const {
//   getAllUsers,
//   getSingleUser,
//   createUser,
//   updateUser,
//   deleteUser,
// } = require("../controllers/userController");
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
