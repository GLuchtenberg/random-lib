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

const run = require("./run");

async function start() {
  function generateStatistics(system) {
    const passedCars = [...system.carsPassed];
    const historyQueu = system.historyFIFO;

    const historyToCalcTempoOcupado = system.historyFIFO;
    // console.log({ passedCars });
    // system.entityTimeInSystem =
    //   passedCars.reduce((total, num) => total + num, 0) / system.tempoAtual;
    system.entityTimeInSystem = passedCars.pop() / passedCars.length - 1;
    system.entityInQueu =
      historyQueu.reduce((total, num) => total + num, 0) /
      system.historyFIFO.length;

    system.servidorOccupied =
      historyToCalcTempoOcupado.reduce((total, num) => total + num, 0) /
      system.tempoAtual;

    return {
      ts: system.ts,
      nIteracoes: system.nIteracoes,
      tempoAtual: system.tempoAtual,
      entidadesQueEntraramNoSistema: system.entidadesQueEntraramNoSistema,
      entidadesQueSairamDoSitema: system.entidadesPassadasPeloSitema,
      maxNumInQueu: system.maxNumInQueu,
      maxEntitidadesNoSistema: system.maxNumInSystem,
      maxTimeExec: system.maxTimeExec,
      taxaMediaOcupacaoServidor: system.servidorOccupied,
      tempoMedioEntidadeEmFila: system.entityInQueu,
      tempoMedioEntidadeNoSistema: system.entityTimeInSystem
    };
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
    timeout: 300,
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
    maxTimeExec: 0,
    maxNumInSystem: 0
  };
  robots.arenaInput(system);

  while (system.nIteracoes <= system.maxTimeExec) {
    run(system);
  }
  const statistics = generateStatistics(system);
  console.log(statistics);
}

start();
