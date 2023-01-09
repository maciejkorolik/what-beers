import { Request } from "itty-router";
import qs from "qs";
import getBeers from "./getBeers";
import prepareSlackMessage from "./prepareSlackMessage";
import { pubs } from "./pubsList";
import { getRandomElement } from "./utils";
const allowedChannels = JSON.parse(ALLOWED_CHANNELS);
const availablePubs = Object.keys(pubs);

const pubNotFoundMessage = {
  username: "Beer Bot",
  icon_emoji: "beer",
  response_type: "ephemeral",
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Sorry, I can't provide you a list of beers in this pub.`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Please select one of these pubs: \n ${Object.values(pubs)
          .map((pub) => `- ${pub.displayName}\n`)
          .join("")}`,
      },
    },
  ],
};

const helpMessage = {
  username: "Beer Bot",
  icon_emoji: "beer",
  response_type: "ephemeral",
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Available commands:*",
      },
    },
    { type: "divider" },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "`/beers <pub name>` - I will send you a list of beers available in the selected pub.\n" +
          `Available pubs are:\n ${Object.values(pubs)
            .map((pub) => `- ${pub.displayName}\n`)
            .join("")}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "`/beers random` - I will select a random pub for you!",
      },
    },
  ],
};

export default async function handleSlashCommand(request: Request) {
  const body = await request.text();
  const params = qs.parse(body);
  const channelId = params?.channel_id || null;
  const shouldDisplayInChannel = allowedChannels.includes(channelId);
  const pubName = params.text.trim().toLowerCase();
  const isHelp = !pubName || pubName === "help";
  const isRandom = pubName === "random";

  if (isHelp) {
    return helpMessage;
  }
  if (!isRandom && !availablePubs.includes(pubName)) {
    return pubNotFoundMessage;
  }

  const selectedPub = isRandom
    ? getRandomElement(Object.values(pubs))
    : pubs[pubName];

  const beers = await getBeers(selectedPub.url);
  const message = prepareSlackMessage(
    selectedPub.displayName,
    beers,
    shouldDisplayInChannel,
    isRandom
  );
  return message;
}
