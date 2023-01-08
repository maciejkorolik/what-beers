import { Router } from "itty-router";
import getHolidays from "./getHolidays";
import prepareSlackMessage from "./prepareSlackMessage";

const router = Router();

const allowedChannels = JSON.parse(ALLOWED_CHANNELS);

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

// async function sendSlackMessage() {
//   const beers = await getBeers("https://4hops.ontap.pl");
//   const message = prepareSlackMessage("4hops", beers);
//   await fetch(SLACK_HOOK_URL, {
//     method: "post",
//     body: JSON.stringify(message),
//     headers: { "Content-Type": "application/json" },
//   });
// }

router.get("", async () => {
  const beers = await getBeers("https://4hops.ontap.pl");
  return jsonResponse(beers);
});

router.post("/send-slack-message", async ({ query }) => {
  if (query.token === MESSAGE_TOKEN) {
    const body = await request.text();
    const params = qs.parse(body);
    const beers = await getBeers("https://4hops.ontap.pl");
    const channelId = params?.channel_id || null;
    const shouldDisplayInChannel = allowedChannels.includes(channelId);
    const message = prepareSlackMessage("4hops", beers, shouldDisplayInChannel);
    return jsonResponse(message);
  } else {
    return new Response("Not authorized", { status: 401 });
  }
});

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));

// attach the router "handle" to the event handler
addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
