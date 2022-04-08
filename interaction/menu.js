module.exports = async (client, discord, interaction) => {
  let dirCmd = `./command`;

  if (interaction.customId.startsWith("help")) {
    require(`${dirCmd}/help`)(client, discord, interaction);
  }
};
