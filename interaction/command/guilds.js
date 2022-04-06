const { MessageEmbed } = require("discord.js");
const { idAutor } = require("../../config");

module.exports = async (client, discord, interaction) => {
  const creator = client.users.cache.get(idAutor);
  const message = interaction.message;

  if (interaction.customId === "guilds_prev") {
    let text = [];
    let n = 0;
    let i = 0;

    client.guilds.cache.forEach((s) => {
      if (n === 30) {
        n = 0;
        i++;
      }
      if (text[i] === undefined) {
        text[i] = "";
      }
      text[i] += `• ${s.name} ➜ <@!${s.ownerId}>\n`;
      n++;
    });

    let pag = parseInt(message.embeds[0].footer.text.slice(8, 9)) - 1;
    if (pag < 1) return interaction.deferUpdate();

    let list1 = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Servers contados: **${client.guilds.cache.size}**`)
      .setDescription(`${text[pag - 1]}`)
      .setFooter({
        text: `Página: ${pag}/${text.length}`,
        iconURL: client.user.avatarURL(),
      });

    interaction.deferUpdate();
    return message.edit({ embeds: [list1] });
  }
  if (interaction.customId === "guilds_next") {
    let text = [];
    let n = 0;
    let i = 0;

    client.guilds.cache.forEach((s) => {
      if (n === 30) {
        n = 0;
        i++;
      }
      if (text[i] === undefined) {
        text[i] = "";
      }
      text[i] += `• ${s.name} ➜ <@!${s.ownerId}>\n`;
      n++;
    });

    let pag = parseInt(message.embeds[0].footer.text.slice(8, 9));
    if (pag > text.length - 1) return interaction.deferUpdate();

    let list2 = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Servers contados: **${client.guilds.cache.size}**`)
      .setDescription(`${text[pag]}`)
      .setFooter({
        text: `Página: ${pag + 1}/${text.length}`,
        iconURL: client.user.avatarURL(),
      });

    interaction.deferUpdate();
    return message.edit({ embeds: [list2] });
  }
  if (interaction.customId === "guilds_del") {
    return message.delete();
  }
};
