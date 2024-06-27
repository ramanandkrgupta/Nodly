const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const { sessionVerification, restrictTo } = require("../middlewares/auth")
const { handleUserLogout } = require('../controllers/user')
const URL = require("../models/url");
const { logout } = require('../service/auth')

const router = express.Router();

router.get("/admin/urls", restrictTo(['ADMIN']), async (req, res) => {
    //if(!req.user) return res.redirect("/login")

    const allurls = await URL.find({})
    res.render("home", {
        urls: allurls,
appUrl: process.env.PUBLIC_APP_URL,

    });
})



router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
    //if(!req.user) return res.redirect("/login")

    const allurls = await URL.find({ createdBy: req.user._id })
    res.render("home", {
        urls: allurls,
        vercelUrl: process.env.PUBLIC_APP_URL,
    });
});

router.get('/signup', (req, res) => {
    return res.render("signup")
});

router.get('/login', (req, res) => {
    return res.render("login")
});

router.get("/logout", handleUserLogout);


module.exports = router