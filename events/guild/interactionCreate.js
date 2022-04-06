module.exports = async (client, discord, interaction) => {
  // BUTTONS
  if (interaction.isButton()) {
    require(`../../interaction/button`)(client, discord, interaction);
  }

  // COMMANDS SLASH
  if (interaction.isCommand()) {
    require(`../../interaction/slash`)(client, discord, interaction);
  }

  // MENU
  if (interaction.isSelectMenu()) {
    require(`../../interaction/menu`)(client, discord, interaction);
  }
};
