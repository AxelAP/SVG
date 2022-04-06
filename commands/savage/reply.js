const repSchema = require("../../models/repSchema");
let { autism } = require("../../config");

module.exports = {
  name: "reply",
  aliases: [`respuesta`],
  description: "Añade una nueva respuesta para el bot",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;
    if (!args[0]) return message.channel.send(`Debes agregar un mensaje`);
    let reply = args.join(" ");

    try {
      let repData = await repSchema.findOne({
        botID: client.user.id,
      });
      if (!repData) {
        let rep = await repSchema.create({
          botID: client.user.id,
          reply: reply,
          logs: [
            {
              botID: client.user.id,
            },
          ],
        });
        rep.save();
      } else {
        let replies = repData.reply;

        for (var i = 0; i < replies.length; i++) {
          if (replies[i].toLowerCase() === reply.toLowerCase())
            return message.channel.send("Esta respuesta ya fue añadida");
        }

        replies.push(reply);
        await repSchema.updateOne(
          {
            botID: client.user.id,
          },
          {
            reply: replies,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }

    message.channel.send(`Se añadio una nueva respuesta`);
  },
};
