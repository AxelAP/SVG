const logSchema = require("../../models/logSchema");

module.exports = {
  name: "log",
  aliases: [`log`],
  description: "Activa/Desactiva los logs para un server",
  async execute(client, message, args, discord) {
    if (!message.member.permissions.has(["ADMINISTRATOR"])) {
      return message.channel.send("No tienes los permisos necesarios");
    }

    try {
      let logData = await logSchema.findOne({
        serverID: message.guild.id,
      });
      if (!logData) {
        let log = await logSchema.create({
          serverID: message.guild.id,
          channelID: message.channel.id,
          logs: [
            {
              serverID: message.guild.id,
            },
          ],
        });
        log.save();
        message.channel.send(
          `Se activaron los logs para **${message.guild.name}**`
        );
      } else if (message.channel.id !== logData.channelID) {
        await logSchema.updateOne(
          {
            serverID: message.guild.id,
          },
          {
            channelID: message.channel.id,
          }
        );
        message.channel.send(
          `Se actualizarón los logs para **${message.guild.name}**`
        );
      } else {
        await logSchema.deleteOne({
          serverID: message.guild.id,
        });
        message.channel.send(
          `Se desactivaron los logs para **${message.guild.name}**`
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
