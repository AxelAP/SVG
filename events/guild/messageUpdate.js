const logSchema = require("../../models/logSchema");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, discord, oldMessage, newMessage) => {
  try {
    let logData = await logSchema.findOne({
      serverID: newMessage.guild.id,
    });

    if (logData) {
      if (newMessage.content.startsWith("https://")) return;

      if (newMessage.content) {
        let editedMsg = new MessageEmbed()
          .setTimestamp()
          .setColor("PURPLE")
          .setDescription(`**Edito un mensaje en** ${newMessage.channel}`)
          .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
          .setFooter({
            text: `Autor: ${newMessage.author.id}`,
          })
          .setAuthor({
            name: `${newMessage.author.tag}`,
            iconURL: newMessage.author.avatarURL(),
          })
          .addFields(
            {
              name: `Antes:`,
              value: `${oldMessage.content}`,
            },
            {
              name: `Después:`,
              value: `${newMessage.content}`,
            }
          );
        let logCh = client.guilds.cache
          .get(logData.serverID)
          .channels.cache.get(logData.channelID);
        logCh.send({ embeds: [editedMsg] });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
