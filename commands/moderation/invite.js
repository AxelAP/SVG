const { idGuild, autism } = require("../../config");

module.exports = {
  name: "invite",
  aliases: [`invitacion`, `inv`],
  description: "Crea y envia una invitación del servidor",
  async execute(client, message, args, discord) {
    if (
      !message.member.permissions.has([
        "ADMINISTRATOR",
        "CREATE_INSTANT_INVITE",
      ])
    )
      return message.channel.send("No tienes los permisos necesarios");

    if (
      !message.guild.me.permissions.has([
        "ADMINISTRATOR",
        "CREATE_INSTANT_INVITE",
      ])
    )
      return message.channel.send("No tengo los permisos necesarios");

    let channel = message.channel;

    if (args[0] == "savage" || args[0] == "svg") {
      let savage = client.guilds.cache.get(idGuild);
      if (!savage) return message.channel.send("No estoy en el server");

      if (!autism.some((autism) => message.author.id === autism)) return;
      channel = savage.channels.cache.find(
        (ch) => ch.id === "633381498447200297"
      );
    }

    channel
      .createInvite({
        maxAge: 0,
      })
      .then((invite) => {
        message.channel.send(invite.url);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
