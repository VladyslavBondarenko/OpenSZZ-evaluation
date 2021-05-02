const openszzFileName = process.argv[2];
const benchmarkFileName = process.argv[3];

const { getResult } = require("./app.helpers.js");
const { round, analyze, getAggregatedMetrics } = require("./public/helpers.js");

const compare = async () => {
  const {
    numberOfIssuesWithFoundBIC,
    numberOfIssuesInBenchmark,
    comparisonWithBenchmark,
    numberOfBFC,
    numberOfBFCWithFoundBIC,
    numberOfIssuesWithFoundBFC,
  } = await getResult(openszzFileName, benchmarkFileName);

  const analyzedItems = comparisonWithBenchmark.map((item) => analyze(item));

  const resultToPrint = {
    ...getAggregatedMetrics(analyzedItems),
    numberOfIssuesWithFoundBFC,
    numberOfIssuesWithFoundBIC,
    rateFoundBICForIssuesInBenchmark: `${round(
      comparisonWithBenchmark.length / numberOfIssuesInBenchmark
    )} (${comparisonWithBenchmark.length}/${numberOfIssuesInBenchmark})`,
    numberOfBFCWithFoundBIC: `${numberOfBFCWithFoundBIC}/${numberOfBFC}`,
  };

  console.log(resultToPrint);
};

compare();
