const readline = require("readline-sync");

function params(content) {
  function exponentialParams() {
    const lambda = readline.questionInt("Lambda: ");

    return { lambda };
  }
  content.params = exponentialParams();
}

function generate(content) {
  const { lambda } = content.params;
  function generate(lambda) {
    var r = Math.random();
    return -Math.log(r) / lambda;
  }

  content.results.push(generate(lambda));
}

module.exports = {
  params,
  generate
};
