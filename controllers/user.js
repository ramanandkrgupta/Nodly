const {v4: uuidv4} = require("uuid")
const User = require('../models/user')
const { setUser } = require('../service/auth')
async function handleUserSigup(req, res) {
    const { name, password, email } = req.body;
    await User.create({
        name,
        email,
        password,

    });
    return res.redirect("/")
}

async function handleUserLogin(req, res) {
    const {email, password } = req.body;
    const user = await User.findOne({email, password});
    if(!user)
        return res.render("login", {
    error: "invalid username or password",
})
    const token = setUser(user);
    
    res.cookie("sessionId", token)
    return res.redirect("/")

    //return res.json({ token }); // header: auth


}

module.exports = {
    handleUserSigup,
    handleUserLogin,
}