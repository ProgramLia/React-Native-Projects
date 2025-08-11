// IMPORTS...
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

function createToken(payload, expire = "1d") {
     return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn:expire})
};

function verifyToken(token) {
     return jwt.verify(token, JWT_SECRET_KEY);
};

// EXPORTS...
module.exports = {createToken, verifyToken}