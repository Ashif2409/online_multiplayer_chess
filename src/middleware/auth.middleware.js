const jwt = require('jsonwebtoken');
const { User } = require('../db/index'); 

const decodeToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'xyz'); 
        const user = await User.findOne({ _id: decodedToken.id }); 

        if (user) {
            req.user = user; 
            next(); 
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error); 
        return res.status(401).json({ message: 'Invalid token' }); 
    }
};

module.exports = {decodeToken};
