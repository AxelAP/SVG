require("dotenv").config();
const { randPresence } = require("../../useful");

module.exports = async (client) => {
  client.user.setPresence({
    activities: [{ name: `${process.env.PREFIX}help` }],
    status: "dnd",
  });

  randPresence(client);
  require("./twitter/stream")(client);
  console.log(`${client.user.username} esta en linea`);
};
