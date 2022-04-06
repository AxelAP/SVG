const wdSchema = require("../../models/wdSchema");
let { wordDel } = require("../../useful");
let { autism } = require("../../config");

module.exports = {
  name: "word",
  aliases: [`palabra`, `addword`],
  description: "Añade una nueva palabra para el servidor",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;
    let content = args.join(" ").split(" | ");

    if (!content[0])
      return message.channel.send("Debes añadir una frase o palabra");
    if (!content[1] && !message.attachments.first())
      return message.channel.send(
        `Debes añadir un mensaje o imagen para responder\n(Separa la respuesta con \`" | "\`)`
      );

    let word, text, image;
    [word, text] = content;

    let attachment = message.attachments.first();
    image = attachment ? attachment.url : null;

    if (!text) text = "";
    if (!image) image = "";

    await wordDel(message);

    try {
      let wdData = await wdSchema.findOne({
        serverID: message.guild.id,
        word: word.toLowerCase(),
      });
      if (!wdData) {
        let wd = await wdSchema.create({
          serverID: message.guild.id,
          word: word.toLowerCase(),
          text: text,
          image: image,
          logs: [
            {
              serverID: message.guild.id,
            },
          ],
        });
        wd.save();
        message.channel.send(
          `Se añadio una núeva palabra para **${message.guild.name}**`
        );
      } else {
        return message.channel.send("Esa frase ya esta en uso");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
