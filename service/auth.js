const jwt = require("jsonwebtoken");
const secret = "Ramanand@@@##777";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);
};

function getUser(token) {
    try {
        if(!token) return null;
        return jwt.verify(token, secret);
    } catch (err) {
        console.log('Invalid token');
        return null;
    }
};

function logout(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
}


module.exports = {
    setUser,
    getUser,
    logout,
}
