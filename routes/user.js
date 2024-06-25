const express = require("express")
const { handleUserSigup , handleUserLogin} = require('../controllers/user')
const router = express.Router();

router.post("/", handleUserSigup);
router.post("/login", handleUserLogin);

module.exports = router;