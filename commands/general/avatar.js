const { validMention } = require("../../useful");

module.exports = {
  name: "avatar",
  aliases: [`a`],
  description: "Devuelve el avatar de un usuario",
  async execute(client, message, args, discord) {
    if (args[0]) {
      if (validMention(message, args[0]) === false) {
        return message.channel.send("Debes mencionar a alguien");
      }
    }

    let mention = message.mentions.users.first() || message.author;
    let avatar = new discord.MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`**Avatar de ${mention.tag}**`)
      .setImage(mention.displayAvatarURL({ size: 1024, dynamic: true }))
      .setFooter({
        text: `Pedido por ${message.author.tag}`,
      });
    message.channel.send({ embeds: [avatar] });
  },
};
