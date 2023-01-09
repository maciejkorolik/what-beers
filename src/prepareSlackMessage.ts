import { Beer } from "./types";

function prepareSlackMessage(
  pubName: string,
  beers: Beer[],
  inChannel: boolean = false,
  isRandom: boolean = false
) {
  return {
    username: "Beer Bot",
    icon_emoji: "beer",
    response_type: inChannel ? "in_channel" : "ephemeral",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Today you are going to ${pubName}!* :tada:`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Beers available there today:`,
        },
      },
      {
        type: "divider",
      },
      ...beers.map((beer) => {
        return {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${beer.name}*\n - ${beer.brewery}\n - ${beer.type}\n - ${
              beer.data
            }${beer.price && `\n - ${beer.price}`}`,
          },
          accessory: beer.image
            ? {
                type: "image",
                image_url: beer.image,
                alt_text: beer.name,
              }
            : undefined,
        };
      }),
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":information_source: All data comes from <https://ontap.pl|ontap.pl>",
        },
      },
    ],
  };
}

export default prepareSlackMessage;
