const jwt = require("jsonwebtoken");

//verfiy the user to get the al the request
const jwtveryficationMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let jwtToken;
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401).send({ status: "Fail", message: "Invalid JWT Token" });
  } else {
    jwt.verify(jwtToken, "srikanth", async (err, payload) => {
      if (err) {
        res.status(401).send({ message: err.message });
      } else {
        req.id = payload.id;
        next();
      }
    });
  }
};

module.exports = jwtveryficationMiddleware;
