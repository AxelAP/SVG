const { getPhrase } = require("../../useful");

module.exports = {
  name: "shulky",
  aliases: ["hulky"],
  description: "Devuelve una imagen Out of Context",
  async execute(client, message, args, discord, cmd) {
    let phrase = getPhrase(client, message, discord, cmd);
    message.channel.send({ embeds: [phrase[0]], files: [phrase[1]] });
  },
};
