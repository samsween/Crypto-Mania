const jwt = require("jsonwebtoken");

function signJwt(payload) {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
function verifyJwt(token) {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  return decoded;
}

module.exports = { signJwt, verifyJwt };
