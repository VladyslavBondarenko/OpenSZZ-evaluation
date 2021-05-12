const openszzFileName = process.argv[2];
const benchmarkFileName = process.argv[3];

const { getResult } = require("./app.helpers.js");
const { round, analyze, getAggregatedMetrics } = require("./public/helpers.js");

const compare = async () => {
  const {
    numberOfBICInBenchmark,
    comparisonWithBenchmark,
    numberOfBFC,
    numberOfBFCWithFoundBIC,
  } = await getResult(openszzFileName, benchmarkFileName);

  const analyzedItems = comparisonWithBenchmark.map((item) => analyze(item));

  const resultToPrint = {
    ...getAggregatedMetrics(analyzedItems),
    rateFoundBICForIssuesInBenchmark: `${round(
      comparisonWithBenchmark.length / numberOfBICInBenchmark
    )} (${comparisonWithBenchmark.length}/${numberOfBICInBenchmark})`,
    numberOfBFCWithFoundBIC: `${numberOfBFCWithFoundBIC}/${numberOfBFC}`,
  };

  console.log(resultToPrint);
};

compare();
