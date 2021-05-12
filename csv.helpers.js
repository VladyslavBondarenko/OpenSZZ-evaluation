const csv = require("csvtojson");

const getDataFromOpenSZZResult = async (fileName) => {
  try {
    const lines = await csv({
      delimiter: ";",
    }).fromFile(fileName);

    const issues = [...new Set(lines.map((l) => l.issueId))];
    const BFC = [...new Set(lines.map((l) => l.bugFixingId))];
    const result = new Map();
    BFC.forEach((bfc) => {
      const filteredLines = lines.filter((l) => l.bugFixingId === bfc);
      const bics = [
        ...new Set(
          filteredLines
            .filter((l) => l.bugInducingId)
            .map((l) => l.bugInducingId.substring(0, 7))
        ),
      ];
      if (bics.length) result.set(bfc.substring(0, 7), bics);
    });
    return {
      result,
      BFC,
    };
  } catch (e) {
    console.log(e);
  }
};

const getDataFromBenchmark = async (fileName) => {
  try {
    const lines = await csv({
      delimiter: "\t",
    }).fromFile(fileName);

    const benchmarkResult = new Map();
    lines.forEach((line) => {
      if (!line.BugFixingCommit.includes(","))
        benchmarkResult.set(
          line.BugFixingCommit.substring(0, 7),
          line.BugInducingCommit.split(",").map((c) => c.substring(0, 7))
        );
    });
    return benchmarkResult;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getDataFromOpenSZZResult,
  getDataFromBenchmark,
};
