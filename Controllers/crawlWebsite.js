const fs = require("fs");
const puppeteer = require("puppeteer"); //dynamic page fetching and web automation
const Bottleneck = require("bottleneck"); //Controls the frequency of function calls and avoid overwhelming servers
const Ecommerce = require("../Models/commerce");
const isProductUrl = require("../utils/productpattrencheck");
const catchAsyncError = require("../utils/catchAsyncerror");

// Rate limiter to avoid overwhelming servers
const limiter = new Bottleneck({ minTime: 200 }); // 200ms between requests, 5 request in one mint

// Function to fetch dynamic pages using Puppeteer
const fetchDynamicPage = catchAsyncError(async (pageUrl) => {
  return await limiter.schedule(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto(pageUrl, { waitUntil: "networkidle2" });
      const content = await page.content();
      await browser.close();
      return content;
    } catch (err) {
      console.error(`Error fetching dynamic page ${pageUrl}:`, err.message);
      await browser.close();
      return null;
    }
  });
});

const crawlDomain = async (domain, maxDepth = 3) => {
  const visited = new Set();
  const toVisit = [domain];
  const productUrls = {};
  const browser = await puppeteer.launch();

  for (let depth = 0; depth < maxDepth; depth++) {
    const nextLevel = [];

    const tasks = toVisit.map(async (currentUrl) => {
      if (visited.has(currentUrl)) return;

      console.log(`Crawling: ${currentUrl}`);
      visited.add(currentUrl);

      // Fetch the page content
      const html = await fetchDynamicPage(currentUrl);
      if (!html) return;

      //extracting all the links using puppeteer

      const page = await browser.newPage();
      try {
        await page.setContent(html);
        const links = await page.evaluate(() =>
          Array.from(document.querySelectorAll("a[href]"), (link) => link.href)
        );
        for (const link of links) {
          if (isProductUrl(link)) {
            //checking availble domain and url
            if (!productUrls[domain]) {
              productUrls[domain] = [];
            }
            if (!productUrls[domain].includes(link)) {
              productUrls[domain].push(link);
            }
            const existingEntry = await Ecommerce.findOne({ domain });
            console.log(existingEntry);
            if (existingEntry) {
              if (!existingEntry.url.includes(link)) {
                existingEntry.url.push(`${domain}${link}`);
                await existingEntry.save();
              }
            } else {
              // Create a new entry with the domain and URL array
              await Ecommerce.create({ domain, url: [link] });
            }
          } else if (link.startsWith(domain) && !visited.has(link)) {
            nextLevel.push(link);
          }
        }
      } catch (err) {
        console.error(`Error processing links for ${currentUrl}:`, err.message);
      } finally {
        await page.close();
      }
    });

    // Wait for all tasks in the current depth to complete
    await Promise.all(tasks);

    toVisit.length = 0;
    toVisit.push(...nextLevel);
  }
  // After crawling is done, write the results to a JSON file
  fs.writeFileSync("product_urls.json", JSON.stringify(productUrls, null, 2));
  console.log("Product URLs saved to product_urls.json");

  await browser.close();
};

module.exports = crawlDomain;
