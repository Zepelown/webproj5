const express = require("express");
const {
  addUser,
  getAllUser,
  updateUser,
  login,
  signIn,
} = require("../controllers/userController");

const router = express.Router();

router.post("/user", addUser);
router.get("/users", getAllUser);
router.post("/updateUser/:id", updateUser);

router.get("/login", function (req, res, next) {
  res.render("api/login_");
});

router.post("/signIn", signIn);

router.post("/login_", login);

module.exports = {
  routes: router,
};
