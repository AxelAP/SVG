const wdSchema = require("../../models/wdSchema");
let { wordDel } = require("../../useful");
let { autism } = require("../../config");

module.exports = {
  name: "allwords",
  aliases: [`allword`, `all-words`, `wordslist`],
  description: "Muestra la lista de palabras del servidor",
  async execute(client, message, args, discord) {
    if (!autism.some((autism) => message.author.id === autism)) return;

    await wordDel(message);

    try {
      let wdData = await wdSchema.find({
        serverID: message.guild.id,
      });
      if (!wdData[0]) {
        return message.channel.send(`Añade una frase o palabra con \`word\``);
      } else {
        let acum = `Lista de palabras para **${message.guild.name}**\n\`\`\``;
        let n = 0;
        wdData.forEach((wd) => {
          acum += `${n + 1}. ${wd.word}\n`;
          n++;
        });
        acum += `\`\`\``;
        message.channel.send(acum);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
