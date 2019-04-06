const readline = require("readline-sync");

function params(content) {
  function uniformParams() {
    const lowRange = readline.questionInt("Menor valor: ");
    const highRange = readline.questionInt("Maior valor: ");
    return { lowRange, highRange };
  }
  content.params = uniformParams();
}

function generate(content) {
  function generate(lowRange, highRange) {
    return Math.floor(Math.random() * (highRange - lowRange)) + lowRange;
  }

  const { lowRange, highRange } = content.params;
  content.results.push(generate(lowRange, highRange));
}

module.exports = {
  params,
  generate
};
