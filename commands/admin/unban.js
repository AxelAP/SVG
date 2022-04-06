const { autism, idGuild } = require("../../config");

module.exports = {
  name: "unban",
  aliases: [],
  description: "Auto unban para el servidor",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;
    let user = message.author.id;

    let savage = client.guilds.cache.get(idGuild);
    if (!savage) return message.channel.send("No estoy en el server");

    if (!savage.me.permissions.has(["ADMINISTRATOR", "BAN_MEMBERS"])) {
      return message.channel.send("No tengo los permisos necesarios");
    }

    let member = savage.bans.cache.forEach((b) => b.user.id === user);
    if (!member)
      return message.channel.send("No estas entre los usuarios baneados");

    savage.members.unban(member.user);
    message.channel.send(`Fuiste desbaneado de **${savage.name}**`);
  },
};
