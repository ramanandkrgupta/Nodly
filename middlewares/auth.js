const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.sessionId;
    req.user = null;
    if(!tokenCookie)
        return next();
    
    const token = tokenCookie;
    const user = getUser(token);
    

    req.user = user;
    return next();
}

//admin
function restrictTo(roles = []) {
    return function(req, res, next)  {
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized")
        
        return next();
    };
}





// async function sessionVerification(req, res, next) {
//     //const sessionId = req.cookies?.sessionId;
//     const sessionId = req.headers["Authorization"]

//     if(!sessionId) return res.redirect("/login");
//     const token = sessionId.split('Bearer ')[1];
//     const user = getUser(token);

//     if (!user) return res.redirect("/login")
//         req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     const sessionId = req.headers["authorization"];
//     console.log(req.headers)
//    // const sessionId = req.cookies?.sessionId;
//    const token = sessionId.split('Bearer ')[1];


    
//     const user = getUser(token); 

    
//     req.user = user;
//     next();
// }
module.exports = {
    checkForAuthentication,
    restrictTo,
}