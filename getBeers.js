const puppeteer = require("puppeteer");

async function getBeers(url) {
  const browser = await puppeteer.launch({
    args: ["--lang=pl-PL,pl"],
  });
  const page = await browser.newPage();
  await page.goto(url);

  const beers = await page.evaluate(() => {
    // Query divs with beers and remove last element as it's not a real beer :(
    const wrappers = Array.from(
      document.querySelectorAll(".panel.panel-default")
    ).slice(0, -1);

    const descriptions = wrappers.map((el) => {
      const nameElement = el.querySelector("h4.cml_shadow > span");
      const type = el.querySelector("span.cml_shadow > b").textContent;
      const nameParts = nameElement.innerText
        .split("\n")
        .map((el) => el.trim());
      return {
        brewery: nameParts[0],
        name: nameParts[1],
        data: nameParts[2],
        type,
      };
    });

    return descriptions;
  });
  await browser.close();
  return beers;
}

module.exports = getBeers;
