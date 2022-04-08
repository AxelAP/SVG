const { categories } = require("../../config");

module.exports = {
  name: "help",
  aliases: [`menu`, `ayuda`],
  description: "Menu de ayuda del bot",
  async execute(client, message, args, discord) {
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

    const btn2 = new discord.MessageButton()
      .setCustomId("help_info")
      .setLabel("Info")
      .setStyle("SUCCESS");
    const btn3 = new discord.MessageButton()
      .setCustomId("help_del")
      .setLabel("Borrar")
      .setStyle("DANGER");

    const fila = new discord.MessageActionRow().addComponents(menu);
    const row = new discord.MessageActionRow().addComponents(btn2, btn3);

    message.channel.send({
      content: `Menú del bot: **${client.user.username}**`,
      components: [fila, row],
    });
  },
};
