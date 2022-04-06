const { autism, roles, idGuild } = require("../../config");
const { randReply } = require("../../useful");

module.exports = {
  name: "rol",
  aliases: [`sida`, `ida`],
  description: "Muestra el ping del bot",
  async execute(client, message, args, discord) {
    if (message.guild.id !== idGuild) return;
    let savage = message.guild;

    if (!autism.some((autism) => message.author.id === autism))
      return randReply(client, message);

    if (!message.guild.me.permissions.has(["ADMINISTRATOR", "MANAGE_ROLES"]))
      return message.channel.send("No tengo los permisos necesarios");

    let staff = savage.roles.cache.find((r) => r.id === "827220825597149276");
    if (!staff) return message.channel.send(`@Los Tilines`);
    if (!message.member.roles.cache.has(staff)) message.member.roles.add(staff);

    for (let i = 0; i < autism.length; i++) {
      if (autism[i] === message.author.id) {
        let autismo = savage.roles.cache.find((r) => r.id === roles[i]);
        if (autismo) {
          if (autismo.comparePositionTo(message.guild.me.roles.highest) < 0) {
            if (!message.member.roles.cache.has(autismo))
              message.member.roles.add(autismo);
          }
        }
      }
    }

    message.react("🏳️‍🌈");
  },
};
