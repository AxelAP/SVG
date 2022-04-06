const { MessageEmbed } = require("discord.js");
const { idAutor } = require("../../config");

module.exports = {
  name: "report",
  aliases: [`reportar`],
  description: "Envia un reporte al dm del creador",
  async execute(client, message, args, discord) {
    if (!args[0]) return message.channel.send("Agrega un mensaje para enviar");
    let msg = args.join(" ");

    let author = client.users.cache.get(idAutor);
    message.delete({ timeout: 10, reason: "Reporte" });

    const report = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle("**Reporte**")
      .setDescription(msg)
      .setFooter({
        text: `Reporte enviado por ${message.author.username}`,
        iconURL: message.author.avatarURL(),
      });

    author.send({ embeds: [report] });
    message.channel.send(`Reporte enviado por: **${message.author.tag}**`);
  },
};
