const { autism } = require("../../config");

module.exports = {
  name: "spam",
  aliases: [`pam`],
  description: "Muestra el ping del bot",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;

    let spam = "@here";
    let ping = 5;

    let content = args.join(" ").split(" | ");

    if (content[0]) spam = content[0];
    if (content[1] && !isNaN(content[1])) ping = content[1];

    for (let i = 0; i < ping; i++) {
      message.channel.send(`${spam}`);
    }
  },
};
