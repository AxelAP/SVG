const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "gif",
  aliases: [],
  description: "Envia un gif buscado de tenor",
  async execute(client, message, args, discord) {
    let tenorSrch = args.join("-");
    if (!tenorSrch)
      return message.channel.send("Debes agregar algo para buscar");

    await fetch(
      `https://api.tenor.com/v1/random?key=${process.env.TENORKEY}&q=${tenorSrch}&limit=1`
    )
      .then((tenorResult) => tenorResult.json())
      .then((json) => {
        let gif = new MessageEmbed()
          .setTimestamp()
          .setColor("PURPLE")
          .setImage(json.results[0].media[0].gif.url)
          .setFooter({
            text: `${message.guild.name}`,
            iconURL: message.guild.iconURL({ dynamic: true }),
          });
        message.channel.send({ embeds: [gif] });
      })
      .catch((err) => {
        console.log(err);
        message.channel.send("No encontre resultados");
      });
  },
};
