const gifSchema = require("../../models/gifSchema");
const Tenor = require("tenorjs").client({
  Key: `${process.env.TENORKEY}`, // https://tenor.com/developer/keyregistration
  Filter: "off", // "off", "low", "medium", "high", not case sensitive
  Locale: "en_US", // Your locale here, case-sensitivity depends on input
  MediaFilter: "minimal", // either minimal or basic, not case sensitive
  DateFormat: "D/MM/YYYY - H:mm:ss A", // Change this accordingly
});

module.exports = {
  name: "gif",
  aliases: [],
  description: "Envia un gif buscado de tenor",
  async execute(client, message, args, discord) {
    let search = args.join(" ");
    if (!search) return message.channel.send("Debes agregar algo para buscar");

    let gifs = [];
    let descriptions = [];
    let cont = 0;

    let result = await Tenor.Search.Query(search, "50");
    result.forEach((res) => {
      gifs[cont] = res.media[0].gif.url;
      descriptions[cont] = res.content_description.substring(
        0,
        res.content_description.length - 4
      );
      cont++;
    });

    cont = 0;

    let embed = new discord.MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Resultados de: ${search}`)
      .setDescription(descriptions[cont])
      .setImage(gifs[cont])
      .setFooter({
        text: `Página: ${cont + 1}/${gifs.length} `,
        iconURL: client.user.avatarURL(),
      });

    const btn1 = new discord.MessageButton()
      .setCustomId("gif_prev")
      .setLabel("Atrás")
      .setStyle("PRIMARY");
    const btn2 = new discord.MessageButton()
      .setCustomId("gif_next")
      .setLabel("Siguiente")
      .setStyle("PRIMARY");
    const btn3 = new discord.MessageButton()
      .setCustomId("gif_del")
      .setLabel("Borrar")
      .setStyle("DANGER");

    const hRow = new discord.MessageActionRow().addComponents(btn1, btn2, btn3);

    message.channel
      .send({ embeds: [embed], components: [hRow] })
      .then(async (msg) => {
        try {
          let gif = await gifSchema.create({
            messageID: msg.id,
            userID: message.author.id,
            query: search,
            gifs: gifs,
            descriptions: descriptions,
            actual: cont,
            siguiente: cont + 1,
            anterior: cont - 1,
            logs: [
              {
                messageID: msg.id,
              },
            ],
          });
          gif.save();
        } catch (error) {
          console.log(error);
        }
      });
  },
};
