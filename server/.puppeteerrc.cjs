const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
if (process.env.NODE_ENV === "production") {
  module.exports = {
    // Changes the cache location for Puppeteer.
    cacheDirectory: join(__dirname, ".cache", "puppeteer"),
  };
}
