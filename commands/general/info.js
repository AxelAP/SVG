const { MessageEmbed } = require("discord.js");
const { idAutor } = require("../../config");

const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "info",
  aliases: [`informacion`, `botinfo`],
  description: "Muestra información sobre el bot",
  async execute(client, message, args, discord) {
    let creator = client.users.cache.get(idAutor);
    if (!creator) creator = "Xennxo#1625";

    const activeTime = moment
      .duration(client.uptime)
      .format(" D [dias], H [hrs], m [mins], s [secs]");

    let info = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`**${client.user.username}**`)
      .setDescription(`Bot creado para SVG`)
      .setThumbnail(client.user.avatarURL())
      .addFields(
        {
          name: `Servers`,
          value: `${client.guilds.cache.size}`,
          inline: true,
        },
        {
          name: `Usuarios`,
          value: `${client.users.cache.size}`,
          inline: true,
        },
        {
          name: `Tiempo de actividad`,
          value: `${activeTime}`,
        },
        {
          name: `Ram`,
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )} MB`,
        },
        {
          name: `Lenguaje`,
          value: `JavaScript`,
          inline: true,
        }
      )
      .setFooter({
        text: `Creador: ${creator.tag}`,
        iconURL: creator.avatarURL(),
      });
    message.channel.send({ embeds: [info] });
  },
};
