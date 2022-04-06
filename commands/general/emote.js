const { validEmote } = require("../../useful");

module.exports = {
  name: "emote",
  aliases: [`e`, `emoji`],
  description: "Devuelve un emote",
  async execute(client, message, args, discord) {
    if (!args[0] || validEmote(args[0]) === false) {
      return message.channel.send(`Debes agregar un emote`);
    }

    let emoji;
    let emoteRegex = /<:.+:(\d+)>/gm;
    let animatedEmoteRegex = /<a:.+:(\d+)>/gm;

    if ((emoji = emoteRegex.exec(args[0]))) {
      let url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1";
      message.channel.send(url);
    } else if ((emoji = animatedEmoteRegex.exec(args[0]))) {
      let url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1";
      message.channel.send(url);
    } else {
      message.channel.send("No encontre ese emote");
    }
  },
};
