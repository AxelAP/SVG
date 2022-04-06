module.exports = {
  name: "clear",
  aliases: [`borrar`, `del`, `limpiar`],
  description: "Elimina una cantidad de mensajes",
  async execute(client, message, args, discord) {
    if (!message.member.permissions.has(["ADMINISTRATOR", "MANAGE_MESSAGES"]))
      return message.channel.send("No tienes los permisos necesarios");

    if (!message.guild.me.permissions.has(["ADMINISTRATOR", "MANAGE_MESSAGES"]))
      return message.channel.send("No tengo los permisos necesarios");

    if (!args[0]) return message.reply("Ingresa numero de mensajes a borrar");
    if (isNaN(args[0])) return message.reply("Ingresa un numero");
    if (args[0] > 100) return message.reply("Debe ser un numero menor a 100");
    if (args[0] < 1) return message.reply("Debe ser un numero mayor a 0");

    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel.bulkDelete(messages.filter((m) => !m.pinned));
      });
  },
};
