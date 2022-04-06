module.exports = async (client, discord, interaction) => {
  const perm = {
    author: {
      name: "Necesitas permisos",
      icon_url: "https://cdn-icons-png.flaticon.com/512/1633/1633103.png",
    },
    timestamp: interaction.createdTimestamp,
    color: 16711680,
  };

  const command = client.slash.get(interaction.commandName);

  if (!interaction.member.permissions.has(command.permissions || [])) {
    return interaction.reply({ embeds: [perm], ephemeral: true });
  }

  try {
    command.run(client, interaction);
  } catch (error) {
    console.log("Error iC: " + error);
  }
};
