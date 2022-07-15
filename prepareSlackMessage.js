function prepareSlackMessage(pubName, beers) {
  return {
    username: "Beer Bot",
    icon_emoji: "beer",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Beers available today at *${pubName}*:`,
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
            text: `*${beer.name}*\n - ${beer.brewery}\n - ${beer.type}\n - ${beer.data}`,
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
    ],
  };
}

export default prepareSlackMessage;
