module.exports = {
  name: "choose",
  aliases: [`escoger`, `elegir`],
  description: "Escoge entre varias opciones",
  async execute(client, message, args, discord) {
    if (!args[0]) return message.channel.send("Ingresa almenos 2 opciones");
    if (!args[1]) return message.channel.send("Ingresa almenos 2 opciones");
    let randomChoice = Math.floor(Math.random() * args.length);
    message.channel.send(args[randomChoice]);
  },
};
