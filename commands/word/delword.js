const delSchema = require("../../models/delSchema");
const wdSchema = require("../../models/wdSchema");
let { autism } = require("../../config");

module.exports = {
  name: "delword",
  aliases: [`delete-word`],
  description: "Elimina una palabra del servidor",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;
    if (!args[0] || isNaN(args[0]) || args[0] < 1)
      return message.channel.send(
        "Debes añadir la posición de la palabra para borrar"
      );

    try {
      let wdData = await wdSchema.find({
        serverID: message.guild.id,
      });
      if (!wdData) {
        return message.channel.send(`Añade una frase o palabra con \`word\``);
      } else {
        if (args[0] > wdData.length)
          return message.channel.send(`No existe esa palabra`);
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let delData = await delSchema.findOne({
        serverID: message.guild.id,
        command: `word`,
      });
      if (!delData) {
        let del = await delSchema.create({
          serverID: message.guild.id,
          command: `word`,
          delete: args[0] - 1,
          logs: [
            {
              serverID: message.guild.id,
            },
          ],
        });
        del.save();
        message.channel.send(
          `Se borro una palabra para **${message.guild.name}**`
        );
      } else {
        let delArray = delData.delete;

        for (var i = 0; i < delArray.length; i++) {
          if (delArray[i] === args[0] - 1)
            return message.channel.send("No existe esa palabra");
        }

        delArray.push(args[0] - 1);
        delArray = delArray.sort(function (a, b) {
          return a - b;
        });

        await delSchema.updateOne(
          {
            serverID: message.guild.id,
            command: `word`,
          },
          {
            delete: delArray,
          }
        );
        message.channel.send(
          `Se borro una palabra para **${message.guild.name}**`
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
