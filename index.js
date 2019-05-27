const randomFactory = require("./robots/random-factory");

const robots = {
  userInput: require("./robots/user-input"),
  state: require("./robots/content-saver"),
  checker: require("./robots/check-values")
};
const finalStatistics = {
  averageEntitiesOnStack:0, // media ponderada do numero de entidades nas filas
  timeOnService: 0, 
  entityOnStackTime:0 , //media aritmética do tempo da entidade na fila
  numberOfEntities: 0,
  numberOfEntitiesInSystem:0,
  maxNumberOfEntities:0,
}

async function start() {
  const {
    state
  } = robots;
  // const content = { results: [] };
  // robots.userInput(content);
  // const random = randomFactory(content.type);
  // random.params(content);
  // for (let i = 0; i < content.numberOfNumbers; i++) {
  //   random.generate(content);
  // }
  // robots.state.save(content.results);
  // const valuesFromFile = robots.state.load();
  // robots.checker(valuesFromFile);
  const entities = state.load();
  console.log(entities)
}

start();
