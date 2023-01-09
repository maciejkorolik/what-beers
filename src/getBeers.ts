import { parse } from "node-html-parser";
import { Beer } from "./types";

async function getBeers(url: string): Promise<Beer[]> {
  const response = await fetch(url);
  const html = await response.text();
  const parsedHTML = parse(html);

  // Query divs with beers and remove last element as it's not a real beer :(
  const wrappers = Array.from(
    parsedHTML.querySelectorAll(".panel.panel-default")
  ).slice(0, -1);

  const beers = wrappers.map((el) => {
    const nameElement = el.querySelector("h4.cml_shadow > span");
    const backgroundElement = el.querySelector(".panel-body.cml_semi");
    const beerType = el.querySelector("span.cml_shadow > b").textContent.trim();
    const breweryName = nameElement
      .querySelector("b.brewery")
      .text.replace(/\n|\r|\t/g, "")
      .trim();
    const beerImage =
      backgroundElement.attributes.style
        ?.replace("background-image:url(", "")
        .replace(")", " ")
        .split(" ")[0] || null;
    const beerPrice = el
      .querySelector(".panel-footer > .row > .col-xs-7")
      .textContent.trim();
    const brs = nameElement.querySelectorAll("br");
    const beerName = brs[0].nextSibling.text.replace(/\n|\r|\t/g, "").trim();
    const beerData = brs[1].nextSibling.text.replace(/\n|\r|\t/g, "").trim();
    return {
      brewery: breweryName,
      name: beerName,
      data: beerData,
      type: beerType,
      image: beerImage,
      price: beerPrice,
    };
  });
  const filteredBeers = beers.filter((beer) => beer.name !== "N/A");
  return filteredBeers;
}

export default getBeers;
