const { MessageEmbed } = require("discord.js");
const { idAutor } = require("../../config");

module.exports = async (client, discord, interaction) => {
  const creator = client.users.cache.get(idAutor);
  const message = interaction.message;

  if (interaction.customId === "help_prev") {
    let help1 = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Comandos de ${client.user.username}`)
      .setThumbnail(client.user.avatarURL())
      .setFooter({
        text: `Creador: ${creator.tag}`,
        iconURL: creator.avatarURL(),
      })
      .addFields(
        {
          name: `startwar`,
          value: `Inicia una war`,
        },
        {
          name: `race`,
          value: `Añade una carrera`,
        },
        {
          name: `score`,
          value: `Muestra la puntacion total`,
        },
        {
          name: `trackplayed`,
          value: `Enseña las pistas jugadas`,
        }
      );
    interaction.deferUpdate();
    return message.edit({ embeds: [help1] });
  }
  if (interaction.customId === "help_next") {
    let help2 = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Comandos de ${client.user.username}`)
      .setThumbnail(client.user.avatarURL())
      .setFooter({
        text: `Creador: ${creator.tag}`,
        iconURL: creator.avatarURL(),
      })
      .addFields(
        {
          name: `checkrace`,
          value: `Simula un puntaje`,
        },
        {
          name: `revertscore`,
          value: `Revierte a un score anterior`,
        },
        {
          name: `track`,
          value: `Devuelve una pista`,
        },
        {
          name: `randomtrack`,
          value: `Revela una pista aleatoria`,
        }
      );
    interaction.deferUpdate();
    return message.edit({ embeds: [help2] });
  }
  if (interaction.customId === "help_del") {
    return message.delete();
  }
};
