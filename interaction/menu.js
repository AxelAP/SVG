const path = require("path");

module.exports = async (client, discord, interaction) => {
  const embed = {
    title: "Embed Objeto",
    color: 65535,
    description: "Hola soy un embed",
    author: {
      name: "OLA",
      url: "http://www.google.com",
      icon_url: "attachment://img.png",
    },
    image: { url: "attachment://img.png" },
  };

  if (interaction.customId == "menu1") {
    interaction.deferReply({ ephemeral: false });

    const at = new discord.MessageAttachment(
      path.join(__dirname, "../../src", "bg3.png"),
      "img.png"
    );

    switch (interaction.values[0]) {
      case "dog":
        interaction.followUp({
          content: "Elegiste perros",
          embeds: [embed],
          files: [at],
        });
        break;
      case "cat":
        interaction.followUp({ content: "Elegiste gatos" });
        break;
      case "ing":
        interaction.followUp({ content: "Elegiste Iguanas" });
        break;

      default:
        interaction.followUp({ content: "Error" });
        break;
    }
  }
};
