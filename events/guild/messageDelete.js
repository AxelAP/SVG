const logSchema = require("../../models/logSchema");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, discord, message) => {
  try {
    let logData = await logSchema.findOne({
      serverID: message.guild.id,
    });

    if (logData) {
      let logCh = client.guilds.cache
        .get(logData.serverID)
        .channels.cache.get(logData.channelID);

      if (message.content) {
        let delMsg = new MessageEmbed()
          .setTimestamp()
          .setColor("PURPLE")
          .setDescription(`**Borro un mensaje en** ${message.channel}`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setFooter({
            text: `Autor: ${message.author.id}`,
          })
          .setAuthor({
            name: `${message.author.tag}`,
            iconURL: message.author.avatarURL(),
          })
          .addFields({
            name: `Contenido:`,
            value: `${message.content}`,
          });
        logCh.send({ embeds: [delMsg] });
      }

      if (message.attachments.size > 0) {
        let attachment = message.attachments;
        attachment.forEach((attach) => {
          let delMsg = new MessageEmbed()
            .setTimestamp()
            .setColor("PURPLE")
            .setDescription(`**Eliminó una imagen en** ${message.channel}`)
            .setFooter({
              text: `Autor: ${message.author.id}`,
            })
            .setAuthor({
              name: `${message.author.tag}`,
              iconURL: message.author.avatarURL(),
            })
            .setImage(attach.proxyURL);
          logCh.send({ embeds: [delMsg] });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
