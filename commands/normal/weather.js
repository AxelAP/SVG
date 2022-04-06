const { week, wxStatus } = require("../../data.json");
const { MessageEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports = {
  name: "weather",
  aliases: [`wx`, `tiempo`, `clima`],
  description: "Muestra el clima de un lugar",
  async execute(client, message, args, discord) {
    weather.find(
      { search: args.join(" "), degreeType: "C" },
      function (err, result) {
        if (args.length < 1)
          return message.channel.send("Debes añadir una ubicación");

        var current = result[0].current;
        var loc = result[0].location;

        const wxInfo = new MessageEmbed()
          .setColor("PURPLE")
          .setTimestamp(new Date())
          .setThumbnail(current.imageUrl)
          .setDescription("`" + wxStatus[current.skytext] + "`")
          .setAuthor({
            name: `Estado climático en ${current.observationpoint}`,
          })
          .setFooter({
            text: `Pedido por ${message.author.tag}`,
            iconURL: message.author.avatarURL(),
          })
          .addFields(
            {
              name: `Zona Horaria`,
              value: `GMT${loc.timezone}`,
              inline: true,
            },
            {
              name: `Temperatura`,
              value: `${current.temperature} °${loc.degreetype}`,
              inline: true,
            },
            {
              name: `Viento`,
              value: `${current.windspeed}`,
              inline: true,
            },
            {
              name: `Humedad`,
              value: `${current.humidity}%`,
              inline: true,
            },
            {
              name: `Fecha`,
              value: `${week[current.day]}, ${current.date.slice(
                8,
                10
              )}/${current.date.slice(5, 7)}/${current.date.slice(0, 4)}`,
              inline: true,
            }
          );
        message.channel.send({ embeds: [wxInfo] });
      }
    );
  },
};
