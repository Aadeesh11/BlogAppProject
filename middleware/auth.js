const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    //remove the nexr line to verify with headers from client side.
    req.headers.authorization = `Bearer ${process.env.JWT_SECRET}`;
    const token = req.headers.authorization?.split(" ")[1] || ""
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.verifiedUser = verified.user;
        console.log("------------------------Ver success", verified);
        next()
    }catch(err) {
        console.log("------------------------Ver failed");
        next()
    }
}

module.exports = {authenticate};