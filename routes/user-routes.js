const express = require("express");
const {
  addUser,
  getAllUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/user", addUser);
router.get("/users", getAllUser);
router.post("/updateUser/:id", updateUser);

module.exports = {
  routes: router,
};
