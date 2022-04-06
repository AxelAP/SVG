const { MessageAttachment } = require("discord.js");
const { phDir } = require("../../config");
const fs = require("fs");

module.exports = {
  name: "savage",
  aliases: ["svg", "avage", "vg"],
  description: "Devuelve una frase Out of Context",
  async execute(client, message, args, discord, cmd) {
    const phrases = fs.readdirSync(`${phDir}/${cmd}/`);

    let n = Math.floor(Math.random() * phrases.length);
    let img = fs.readFileSync(`${phDir}/${cmd}/${phrases[n]}`);

    const phrase = new MessageAttachment(img, phrases[n]);
    message.channel.send({ files: [phrase] });
  },
};
