module.exports = {
  name: "ping",
  aliases: [`ping`],
  description: "Muestra el ping del bot",
  async execute(client, message, args, discord) {
    if (args[0]) return;
    return message.channel.send(
      `Mi ping es de ${Math.floor(message.client.ws.ping)} ms`
    );
  },
};
