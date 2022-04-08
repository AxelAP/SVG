const imgSchema = require("../../models/imgSchema");
const img = require("images-scraper");
const google = new img({
  puppeteer: {
    headless: true,
  },
});

module.exports = {
  name: "img",
  aliases: [`image`, `imagen`],
  description: "Envia una imagen",
  async execute(client, message, args, discord) {
    let search = args.join(" ");
    if (!search) return message.channel.send("Debes agregar algo para buscar");

    let images = [];
    let descriptions = [];
    let cont = 0;

    let result = await google.scrape(search, 100);
    result.forEach((res) => {
      images[cont] = res.url;
      descriptions[cont] = res.title;
      cont++;
    });

    cont = 0;

    let embed = new discord.MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Resultados de: ${search}`)
      .setDescription(descriptions[cont])
      .setImage(images[cont])
      .setFooter({
        text: `Página: ${cont + 1}/${images.length} `,
        iconURL: client.user.avatarURL(),
      });

    const btn1 = new discord.MessageButton()
      .setCustomId("img_prev")
      .setLabel("Atrás")
      .setStyle("PRIMARY");
    const btn2 = new discord.MessageButton()
      .setCustomId("img_next")
      .setLabel("Siguiente")
      .setStyle("PRIMARY");
    const btn3 = new discord.MessageButton()
      .setCustomId("img_del")
      .setLabel("Borrar")
      .setStyle("DANGER");

    const hRow = new discord.MessageActionRow().addComponents(btn1, btn2, btn3);

    message.channel
      .send({ embeds: [embed], components: [hRow] })
      .then(async (msg) => {
        try {
          let img = await imgSchema.create({
            messageID: msg.id,
            userID: message.author.id,
            query: search,
            images: images,
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
          img.save();
        } catch (error) {
          console.log(error);
        }
      });
  },
};
