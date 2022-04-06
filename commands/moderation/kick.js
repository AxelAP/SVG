const { validMention } = require("../../useful");

module.exports = {
  name: "kick",
  aliases: [`expulsar`],
  description: "Expulsa a un usuario del server",
  async execute(client, message, args, discord) {
    if (!message.member.permissions.has(["ADMINISTRATOR", "KICK_MEMBERS"]))
      return message.channel.send("No tienes los permisos necesarios");

    if (!message.guild.me.permissions.has(["ADMINISTRATOR", "KICK_MEMBERS"]))
      return message.channel.send("No tengo los permisos necesarios");

    if (!args[0] || validMention(message, args[0]) === false)
      return message.channel.send("Debes mencionar a alguien");

    let mention = message.mentions.users.first();
    let member = message.guild.members.cache.find((m) => m.id === mention.id);

    let reason = args.slice(1).join(" ");
    if (!reason) reason = `Sin razón`;

    if (message.author === mention)
      return message.channel.send("No puedes expulsarte a ti mismo");

    if (
      member.roles.highest.comparePositionTo(message.member.roles.highest) > 0
    )
      return message.channel.send("No puedes expulsar a ese miembro");

    if (
      member.roles.highest.comparePositionTo(message.guild.me.roles.highest) > 0
    )
      return message.channel.send("No puedo expulsar a ese miembro");

    let msg = `**${mention.username}**, fue expulsado del servidor, por ${message.author.tag}\n**Razón:** ${reason}`;

    member
      .kick(reason)
      .catch((err) => {
        msg = "No puedo expulsar a ese miembro";
        return;
      })
      .then(() => {
        message.channel.send(msg);
      });
  },
};
