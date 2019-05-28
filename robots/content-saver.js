const fs = require("fs");
const contentFilePath = "./result.txt";
const separator = "\n";
function save(data) {
  const content = data.join(separator);
  return fs.writeFileSync(contentFilePath, content);
}

function load() {
  const fileBuffer = fs.readFileSync(contentFilePath, "utf-8");
  const jsonContent = fileBuffer.split(separator);
  return jsonContent;
}

module.exports = {
  save,
  load
};
