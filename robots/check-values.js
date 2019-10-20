function arrayConvertToFloat(values) {
  return values.map(value => parseFloat(value));
}
function check(values) {
  const intValues = arrayConvertToFloat(values);
  console.log("Números gerados: ", intValues);
  console.log("O maior valor gerado foi de  ", Math.max(...intValues));
  console.log("O menor valor gerado foi de  ", Math.min(...intValues));
}

module.exports = check;
