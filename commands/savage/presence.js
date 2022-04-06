const prSchema = require("../../models/prSchema");
let { autism } = require("../../config");

module.exports = {
  name: "presence",
  aliases: [`presencia`, `state`, `tate`, `estado`],
  description: "Añade un nuevo estado para el bot",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;
    if (!args[0]) return message.channel.send(`Debes agregar un mensaje`);
    let presence = args.join(" ");

    try {
      let prData = await prSchema.findOne({
        botID: client.user.id,
      });
      if (!prData) {
        let pr = await prSchema.create({
          botID: client.user.id,
          presence: presence,
          logs: [
            {
              botID: client.user.id,
            },
          ],
        });
        pr.save();
      } else {
        let presences = prData.presence;

        for (var i = 0; i < presences.length; i++) {
          if (presences[i].toLowerCase() === presence.toLowerCase())
            return message.channel.send("Ese estado ya fue añadido");
        }

        presences.push(presence);
        await prSchema.updateOne(
          {
            botID: client.user.id,
          },
          {
            presence: presences,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }

    message.channel.send(`Se añadio un nuevo estado`);
  },
};
