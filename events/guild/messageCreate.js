require("dotenv").config();
const { wordMsg } = require("../../useful");

const prefix = process.env.PREFIX;

module.exports = async (client, discord, message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  wordMsg(message);
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  if (command) command.execute(client, message, args, discord, command.name);
  // if (!command) return message.channel.send("Este comando no existe");
};
