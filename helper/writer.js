const fs = require("fs");

async function writeFile(data) {
  const msgReceived = await fs.promises.readFile(
    __dirname + "../desnormalizada.txt"
  );
  const obj = JSON.parse(msgReceived);
  obj.push(data);
  await fs.promises.writeFile(
    __dirname + "/utils/messages.txt",
    JSON.stringify(obj, null, 2)
  );
  const newarrayMsg = await fs.promises.readFile(
    __dirname + "/utils/messages.txt"
  );
  const newmsn = JSON.parse(newarrayMsg);
  io.sockets.emit("message_back", newmsn);
}

module.exports = writeFile;