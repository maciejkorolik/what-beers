const getBeers = require("./getBeers");

async function init() {
  const beers = await getBeers("https://ontap.pl/?multitap_id=298");
  console.log(beers);
}

init();
