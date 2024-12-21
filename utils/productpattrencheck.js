const isProductUrl = (url) => {
  const productPatterns = [/\/product\//, /\/item\//, /\/p\//];
  return productPatterns.some((pattern) => pattern.test(url));
};

module.exports = isProductUrl;
