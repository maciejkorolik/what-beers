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
    return wrappers.map((el) =>
      // brewery, beer name and data is in the h4.cml_shadow element
      // puppeteer returns textContent with many \t and \n so we need to remove them
      el.querySelector("h4.cml_shadow").textContent.replace(/\n|\r|\t/g, "")
    );
  });
  console.log(beers);
  await browser.close();
}

init();
