module.exports = async (client, discord, interaction) => {
  let dirCmd = `./command`;

  if (interaction.customId.startsWith("guilds")) {
    require(`${dirCmd}/guilds`)(client, discord, interaction);
  }
  if (interaction.customId.startsWith("help")) {
    require(`${dirCmd}/help`)(client, discord, interaction);
  }
  if (interaction.customId.startsWith("gif")) {
    require(`${dirCmd}/gif`)(client, discord, interaction);
  }
  if (interaction.customId.startsWith("img")) {
    require(`${dirCmd}/img`)(client, discord, interaction);
  }
};
