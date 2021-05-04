// The script takes an openszz output and counts for how many bug-fixing commits
// bug-introducing commits were not found because the bug was fixed only by line additions

const csv = require("csvtojson");

const file = process.argv[2];

const count = async () => {
  try {
    const fileLines = await csv({
      delimiter: ";",
    }).fromFile(file);

    const bfc = [...new Set(fileLines.map((l) => l.bugFixingId))];
    const bfcLines = bfc.map((c) => ({
      bfc: c,
      lines: fileLines.filter((l) => l.bugFixingId === c),
    }));

    const bfcWithoutBic = bfcLines
      .map((c) => ({
        bfc: c.bfc,
        bic: [
          ...new Set(c.lines.map((l) => l.bugInducingId).filter((bic) => bic)),
        ],
      }))
      .filter((c) => !c.bic.length);

    const bfcWithoutBicDueToOnlyAdditions = bfcLines.filter(
      (i) =>
        i.lines.some((l) => l.note === "No changed lines, only additions") &&
        !i.lines.some((l) => !l.bugIntroducingId && !l.note)
    );

    console.log(`Total BFC: ${bfcLines.length}.`);
    console.log(
      `${bfcWithoutBic.length} BFC out of the ${bfcLines.length} have BIC not found.`
    );
    console.log(
      `${bfcWithoutBicDueToOnlyAdditions.length} BFC out of the ${bfcWithoutBic.length} have BIC not found for any of the files edited in this commit and at least for one of the edited files BIC was not found because the file was changed only with line additions.`
    );
  } catch (e) {
    console.log(e);
  }
};

count();
