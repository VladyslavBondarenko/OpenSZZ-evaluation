const express = require("express");
const app = express();
const path = require("path");
const formidable = require("formidable");

const { getResult } = require("./app.helpers.js");

const port = 3001;

app.use("/", express.static(path.join(__dirname, "public")));

app.post("/compare", async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const result = await getResult(files.openszz.path, files.benchmark.path);

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
