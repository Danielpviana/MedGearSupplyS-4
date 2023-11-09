const express = require("express");
const frontendRouter = express.Router();
const path = require("path");

frontendRouter.use(express.static(path.resolve("./src/services/build")));

frontendRouter.get("*", (req, res) => {
    res.sendFile(path.resolve("./src/services/build/index.html"));
});

module.exports = frontendRouter;