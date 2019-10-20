async function run(system) {
  if (system.tempoAtual >= system.allCars[0]) {
    console.log(`${system.tempoAtual}: carro entrou`);
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

    system.nextPop = system.tempoAtual + system.ts;
    lastCar = system.tempoAtual - lastCar;
    system.historyFIFO.push(lastCar + system.ts);
    system.carsFIFO.shift();
    system.carsPassed.push(primeiroCarroDaFila);
    system.entidadesPassadasPeloSitema++;
    console.log(`${system.tempoAtual}: carro saiu`);
  }
  system.tempoAtual++;
  system.nIteracoes++;
}

module.exports = run;
