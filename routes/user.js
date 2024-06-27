const express = require("express")
const { handleUserSigup , handleUserLogin, handleUserLogout} = require('../controllers/user')
const router = express.Router();

router.post("/", handleUserSigup);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;