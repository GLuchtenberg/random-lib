const randomFactory = require("./robots/random-factory");
const carFactory = require("./carFactory");
function arrayConvertToFloat(values) {
  return values.map(value => parseFloat(value));
}
const robots = {
  userInput: require("./robots/user-input"),
  arenaInput:require("./robots/user-arena-input"),
  state: require("./robots/content-saver"),
  checker: require("./robots/check-values")
};

function run(system, iteracao) {
  if( system.tempoAtual >= system.allCars[0] ){
    system.entidadesQueEntraramNoSistema++;
    system.historyFIFO.push(system.allCars[0]);
    system.carsFIFO.push(system.allCars[0]);
    system.maxNumInQueu = system.carsFIFO.length > system.maxNumInQueu ? system.carsFIFO.length : system.maxNumInQueu;
    system.allCars.shift();
  }
  const primeiroCarroDaFila = system.carsFIFO[0];

  if ( (system.tempoAtual >= system.nextPop) && Boolean(primeiroCarroDaFila) ) {
    system.nextPop = system.tempoAtual + system.ts;
    system.historyFIFO[system.historyFIFO.length - 1] = system.tempoAtual - system.historyFIFO[system.historyFIFO.length - 1];
    system.carsFIFO.shift();
    system.carsPassed.push(primeiroCarroDaFila);
    system.entidadesPassadasPeloSitema++;    
  }
  system.tempoAtual++;
  system.nIteracoes++;
}

async function start() {
  function generateStatistics(system){
    const passedCars = [...system.carsPassed];
    const historyQueu = system.historyFIFO;
    // console.log(historyQueu)
    system.entityTimeInSystem = passedCars.reduce((total,num) => total+num) / system.tempoAtual;
    system.entityInQueu = historyQueu.reduce((total,num) => total + num) / system.historyFIFO.length;
  }
  const { state } = robots;
  const content = { results: [] };
  
    robots.userInput(content);
    
    const random = randomFactory(content.type);
    random.params(content);
    for (let i = 0; i < content.numberOfNumbers; i++) {
      random.generate(content);
    }
    robots.state.save(content.results);
  const randomNumbersFromFile = state.load();

  const randomNumbersT = arrayConvertToFloat(randomNumbersFromFile);
  let randomNumbers = [];
  randomNumbersT.forEach((element,i) => {
    if(i == 0){
      return randomNumbers.push(element);
    }
    return randomNumbers.push(element+randomNumbers[i-1]);
  });
  const system = {
    allCars: randomNumbers,
    historyFIFO: [],
    carsFIFO: [],
    carsPassed: [],
    ts: 7,
    tempoAtual: 0,
    nextPop: 0,
    nIteracoes: 0,
    entidadesQueEntraramNoSistema: 0,
    entidadesPassadasPeloSitema: 0,
    maxNumInQueu:0,
    maxTimeExec: 0,
  };
  robots.arenaInput(system);
  // const generateStatistics = () => ({});
  
  // const valuesFromFile = robots.state.load();
  // robots.checker(valuesFromFile);
  
  // while (system.nIteracoes <= system.allCars[system.allCars.length - 1]+1) {
  while (system.nIteracoes <= system.maxTimeExec) {
    run(system,system.nIteracoes);
  }
// console.log(system.allCars)
  generateStatistics(system);
  console.log(system);
}

start();
