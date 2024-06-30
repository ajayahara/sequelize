const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const { User } = require('../models');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
