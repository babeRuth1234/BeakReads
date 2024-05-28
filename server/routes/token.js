  const CryptoJs = require('crypto-js')
  const jwt = require('jsonwebtoken');
  function generateAccessToken(user) {
    return jwt.sign(
      { userId: user._id, email: user.Email, name: user.Name },
      'benny',
      { expiresIn: '1h' }
    );
  }

  module.exports.generateAccessToken = generateAccessToken;