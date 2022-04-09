const fs = require("fs");
let slash = [];

module.exports = (client, discord) => {
  fs.readdirSync("./slash/").forEach((dir) => {
    const commands = fs
      .readdirSync(`./slash/${dir}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commands) {
      try {
        let scmd = require(`../slash/${dir}/${file}`);

        if (scmd.name) {
          client.slash.set(scmd.name, scmd);
          slash.push(scmd);
          console.log(`- ${scmd.name}`);
        } else {
          console.log(`Error: ${file}`);
        }
      } catch (error) {
        console.log(`Error en el archivo: ${file}`);
      }
    }
  });
  console.log("Slash cargados");
  client.on("ready", async () => {
    await client.application.commands.set(slash);
  });
};
