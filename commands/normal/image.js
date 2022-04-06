const { MessageEmbed } = require("discord.js");
const GoogleImg = require("google-images");

const google = new GoogleImg(process.env.CSDID, process.env.GOOGLEKEY);

module.exports = {
  name: "image",
  aliases: [`img`, `imagen`],
  description: "Envia una imagen",
  async execute(client, message, args, discord) {
    let search = args.join(" ");
    if (!search) return message.channel.send("Debes agregar algo para buscar");

    google.search(search, { page: 1 }).then((images) => {
      let random = Math.floor(Math.random() * images.length);
      let img = new MessageEmbed()
        .setTimestamp()
        .setColor("PURPLE")
        .setImage(images[random].url)
        .setFooter({
          text: `${message.guild.name}`,
          iconURL: message.guild.iconURL({ dynamic: true }),
        });
      message.channel.send({ embeds: [img] });
    });
  },
};
