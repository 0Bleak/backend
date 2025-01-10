const express = require("express");
const router = express.Router();
const userInfoController = require("../controllers/userInfoController");

router.post("/user-info", userInfoController.createUserInfo);
router.get("/user-info", userInfoController.getUserInfo);
router.put("/user-info/:id", userInfoController.updateUserInfo);
router.delete("/user-info/:id", userInfoController.deleteUserInfo);

module.exports = router;
