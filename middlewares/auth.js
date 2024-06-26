const { getUser } = require("../service/auth");

// function checkForAuthentication(req, res, next) {
//     const authorizationHeaderValue = req.headers["authorization"];
//     req.user = null;
//     if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer'))
//         return next();
    
//     const token = authorizationHeaderValue.split('Bearer ')[1];
//     getUser(token);

//     req.user = user;
//     return next();
// }

// function restrictTo(roles) {
//     return (req, res, next) => {
//         if(!req.user) return res.redirect("/login")

//         if(!roles.include(req.user.role)) return req.end("UnAuthorized")
        
//         return next();
//     };
// }





async function sessionVerification(req, res, next) {
    const sessionId = req.cookies?.sessionId;

    if(!sessionId) return res.redirect("/login");
   // const token = sessionId.split("Bearer ")[1];
    const user = getUser(sessionId);

    if (!user) return res.redirect("/login")
        req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    //const sessionId = req.headers["Authorization"];
    const sessionId = req.cookies?.sessionId;
   // const token = sessionId.split("Bearer ")[1];


    
    const user = getUser(sessionId);

    
    req.user = user;
    next();
}
module.exports = {
    sessionVerification,
    checkAuth
}