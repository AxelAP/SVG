const { randReply } = require("../../useful");
const { autism } = require("../../config");

module.exports = {
  name: "mafia",
  aliases: [],
  description: "Kick especial",
  async execute(client, message, args, discord) {
    if (!message.member.permissions.has(["ADMINISTRATOR", "KICK_MEMBERS"]))
      return message.channel.send("No tienes los permisos necesarios");

    if (!message.guild.me.permissions.has(["ADMINISTRATOR", "KICK_MEMBERS"]))
      return message.channel.send("No tengo los permisos necesarios");

    if (!autism.some((autism) => message.author.id === autism))
      return randReply(client, message);

    let ausencia = "No esta";
    let reason = "Si";
    let idUser = autism[9];

    let autista = await message.guild.members
      .fetch(idUser)
      .catch(console.error);
    if (!autista) return message.channel.send(ausencia);

    if (
      autista.roles.highest.comparePositionTo(message.guild.me.roles.highest) >
      0
    )
      return message.channel.send(
        `No puedo expulsar a **${autista.displayName}**`
      );

    let msg = `**${autista.displayName}**, salió voluntariamente del servidor`;

    autista
      .kick(reason)
      .catch((err) => {
        msg = `No puedo expulsar a **${autista.displayName}**`;
        return;
      })
      .then(() => {
        message.channel.send(msg);
      });
  },
};
