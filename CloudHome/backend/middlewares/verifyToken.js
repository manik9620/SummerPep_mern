const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
//   console.log(authorization, req.headers);
  if (!authorization) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized",
      data: {},
    });
    return;
  }

  const token = authorization?.split(" ")?.[1];
//   console.log("token----->", token);
  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "Token not Found",
      data: {},
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).json({
        status: "fail",
        message: "Unauthorized",
        data: {},
      });
    } else {
      req.user = { email: decoded.data.email, _id: decoded.data._id };
      console.log(req.user);
      next();
    }
  });
};

module.exports = verifyToken;
