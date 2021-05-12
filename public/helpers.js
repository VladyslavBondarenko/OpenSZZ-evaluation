(function (exports) {
  const getAverage = (arrOriginal) => {
    const arr = arrOriginal.filter((val) => !!val);
    const sum = arr.reduce((sum, val) => (sum += val), 0);
    return arr.length ? sum / arr.length : 0;
  };

  const round = (num) => Math.round((num + Number.EPSILON) * 1000) / 1000;
  exports.round = round;

  const getConfusionMatrix = (predicted, actual) => ({
    truePositives: predicted.filter((x) => actual.includes(x)),
    falsePositives: predicted.filter((x) => !actual.includes(x)),
    falseNegatives: actual.filter((x) => !predicted.includes(x)),
  });

  exports.analyze = (item) => {
    const predicted = item.result;
    const actual = item.benchmark;

    const confusionMatrix = getConfusionMatrix(predicted, actual);

    return {
      issue: item.issue,
      ...getMetrics(confusionMatrix),
    };
  };

  const getMetrics = (cm) => {
    const tp = cm.truePositives.length;
    const fp = cm.falsePositives.length;
    const fn = cm.falseNegatives.length;
    return {
      sensitivity: tp / (tp + fn),
      precision: tp / (tp + fp),
    };
  };

  exports.getAggregatedMetrics = (analyzedItems) => {
    const sensitivity = analyzedItems.map((x) => x.sensitivity);
    const precision = analyzedItems.map((x) => x.precision);
    return {
      sensitivity: round(getAverage(sensitivity)),
      precision: round(getAverage(precision)),
    };
  };
})(typeof exports === "undefined" ? (this["helpers"] = {}) : exports);
