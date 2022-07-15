import getBeers from "./getBeers.js";

async function init() {
  const beers = await getBeers("https://ontap.pl/?multitap_id=298");
  await fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "post",
      body: JSON.stringify({ text: "test 🍺" }),
      headers: { "Content-Type": "application/json" },
    }
  );
}

init();
