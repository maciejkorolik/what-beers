const puppeteer = require("puppeteer");

async function init() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://4hops.ontap.pl/");

  const beers = await page.evaluate(() => {
    // Query divs with beers and remove last element as it's not a real beer :(
    const wrappers = Array.from(
      document.querySelectorAll(".panel.panel-default")
    ).slice(0, -1);

    const descriptions = wrappers.map((el) => {
      const nameElement = el.querySelector("h4.cml_shadow > span");
      return nameElement.innerText.split("\n").map((el) => el.trim());
    });

    const structuredDescriptions = descriptions.map((beer) => {
      return {
        brewery: beer[0],
        type: beer[1],
        data: beer[2],
      };
    });
    return structuredDescriptions;
  });
  console.log(beers);
  await browser.close();
}

init();
