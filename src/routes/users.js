const { Router } = require("express");
const userController = require("../controllers/userController");
const protect = require("../middlewares/protect");

const router = Router();

router.route("/").get(protect, userController.listUsers);

router.route("/create").post(userController.createUsers);

router.route("/delete/:id").delete(protect, userController.deleteUser);

router.route("/login").post(userController.login);

module.exports = router;
