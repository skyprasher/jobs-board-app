const jwt = require("jsonwebtoken");
const SECRET = "your_jwt_secret"; // Ideally from env

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
