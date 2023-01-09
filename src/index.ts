import { Router } from "itty-router";
import handleSlashCommand from "./handleSlashCommand";
const router = Router();

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
}

router.post("/send-slack-message", async (request) => {
  if (request.query.token === MESSAGE_TOKEN) {
    const message = await handleSlashCommand(request);
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
