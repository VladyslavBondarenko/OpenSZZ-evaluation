const csv = require("csvtojson");

const getDataFromOpenSZZResult = async (fileName, commitShaLength = 8) => {
  try {
    const lines = await csv({
      delimiter: ";",
    }).fromFile(fileName);

    const issues = [...new Set(lines.map((l) => l.issueId))];
    const BFC = [...new Set(lines.map((l) => l.bugFixingId))];
    const BFCwithBIC = [
      ...new Set(
        lines.filter((l) => l.bugInducingId).map((l) => l.bugFixingId)
      ),
    ];
    const issuesMap = new Map();
    const getData = (issueId) => {
      const filteredLines = lines.filter((l) => l.issueId === issueId);
      const bfc = [
        ...new Set(
          filteredLines
            .map((l) => l.bugFixingId.substring(0, commitShaLength))
            .filter((bfc) => bfc.length)
        ),
      ];
      const bic = [
        ...new Set(
          filteredLines
            .map((l) => l.bugInducingId.substring(0, commitShaLength))
            .filter((bic) => bic.length)
        ),
      ];
      return { bfc, bic };
    };
    issues.forEach((issue) => {
      const result = getData(issue);
      if (result.bic.length) issuesMap.set(issue, result);
    });
    return {
      result: issuesMap,
      BFC,
      BFCwithBIC,
      issues,
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

    const issuesMap = new Map();
    lines.forEach((issue) => {
      issuesMap.set(issue.BugID, {
        bfc: issue.BugFixingCommit.split(","),
        bic: issue.BugInducingCommit.split(","),
      });
    });
    const commitShaLength =
      lines.length && lines[0].BugFixingCommit.split(",")[0].length;
    return { issuesMap, commitShaLength };
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getDataFromOpenSZZResult,
  getDataFromBenchmark,
};
