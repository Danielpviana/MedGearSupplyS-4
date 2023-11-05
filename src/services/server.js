const { MongoClient } = require("mongodb");
const express = require("express");
const server = express();
const cors = require("cors");
const connection = new MongoClient("mongodb://localhost:27017");
server.use(express.json());
server.use(cors());

async function iniciarDB() {
    try {
        let user = {
            name: "Juan",
            lastname: "Perez",
            role: "client"
        }
        await connection.connect();
        //await connection.db("icetex").collection("users").insertOne(user);
    } catch (e) {
        console.log(e);
    }
}
iniciarDB();

server.get("/", (req, res) => {
    res.send("Hello from express");
});

server.get("/users", async (req, res) => {
    let result = await connection.db("icetex").collection("users").find({ name: "Daniel" }).toArray();

    res.send(JSON.stringify({ resultado: result }));
});

server.listen(3000, () => {
    console.log("Server on port 3000");
});
