module.exports = {
  name: "ragequit",
  aliases: [`rq`, `salir`, `alir`],
  description: "Para salir del servidor mas rápido",
  async execute(client, message, args, discord) {
    if (!message.guild.me.permissions.has(["ADMINISTRATOR", "KICK_MEMBERS"]))
      return message.channel.send("No tengo los permisos necesarios");

    let idUser = message.author.id;
    let reason = "rq";

    let autista = await message.guild.members
      .fetch(idUser)
      .catch(console.error);
    let msg = `**${autista.displayName}** se autosuicido`;

    autista
      .kick(reason)
      .catch((err) => {
        msg = `No puedo expulsarte`;
        return;
      })
      .then(() => {
        message.channel.send(msg);
      });
  },
};
