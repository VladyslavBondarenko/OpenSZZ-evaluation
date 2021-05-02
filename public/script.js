const { round, analyze, getAggregatedMetrics } = this.helpers;

const onResult = (data) => {
  const {
    numberOfIssuesWithFoundBIC,
    numberOfIssuesInBenchmark,
    comparisonWithBenchmark,
    numberOfBFCWithFoundBIC,
    numberOfBFC,
  } = data;

  const analyzedItems = comparisonWithBenchmark.map((item) => ({
    ...item,
    ...analyze(item),
  }));

  console.log(analyzedItems);

  const result = {
    ...getAggregatedMetrics(analyzedItems),
    numberOfIssuesWithFoundBIC,
    numberOfIssuesInBenchmark,
    rateFoundBugBIC: round(
      comparisonWithBenchmark.length / numberOfIssuesInBenchmark
    ),
    numberOfIssuesFromBenchmarkWithFoundBIC: comparisonWithBenchmark.length,
    numberOfBFCWithFoundBIC,
    numberOfBFC,
  };

  console.log(result);

  const getResultHtml = (result) => `
  <p>Result:</p>
  <table>
    <tr>
      <td>Number of issues in OpenSZZ result dataset with found bug-introducing commits</td>
      <td>${result.numberOfIssuesWithFoundBIC}</td>
    </tr>
    <tr>
      <td>Number of issues from benchmark dataset with bug-introducing commits found by OpenSZZ</td>
      <td>${result.numberOfIssuesFromBenchmarkWithFoundBIC}/${result.numberOfIssuesInBenchmark} (${result.rateFoundBugBIC})</td>
    </tr>
    <tr>
      <td>Sensitivity</td>
      <td>${result.sensitivity}</td>
    </tr>
    <tr>
      <td>Precision</td>
      <td>${result.precision}</td>
    </tr>
    <tr>
      <td>Number of bug-fixing commits with found bug-introducing commits</td>
      <td>${numberOfBFCWithFoundBIC}/${numberOfBFC}</td>
    </tr>
  </table>
  `;

  document.getElementById("result").innerHTML = getResultHtml(result);
};

document.getElementById("files-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch("/compare", {
    method: "post",
    body: formData,
  })
    .then(async (response) => {
      const data = await response.json();
      onResult(data);
    })
    .catch((e) => console.error(e));
});
