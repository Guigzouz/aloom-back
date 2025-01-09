const jwt = require("jsonwebtoken");

module.exports = {
  verifyAccessToken: (req, res, next) => {
    try {
      if (!req.headers["authorization"]) {
        //no auth token case
        return next(res.status(401).send("Unauthorized"));
      }

      const authHeader = req.headers["authorization"];
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          // wrong auth token case
          return next(res.status(401).send("Unauthorized"));
        }
        req.payload = payload;
        next();
      });
    } catch {}
  },
};
