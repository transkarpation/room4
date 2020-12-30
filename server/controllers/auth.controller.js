const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt.config');

module.exports = {
  sendUser(req, res) {
    const token = jwt.sign({ id: req.user.id }, jwtSecret);
    const { email, id } = req.user;

    res.send({ token, user: { email, id } });
  },
};
