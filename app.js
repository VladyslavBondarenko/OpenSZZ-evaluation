const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

const { getResult } = require("./app.helpers.js");

const port = 3001;

app.use("/", express.static(path.join(__dirname, "public")));

app.post("/compare", async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const openszzFileName = "./files/openszz.csv";
    const benchmarkFileName = "./files/benchmark.csv";
    const openszzFile = files.openszz.path;
    const benchmarkFile = files.benchmark.path;
    const onError = (err) => {
      if (err) throw err;
    };

    fs.rename(openszzFile, "./files/openszz.csv", onError);
    fs.rename(benchmarkFile, "./files/benchmark.csv", onError);

    const result = await getResult(openszzFileName, benchmarkFileName);

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
