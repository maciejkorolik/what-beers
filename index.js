import getBeers from "./getBeers.js";
import fetch from "node-fetch";
import "dotenv/config";
import prepareSlackMessage from "./prepareSlackMessage.js";

async function init() {
  const beers = await getBeers("https://4hops.ontap.pl");
  const message = prepareSlackMessage("4hops", beers);
  await fetch(process.env.SLACK_HOOK_URL, {
    method: "post",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  });
}

init();
