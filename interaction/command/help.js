const { idAutor, categories } = require("../../config");
const { getFields } = require("../../useful");
const prefix = process.env.PREFIX;
require("moment-duration-format");
const moment = require("moment");

module.exports = async (client, discord, interaction) => {
  const creator = client.users.cache.get(idAutor);
  const message = interaction.message;

  let help = new discord.MessageEmbed().setColor("PURPLE").setFooter({
    text: ` ${creator.tag}`,
    iconURL: creator.avatarURL(),
  });

  const btn1 = new discord.MessageButton()
    .setCustomId("help_atras")
    .setLabel("Atrás")
    .setStyle("SUCCESS");
  const btn2 = new discord.MessageButton()
    .setCustomId("help_info")
    .setLabel("Info")
    .setStyle("SUCCESS");
  const btn3 = new discord.MessageButton()
    .setCustomId("help_del")
    .setLabel("Borrar")
    .setStyle("DANGER");

  const row1 = new discord.MessageActionRow().addComponents(btn2, btn3);
  const row2 = new discord.MessageActionRow().addComponents(btn1, btn3);

  if (interaction.customId === "help_menu") {
    let category = interaction.values[0].toLowerCase();
    switch (category) {
      case category:
        help
          .setTitle(`Categoria: ${interaction.values[0]}`)
          .addFields(getFields(category));
        interaction.deferUpdate();
        message.edit({
          embeds: [help],
          components: [row2],
        });
        break;
    }
  }
  if (interaction.customId === "help_info") {
    let info = new discord.MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`**${client.user.username}**`)
      .setDescription(`Bot creado para SVG`)
      .setThumbnail(client.user.avatarURL())
      .addFields(
        {
          name: `Creador`,
          value: `${creator.tag}`,
        },
        {
          name: `Ram`,
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )} MB`,
        },
        {
          name: `Host`,
          value: `Aveces`,
        },
        {
          name: `Lenguaje`,
          value: `JavaScript`,
        }
      );
    interaction.deferUpdate();
    return message.edit({
      embeds: [info],
      components: [row2],
    });
  }
  if (interaction.customId === "help_atras") {
    let options = [];
    categories.forEach((category) => {
      options.push({
        label: `${category}`,
        value: `${category}`,
      });
    });
    const menu = new discord.MessageSelectMenu()
      .setCustomId("help_menu")
      .setPlaceholder("Selecciona una categoria")
      .addOptions(options);
    const fila = new discord.MessageActionRow().addComponents(menu);

    interaction.deferUpdate();
    return message.edit({
      embeds: [],
      components: [fila, row1],
    });
  }
  if (interaction.customId === "help_del") {
    interaction.deferUpdate();
    return await message.delete();
  }
};
