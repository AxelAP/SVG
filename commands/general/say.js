module.exports = {
  name: "say",
  aliases: [`ay`, `decir`],
  description: "Repite un comentario",
  async execute(client, message, args, discord) {
    let text = args.join(" ");
    text = text.replace("@everyone", "@|everyone");
    text = text.replace("@here", "@|here");
    if (!text) return message.channel.send(`Debes agregar un mensaje`);
    message.channel.send(text);
  },
};
