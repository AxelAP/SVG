const imgSchema = require("../../models/imgSchema");

module.exports = async (client, discord, interaction) => {
  let embed = new discord.MessageEmbed().setColor("PURPLE");
  const message = interaction.message;

  if (interaction.customId === "img_prev") {
    try {
      let imgData = await imgSchema.findOne({
        messageID: message.id,
      });

      if (imgData) {
        if (imgData.anterior < 0) return interaction.deferUpdate();
        embed
          .setTitle(`Resultados de: ${imgData.query}`)
          .setDescription(imgData.descriptions[imgData.anterior])
          .setImage(imgData.images[imgData.anterior])
          .setFooter({
            text: `Página: ${imgData.anterior + 1}/${imgData.images.length} `,
            iconURL: client.user.avatarURL(),
          });
        interaction.deferUpdate();
        message.edit({ embeds: [embed] });

        await imgSchema.updateOne(
          {
            messageID: message.id,
          },
          {
            actual: imgData.anterior,
            siguiente: imgData.anterior + 1,
            anterior: imgData.anterior - 1,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (interaction.customId === "img_next") {
    try {
      let imgData = await imgSchema.findOne({
        messageID: message.id,
      });

      if (imgData) {
        if (imgData.siguiente > 99) return interaction.deferUpdate();
        embed
          .setTitle(`Resultados de: ${imgData.query}`)
          .setDescription(imgData.descriptions[imgData.siguiente])
          .setImage(imgData.images[imgData.siguiente])
          .setFooter({
            text: `Página: ${imgData.siguiente + 1}/${imgData.images.length} `,
            iconURL: client.user.avatarURL(),
          });
        interaction.deferUpdate();
        message.edit({ embeds: [embed] });

        await imgSchema.updateOne(
          {
            messageID: message.id,
          },
          {
            actual: imgData.siguiente,
            siguiente: imgData.siguiente + 1,
            anterior: imgData.siguiente - 1,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (interaction.customId === "img_del") {
    interaction.deferUpdate();
    return message.delete();
  }
};
