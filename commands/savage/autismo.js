const { randReply } = require("../../useful");
const { autism } = require("../../config");

module.exports = {
  name: "autism",
  aliases: [`autismo`],
  description: "Kick random",
  async execute(client, message, args, discord) {
    if (!message.guild.me.permissions.has(["ADMINISTRATOR", "KICK_MEMBERS"]))
      return message.channel.send("No tengo los permisos necesarios");

    if (!autism.some((autism) => message.author.id === autism))
      return randReply(client, message);

    let random = Math.floor(Math.random() * autism.length);
    let idUser = autism[random];

    let autista = await message.guild.members
      .fetch(idUser)
      .catch(console.error);

    if (!autista) return message.channel.send("Si");
    let msg = `Adios **${autista.displayName}** 🏳️‍🌈🏳️‍⚧️`;

    autista
      .kick("I haVe AutiSm")
      .catch((err) => {
        msg = `No puedo expulsar a **${autista.displayName}**`;
        return;
      })
      .then(() => {
        message.channel.send(msg);
      });
  },
};
