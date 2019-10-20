const readline = require("readline-sync");

function robot(content) {
  function askAndReturnKindOfOperation() {
    const operations = ["uniforme", "triangular", "normal", "exponencial"];
    const selectedTypeIndex = readline.keyInSelect(
      operations,
      "Escolha uma forma de geração de números aleatórios "
    );
    const textOftype = operations[selectedTypeIndex];
    return textOftype;
  }

  content.type = askAndReturnKindOfOperation();

  content.numberOfNumbers = 1000;
}
module.exports = robot;
