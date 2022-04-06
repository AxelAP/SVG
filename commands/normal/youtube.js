const { MessageEmbed } = require("discord.js");
const YouTube = require("youtube-node");
let youTube = new YouTube();

module.exports = {
  name: "youtube",
  aliases: [`yt`],
  description: "Busca un video de youtube",
  async execute(client, message, args, discord) {
    let ytSrch = args.join(" ");
    if (!ytSrch) return message.channel.send("Debes agregar algo para buscar");

    youTube.setKey(process.env.YTKEY);
    youTube.search(ytSrch, 10000, function (err, result) {
      if (err) return console.log(err);

      let dur, durTime, duration;
      let n = 0;

      if (result.items[n]["id"].videoId === undefined) {
        return message.channel.send("No encontre resultados");
      } else {
        youTube.getById(result.items[n]["id"].videoId, function (error, resul) {
          if (error) return console.log(error);

          duration = resul.items[n]["contentDetails"].duration.slice(2);

          durTime = "";
          dur = "";

          for (var i = 0; i < duration.length; i++) {
            if (duration.slice(i, i + 1 - duration.length) == "H") {
              if (dur != "1") durTime = durTime + dur + " horas ";
              else durTime = durTime + dur + " hora ";
              dur = "";
            } else if (duration.slice(i, i + 1 - duration.length) == "M") {
              if (dur != "1") durTime = durTime + dur + " minutos ";
              else durTime = durTime + dur + " minuto ";
              dur = "";
            } else if (
              duration.slice(duration.length - 1) == "S" &&
              i == duration.length - 1
            ) {
              if (dur != "1") durTime = durTime + dur + " segundos";
              else durTime = durTime + dur + " segundo";
              dur = "";
            } else {
              dur = dur + duration.slice(i, i + 1 - duration.length);
            }
          }

          let video = new MessageEmbed()
            .setColor("PURPLE")
            .setTimestamp()
            .setTitle(`${result.items[n]["snippet"].title}`)
            .setImage(`${result.items[n]["snippet"].thumbnails.high.url}`)
            .setURL(
              `https://www.youtube.com/watch?v=${result.items[n]["id"].videoId}`
            )
            .setFooter({
              text: `${message.guild.name}`,
              iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .addFields({
              name: `Información del video`,
              value: `Subido por [${
                result.items[n]["snippet"].channelTitle
              }](https://www.youtube.com/channel/${
                result.items[n]["snippet"].channelId
              })\n**Duración:** ${durTime}\n**ID:** ${
                result.items[n]["id"].videoId
              }\n**Publicado:** ${result.items[n]["snippet"].publishedAt.slice(
                0,
                -10
              )}\n**Visitas:** ${resul.items[n]["statistics"].viewCount}`,
            });
          message.channel.send({ embeds: [video] });
        });
      }
    });
  },
};
