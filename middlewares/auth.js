const { getUser } = require("../service/auth")

async function sessionVerification(req, res, next) {
    const sessionId = req.cookies?.sessionId;

    if(!sessionId) return res.redirect("/login");
    const user = getUser(sessionId);

    if (!user) return res.redirect("/login")
        req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const sessionId = req.cookies?.sessionId;

    
    const user = getUser(sessionId);

    
    req.user = user;
    next();
}
module.exports = {
    sessionVerification,
    checkAuth
}