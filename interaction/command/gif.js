const gifSchema = require("../../models/gifSchema");

module.exports = async (client, discord, interaction) => {
  let embed = new discord.MessageEmbed().setColor("PURPLE");
  const message = interaction.message;

  if (interaction.customId === "gif_prev") {
    try {
      let gifData = await gifSchema.findOne({
        messageID: message.id,
      });

      if (gifData) {
        if (gifData.anterior < 0) return interaction.deferUpdate();
        embed
          .setTitle(`Resultados de: ${gifData.query}`)
          .setDescription(gifData.descriptions[gifData.anterior])
          .setImage(gifData.gifs[gifData.anterior])
          .setFooter({
            text: `Página: ${gifData.anterior + 1}/${gifData.gifs.length} `,
            iconURL: client.user.avatarURL(),
          });
        interaction.deferUpdate();
        message.edit({ embeds: [embed] });

        await gifSchema.updateOne(
          {
            messageID: message.id,
          },
          {
            actual: gifData.anterior,
            siguiente: gifData.anterior + 1,
            anterior: gifData.anterior - 1,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (interaction.customId === "gif_next") {
    try {
      let gifData = await gifSchema.findOne({
        messageID: message.id,
      });

      if (gifData) {
        if (gifData.siguiente > 99) return interaction.deferUpdate();
        embed
          .setTitle(`Resultados de: ${gifData.query}`)
          .setDescription(gifData.descriptions[gifData.siguiente])
          .setImage(gifData.gifs[gifData.siguiente])
          .setFooter({
            text: `Página: ${gifData.siguiente + 1}/${gifData.gifs.length} `,
            iconURL: client.user.avatarURL(),
          });
        interaction.deferUpdate();
        message.edit({ embeds: [embed] });

        await gifSchema.updateOne(
          {
            messageID: message.id,
          },
          {
            actual: gifData.siguiente,
            siguiente: gifData.siguiente + 1,
            anterior: gifData.siguiente - 1,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (interaction.customId === "gif_del") {
    interaction.deferUpdate();
    return message.delete();
  }
};
