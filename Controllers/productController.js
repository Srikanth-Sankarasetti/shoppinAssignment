const Ecommerce = require("../Models/commerce");
const crawlDomain = require("../Controllers/crawlWebsite");
const catchAsyncError = require("../utils/catchAsyncerror");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

exports.crawlrequest = async (req, res) => {
  const { domains } = req.body;
  console.log(domains);
  try {
    for (const domain of domains) {
      console.log("Starting crawl for domain:", domain);
      await crawlDomain(domain);
      console.log("Crawling completed for domain:", domain);
    }
    res.status(200).send({ Status: "Success", message: "Crawling completed." });
  } catch (err) {
    res.status(400).send({ status: "Fail", message: err.message });
  }
};

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

exports.downloadUrls = catchAsyncError(async (req, res, next) => {
  //Fetching the data from MongoDB
  const data = await Ecommerce.find();

  // Creating an Excel file
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("ProductsData");

  // adding columns to Excel
  worksheet.columns = [
    { header: "Domain", key: "Domain", width: 20 },
    { header: "URLS", key: "url", width: 30 },
    { header: "Created At", key: "createdAt", width: 20 },
  ];

  //Ading rows to Excel
  data.forEach((item) => {
    worksheet.addRow({
      Domain: item.domain,
      url: item.url,
      createdAt: item.createdAt.toISOString(),
    });
  });

  const filePath = path.join(__dirname, "MyCollectionData.xlsx");
  const fileName = "MyCollectionData.xlsx";
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  await workbook.xlsx.write(res);
  await workbook.xlsx.writeFile(filePath);
  res.status(200).end();
});
