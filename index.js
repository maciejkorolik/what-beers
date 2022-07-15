import getBeers from "./getBeers.js";

async function init() {
  const beers = await getBeers("https://4hops.ontap.pl");
  console.log(beers);
}

init();
