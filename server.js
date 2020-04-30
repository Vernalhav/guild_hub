const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "assets")));

const server = app.listen(8000);