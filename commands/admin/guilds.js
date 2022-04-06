const { MessageEmbed, MessageButton } = require("discord.js");
let { autism } = require("../../config");

module.exports = {
  name: "guilds",
  aliases: [`servers`, `ervers`],
  description: "Muestra todos los servidores en los que esta el bot",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;

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

    let list = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Servers contados: **${client.guilds.cache.size}**`)
      .setDescription(`${text[0]}`)
      .setFooter({
        text: `Página: 1/${text.length}`,
        iconURL: client.user.avatarURL(),
      });

    const btn1 = new MessageButton()
      .setCustomId("guilds_prev")
      .setLabel("Atrás")
      .setStyle("PRIMARY");
    const btn2 = new MessageButton()
      .setCustomId("guilds_next")
      .setLabel("Siguiente")
      .setStyle("PRIMARY");
    const btn3 = new MessageButton()
      .setCustomId("guilds_del")
      .setLabel("Borrar")
      .setStyle("DANGER");

    const hRow = new discord.MessageActionRow().addComponents(btn1, btn2, btn3);
    message.channel.send({ embeds: [list], components: [hRow] });
  },
};
