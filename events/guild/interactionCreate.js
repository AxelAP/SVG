module.exports = async (client, discord, interaction) => {
  let dirInter = `../../interaction`;

  // BUTTONS
  if (interaction.isButton()) {
    require(`${dirInter}/button`)(client, discord, interaction);
  }

  // COMMANDS SLASH
  if (interaction.isCommand()) {
    require(`${dirInter}/slash`)(client, discord, interaction);
  }

  // MENU
  if (interaction.isSelectMenu()) {
    require(`${dirInter}/menu`)(client, discord, interaction);
  }
};
