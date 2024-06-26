const express= require('express');
const {  sessionVerification, restrictTo } = require("../middlewares/auth")
const URL = require("../models/url");

const router = express.Router();

router.get("/admin/urls", restrictTo(['ADMIN']), async (req, res) => {
    //if(!req.user) return res.redirect("/login")

    const allurls = await URL.find({})
    res.render("home", {
        urls: allurls,
    });
})

router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
    //if(!req.user) return res.redirect("/login")

    const allurls = await URL.find({ createdBy: req.user._id})
    res.render("home", {
        urls: allurls,
    });
});

router.get('/signup', (req, res) => {
    return res.render("signup")
});

router.get('/login', (req, res) => {
    return res.render("login")
});

module.exports = router