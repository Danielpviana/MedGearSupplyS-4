const express = require("express");
const frontendRouter = express.Router();
const path = require("path");

frontendRouter.use(express.static(path.resolve("./build")));

frontendRouter.get("*", (req, res) => {
    res.sendFile(path.resolve("./build/index.html"));
});

module.exports = frontendRouter;