const readline = require("readline-sync");

function params(content) {
  function triangleParams() {
    const lowRange = readline.questionInt("Valor inicial: ");
    const highRange = readline.questionInt("Maior valor: ");
    const mode = readline.questionInt("Mode: ");
    return { lowRange, highRange, mode };
  }
  content.params = triangleParams();
}
function generate(content) {
  function generate(lowRange, highRange) {
    var c = (mode - lowRange) / (highRange - lowRange);
    var u = Math.random();

    if (u <= c) {
      return (
        lowRange + Math.sqrt(u * (highRange - lowRange) * (mode - lowRange))
      );
    } else {
      return (
        highRange -
        Math.sqrt((1 - u) * (highRange - lowRange) * (highRange - mode))
      );
    }
  }
  const { lowRange, highRange, mode } = content.params;
  content.results.push(generate(lowRange, highRange, mode));
}

module.exports = {
  params,
  generate
};
