const Ecommerce = require("../Models/commerce");
const crawlDomain = require("../Controllers/crawlWebsite");
const catchAsyncError = require("../utils/catchAsyncerror");

exports.crawlrequest = catchAsyncError(async (req, res) => {
  const { domains } = req.body;
  console.log(domains);

  for (const domain of domains) {
    crawlDomain(domain);
  }
  res.status(200).send({ message: "Crawling completed." });
});

exports.getAllProduct = catchAsyncError(async (req, res) => {
  try {
    const productList = await Ecommerce.find();
    res
      .status(200)
      .send({ status: "Success", message: "Data successful", productList });
  } catch (err) {
    res.status(500).send({ Status: "Fail", message: err.message });
  }
});
