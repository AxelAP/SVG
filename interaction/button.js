module.exports = async (client, discord, interaction) => {
  if (interaction.customId.startsWith("help")) {
    require(`./command/help`)(client, discord, interaction);
  }
  if (interaction.customId.startsWith("guilds")) {
    require(`./command/guilds`)(client, discord, interaction);
  }
};
