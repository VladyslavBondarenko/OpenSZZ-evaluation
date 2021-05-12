const {
  getDataFromOpenSZZResult,
  getDataFromBenchmark,
} = require("./csv.helpers.js");

const getComparisonWithBenchmark = (openszz, benchmark) => {
  const comparisonWithBenchmark = [];
  benchmark.forEach((value, key) => {
    const foundInOpenszz = openszz.get(key);
    if (foundInOpenszz) {
      comparisonWithBenchmark.push({
        bfc: key,
        result: foundInOpenszz,
        benchmark: value,
      });
    }
  });
  return comparisonWithBenchmark;
};

const getResult = async (openszzFileName, benchmarkFileName) => {
  const benchmarkResult = await getDataFromBenchmark(benchmarkFileName);

  const { result, BFC } = await getDataFromOpenSZZResult(openszzFileName);
  const comparisonWithBenchmark = getComparisonWithBenchmark(
    result,
    benchmarkResult
  );
  return {
    numberOfBFC: BFC.length,
    numberOfBFCWithFoundBIC: result.size,
    numberOfBICInBenchmark: benchmarkResult.size,
    comparisonWithBenchmark,
  };
};
module.exports = {
  getResult,
};
