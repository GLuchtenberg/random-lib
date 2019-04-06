const robots = {
  uniform: require("./uniform"),
  triangle: require("./triangle"),
  exponential: require("./exponential"),
  normal: require("./normal")
};

function factory(param) {
  switch (param) {
    case "uniforme":
      return robots.uniform;
    case "triangular":
      return robots.triangle;
    case "exponencial":
      return robots.exponential;
    default:
      return robots.normal;
  }
}

module.exports = factory;
