const randomFactory = require("./robots/random-factory");
const carFactory = require("./carFactory");
function arrayConvertToFloat(values) {
  return values.map(value => parseFloat(value));
}
const robots = {
  userInput: require("./robots/user-input"),
  state: require("./robots/content-saver"),
  checker: require("./robots/check-values")
};
const finalStatistics = {
  averageEntitiesOnStack: 0, // media ponderada do numero de entidades nas filas
  timeOnService: 0,
  entityOnStackTime: 0, //media aritmética do tempo da entidade na fila
  numberOfEntities: 0,
  numberOfEntitiesInSystem: 0,
  maxNumberOfEntities: 0
};

function run(system, number) {
  system.carsFIFO.push(number);
  const car = system.carsFIFO[0];
  if (system.tempoAtual + car > system.nextPop) {
    system.nextPop += system.tempoAtual + system.ts;
    system.carsPassed.push(number);
  }

  // if (system.isOcupied) {
  // }
  //entra carro no sistema
  // if (car) system.carsFIFO.push(car);

  // if (!system.isOcupied) {
  //   system.isOcupied = true;
  //   system.carsFIFO.pop();
  // }

  // //sai carro do sistema
  // if (system.nextPop === Math.floor(system.tempoAtual)) {
  //   system.isOcupied = false;
  // }
  system.tempoAtual++;

  console.log(this);
}

async function start() {
  // const { state } = robots;
  // const generateStatistics = () => ({});
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
  const randomNumbersFromFile = state.load();
  const randomNumbers = arrayConvertToFloat(randomNumbersFromFile);
  const system = {
    allCars: randomNumbers,
    carsFIFO: [],
    carsPassed: [],
    ts: 5,
    tempoAtual: 0,
    nextPop: 0,
    nIteracoes: 0,
    entidadesQueEntraramNoSistema: 0,
    entidadesPassadasPeloSitema: 0
  };
  // randomNumbers.map(number => {
  // return carFactory.create(number);
  //   const runnedCar = car.run(system);
  //   return runnedCar;
  while (system.tempoAtual < 1000) {
    run(system, number);
  }
  // });
  // while (system.tempoAtual < 1000 && randomNumbers.length > 0) {
  //   run(system, { ts: randomNumbers[nIteracoes] });
  // }
  generateStatistics();
  console.log(randomNumbers);
}

start();
