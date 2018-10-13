const app = require("./backend");

if (process.env["NODE_ENV"] === "development") {
  const proxy = require("http-proxy-middleware");

  app.use('/*', proxy({ target: "http://localhost:3001", changeOrigin: true }));
} else {
  const path = require("path");
  const express = require("express");

  app.use(express.static(path.join(__dirname, "frontend/", "build")));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}