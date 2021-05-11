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
  const { issuesMap: benchmarkResult, commitShaLength } =
    await getDataFromBenchmark(benchmarkFileName);

  const { result, BFC, BFCwithBIC, issues } = await getDataFromOpenSZZResult(
    openszzFileName,
    commitShaLength
  );

  const numberOfIssuesWithFoundBIC = Array.from(result).filter(
    (x) => x[1].bic.length
  ).length;
  const comparisonWithBenchmark = getComparisonWithBenchmark(
    result,
    benchmarkResult
  );
  return {
    numberOfBFC: BFC.length,
    numberOfBFCWithFoundBIC: BFCwithBIC.length,
    numberOfIssuesWithFoundBFC: issues.length,
    numberOfIssuesWithFoundBIC,
    numberOfIssuesInBenchmark: benchmarkResult.size,
    comparisonWithBenchmark,
  };
};
module.exports = {
  getResult,
};
