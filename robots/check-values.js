function arrayConvertToInt(values) {
  return values.map(value => parseInt(value, 10));
}
function check(values) {
  const intValues = arrayConvertToInt(values);
  console.log("O maior valor gerado foi de  ", Math.max(...intValues));
  console.log("O menor valor gerado foi de  ", Math.min(...intValues));
}

module.exports = check;
