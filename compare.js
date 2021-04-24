const openszzFileName = process.argv[2];
const benchmarkFileName = process.argv[3];

const { getResult } = require("./app.helpers.js");
const { round, analyze, getAggregatedMetrics } = require("./public/helpers.js");

const compare = async () => {
  const {
    numberOfIssuesWithFoundBIC,
    numberOfIssuesInBenchmark,
    comparisonWithBenchmark,
  } = await getResult(openszzFileName, benchmarkFileName);

  const analyzedItems = comparisonWithBenchmark.map((item) => analyze(item));

  const resultToPrint = {
    ...getAggregatedMetrics(analyzedItems),
    numberOfIssuesWithFoundBIC,
    numberOfIssuesInBenchmark,
    rateFoundBugBIC: round(
      comparisonWithBenchmark.length / numberOfIssuesInBenchmark
    ),
    numberOfIssuesFromBenchmarkWithFoundBIC: comparisonWithBenchmark.length,
  };

  console.log(resultToPrint);
};

compare();
