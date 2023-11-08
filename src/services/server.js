const express = require("express");
const server = express();
const frontendRouter = require("./frontRoutes");
const APIRoutes = require("./APIRoutes");
const cors = require("cors");

server.use(express.json());
server.use(cors());

server.use("/api",APIRoutes);
server.use("/",frontendRouter);

// Server initialization
server.listen(3001, () => {
    console.log("Server on port 3001");
});