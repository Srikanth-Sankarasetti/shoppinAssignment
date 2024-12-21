const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  crawlrequest,
} = require("../Controllers/productController");

const { signup, login } = require("../Controllers/authcontrollers");

const jwtveryficationMiddleware = require("../Controllers/jwtVerification");

router.route("/products").get(jwtveryficationMiddleware, getAllProduct);
router.route("/crawl").post(jwtveryficationMiddleware, crawlrequest);
router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
