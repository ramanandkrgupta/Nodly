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

module.exports = {
    setUser,
    getUser,
};
