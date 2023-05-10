const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const checkUuid = require("../middleware/checkUuid");

router.get("/", usersController.getAllUsers);
router.get("/:userId", checkUuid, usersController.getUserById);
router.post("/", usersController.createUser);
router.put("/:userId", checkUuid, usersController.updateUser);
router.delete("/:userId", checkUuid, usersController.deleteUser);

module.exports = router; 