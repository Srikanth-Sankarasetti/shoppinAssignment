const Ecommerce = require("../Models/commerce");
const crawlDomain = require("../Controllers/crawlWebsite");

exports.crawlrequest = async (req, res) => {
  const { domains } = req.body;
  console.log(domains);
  let productLinks;
  try {
    for (const domain of domains) {
      productLinks = await crawlDomain(domain);
    }
    res.status(200).json({ message: "Crawling completed.", productLinks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during crawling." });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const productList = await Ecommerce.find();
    res
      .status(200)
      .send({ status: "Success", message: "Data successful", productList });
  } catch (err) {
    res.status(500).send({ Status: "Fail", message: err.message });
  }
};
