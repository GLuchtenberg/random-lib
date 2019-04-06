const randomFactory = require("./robots/random-factory");

const robots = {
  userInput: require("./robots/user-input"),
  state: require("./robots/content-saver"),
  checker: require("./robots/check-values")
};

async function start() {
  const content = { results: [] };
  robots.userInput(content);
  const random = randomFactory(content.type);
  random.params(content);
  for (let i = 0; i < content.numberOfNumbers; i++) {
    random.generate(content);
  }
  robots.state.save(content.results);
  const valuesFromFile = robots.state.load();
  robots.checker(valuesFromFile);
}

start();
