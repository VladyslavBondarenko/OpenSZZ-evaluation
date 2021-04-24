const {
  getDataFromOpenSZZResult,
  getDataFromBenchmark,
} = require("./csv.helpers.js");

const getComparisonWithBenchmark = (openszz, benchmark) => {
  const comparisonWithBenchmark = [];
  benchmark.forEach((value, key) => {
    const foundInResult = openszz.get(key);
    if (foundInResult && foundInResult.bfc.some((c) => value.bfc.includes(c))) {
      comparisonWithBenchmark.push({
        issue: key,
        result: foundInResult,
        benchmark: value,
      });
    }
  });
  return comparisonWithBenchmark;
};

const getResult = async (openszzFileName, benchmarkFileName) => {
  const result = await getDataFromOpenSZZResult(openszzFileName);
  const benchmarkResult = await getDataFromBenchmark(benchmarkFileName);

  const numberOfIssuesWithFoundBIC = Array.from(result).filter(
    (x) => x[1].bic.length
  ).length;
  const numberOfIssuesInBenchmark = benchmarkResult.size;
  const comparisonWithBenchmark = getComparisonWithBenchmark(
    result,
    benchmarkResult
  );
  return {
    numberOfIssuesWithFoundBIC,
    numberOfIssuesInBenchmark,
    comparisonWithBenchmark,
  };
};
module.exports = {
  getResult,
};
