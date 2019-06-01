const readline = require("readline-sync");
const randomFactory = require("./robots/random-factory");
function arrayConvertToFloat(values) {
  return values.map(value => parseFloat(value));
}
const robots = {
  userInput: require("./robots/user-input"),
  arenaInput: require("./robots/user-arena-input"),
  state: require("./robots/content-saver"),
  checker: require("./robots/check-values")
};

function run(system) {
  if (system.tempoAtual >= system.allCars[0]) {
    system.entidadesQueEntraramNoSistema++;

    system.historyFIFO.push(system.allCars[0]);
    system.carsFIFO.push(system.allCars[0]);
    system.maxNumInQueu =
      system.carsFIFO.length > system.maxNumInQueu
        ? system.carsFIFO.length
        : system.maxNumInQueu;
    system.allCars.shift();
  }
  const primeiroCarroDaFila = system.carsFIFO[0];

  if (system.tempoAtual >= system.nextPop && Boolean(primeiroCarroDaFila)) {
    let lastCar = system.historyFIFO.pop();
    // console.log("aaa", {
    //   ue: system.tempoAtual >= system.nextPop && Boolean(primeiroCarroDaFila),
    //   ue2: system.tempoAtual >= system.nextPop,
    //   nextPop: system.nextPop,
    //   lastCar,
    //   tempoAtual: system.tempoAtual
    // });
    system.nextPop = system.tempoAtual + system.ts;
    lastCar = system.tempoAtual - lastCar;
    system.historyFIFO.push(lastCar + system.ts);
    // system.historyFIFO[system.historyFIFO.length - 1] =
    //   system.tempoAtual - system.historyFIFO[system.historyFIFO.length - 1];
    system.carsFIFO.shift();
    system.carsPassed.push(primeiroCarroDaFila);
    system.entidadesPassadasPeloSitema++;
  }
  system.tempoAtual++;
  system.nIteracoes++;
}

async function start() {
  function generateStatistics(system) {
    const passedCars = [...system.carsPassed];

    const historyQueu = system.historyFIFO;
    const historyToCalcTempoOcupado = system.historyFIFO;
    // console.log(historyToCalcTempoOcupado);
    system.entityTimeInSystem =
      passedCars.reduce((total, num) => total + num) / system.tempoAtual;
    system.entityInQueu =
      historyQueu.reduce((total, num) => total + num) /
      system.historyFIFO.length;
    system.servidorOccupied =
      historyToCalcTempoOcupado.reduce((total, num) => total + num) /
      system.tempoAtual;
  }
  const { state } = robots;
  const content = { results: [] };
  const operations = ["TES - constante", "TES - randomico"];
  content.typeOfTES = readline.keyInSelect(
    operations,
    "Escolha uma forma de tempo entre serviços"
  );
  if (content.typeOfTES === 0) {
    const nTES = readline.questionInt("Tempo entre serviços");
    const arrayOfTES = [];
    for (let i = 0; i < 1000; i++) {
      arrayOfTES.push(nTES);
    }
    content.results = arrayOfTES;
  } else {
    robots.userInput(content);
    const random = randomFactory(content.type);
    random.params(content);
    for (let i = 0; i < content.numberOfNumbers; i++) {
      random.generate(content);
    }
  }
  // console.log(content.typeOfTES);

  robots.state.save(content.results);
  const randomNumbersFromFile = state.load();

  const randomNumbersT = arrayConvertToFloat(randomNumbersFromFile);
  let randomNumbers = [];
  randomNumbersT.forEach((element, i) => {
    if (i == 0) {
      return randomNumbers.push(element);
    }
    return randomNumbers.push(element + randomNumbers[i - 1]);
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
    maxNumInQueu: 0,
    maxTimeExec: 0
  };
  robots.arenaInput(system);
  while (system.nIteracoes <= system.maxTimeExec) {
    run(system, system.nIteracoes);
  }
  generateStatistics(system);
  console.log(system);
}

start();
