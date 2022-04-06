const { autism } = require("../../config");

module.exports = {
  name: "leave",
  aliases: [`abandonar`],
  description: "Hace que el bot deje un server",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;
    if (!args[0])
      return message.channel.send("Debes agregar el ID de un server");

    let guild = client.guilds.cache.find(
      (s) => s.name.toLowerCase() === args[0].toLowerCase() || s.id === args[0]
    );
    // let guild = client.guilds.cache.find((s) => s.id === args[0]);
    if (!guild) return message.channel.send("No encontré ese servidor");

    await guild.leave();
    message.channel.send(`Salí del servidor: **${guild.name}**`);
  },
};
