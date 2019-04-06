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
  function askHowMuchNumbers() {
    return readline.questionInt("Quantos números deseja criar? ");
  }

  content.type = askAndReturnKindOfOperation();

  content.numberOfNumbers = askHowMuchNumbers();
}
module.exports = robot;
