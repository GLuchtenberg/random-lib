const readline = require("readline-sync");

function robot(system) {
  function askMaxTime() {
    return readline.questionInt("Tempo máximo de execução: ") - 1;
  }
  function askExecutionTime() {
    return readline.questionInt("Tempo de serviço: ");
  }
  system.maxTimeExec = askMaxTime();

  system.ts = askExecutionTime();
}
module.exports = robot;
