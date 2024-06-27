const express = require("express")
const { handleUserSigup , handleUserLogin, handleUserLogout} = require('../controllers/user')
const router = express.Router();

router.post("/", handleUserSigup);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);

module.exports = router;