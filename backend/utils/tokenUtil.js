const jwt = require('jsonwebtoken');

exports.generateInviteToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.verifyInviteToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};
