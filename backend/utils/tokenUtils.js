const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, 'g_r_o_u_p', { expiresIn: '1h' }); 
};

module.exports = { generateToken };
