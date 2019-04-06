const readline = require("readline-sync");

function params(content) {
  function normalParams() {
    const mu = readline.questionInt("Mu: ");
    const sigma = readline.questionInt("Sigma: ");
    return { mu, sigma };
  }
  content.params = normalParams();
}

function generate(content) {
  const { mu, sigma } = content.params;
  function generate(mu, sigma) {
    let z = this.lastNormal;
    this.lastNormal = NaN;
    if (!z) {
      const a = Math.random() * 2 * Math.PI;
      const b = Math.sqrt(-2.0 * Math.log(1.0 - Math.random()));
      z = Math.cos(a) * b;
      this.lastNormal = Math.sin(a) * b;
    }
    return mu + z * sigma;
  }

  content.results.push(generate(mu, sigma));
}

module.exports = {
  params,
  generate
};
