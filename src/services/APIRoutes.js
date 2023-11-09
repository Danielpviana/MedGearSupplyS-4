const express = require("express");
const cors = require("cors");
const APIRoutes = express.Router();
APIRoutes.use(express.json());
APIRoutes.use(cors());
const { MongoClient, ObjectId } = require("mongodb");
const connection = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });
const jwt = require("jsonwebtoken");

APIRoutes.get("/home", async (req, res) => {
    let validatedToken = req.headers["authorization"];
    try {
        jwt.verify(validatedToken, "snapserverKey", (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                const user = decoded;
            }
        });
        const productList = await connection.db("icetex").collection("products").find({}).toArray();
        console.log(validatedToken);
        res.json(productList);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
    }
});

APIRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await connection.db("icetex").collection("users").findOne({ email: email });
    console.log(user);
    if (!user) {
        res.status(401).json({ error: "Invalid user or password" });
    } else if (email === user.email && password === user.password) {
        let token = jwt.sign(user, "snapserverKey", { expiresIn: "2d" });
        //AsyncStorage.setItem("token", token);
        //res.json({ message: "Logged in successfully" });
        res.json({ user: user.name, role: user.role, token: token });
    } else {
        res.status(401).json({ error: "Invalid user or password" });
    }
});

APIRoutes.post("/logup", async (req, res) => {
    const { name, lastname, email, password, confirmPassword, adress } = req.body;
    if (confirmPassword === password) {
        const userToCreate = await connection.db("icetex").collection("users").insertOne({ name: name, lastname: lastname, email: email, password: password, adress: adress, role: "client" });
        res.json({ message: "Logged up successfully" });
    } else {
        res.status(401).json({ error: "Passwords do not match" });
    }
});

APIRoutes.get("/products", async (req, res) => {
    let validatedToken = req.headers["authorization"];
    let isAdmin = true;

    try {
        jwt.verify(validatedToken, "snapserverKey", (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                if (decoded.role != 'admin') {
                    isAdmin = false;
                }
            }
        });
        if (isAdmin) {
            const productList = await connection.db("icetex").collection("products").find({}).toArray();
            //console.log(validatedToken);
            res.json(productList);
        } else {
            res.status(401).json({ errorCode: "Not an admin" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
    }
});

APIRoutes.post("/products", async (req, res) => {
    const { name, imageUrl, price, amount } = req.body;
    const priceInt = parseInt(price, 10);
    const amountInt = parseInt(amount, 10);
    const productToCreate = await connection.db("icetex").collection("products").insertOne({ name: name, image: imageUrl, price: priceInt, amount: amountInt });
    res.json({ message: "Product created successfully" });
});

APIRoutes.delete("/products/:id", async (req, res) => {
    const objectid = new ObjectId(req.params.id);
    const productToDelete = await connection.db("icetex").collection("products").deleteOne({ _id: objectid });
    console.log(productToDelete);
    res.json("test");
});

APIRoutes.put("/products/:id", async (req, res) => {
    const objectid = new ObjectId(req.params.id);
    const { name, imageUrl, price, amount } = req.body;
    const priceInt = parseInt(price, 10);
    const amountInt = parseInt(amount, 10);
    const updatedData = JSON.stringify({ name, imageUrl, priceInt, amountInt });
    console.log(updatedData);
    const productToUpdate = await connection.db("icetex").collection("products").findOneAndUpdate({ _id: objectid }, { $set: { name: name, image: imageUrl, price: priceInt, amount: amountInt } }, { returnOriginal: false });
    res.json(updatedData);
});

APIRoutes.post("/products/sale", async (req, res) => {
    let validatedToken = req.headers["authorization"];
    let userEmail = "";
    const saleData = req.body;
    //console.log(saleData);
    // const priceInt = parseInt(saleData.price, 10);
    // const amountInt = parseInt(amount, 10);
    // const sellData = JSON.stringify({ name, imageUrl, priceInt, amountInt });
    // console.log(sellData);
    jwt.verify(validatedToken, "snapserverKey", (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            userEmail = decoded.email;
        }
    });
    let saleList = [];
    let totalPrice = 0;
    saleData.map((dataToAdd) => {
        totalPrice = totalPrice + (dataToAdd.price * dataToAdd.count);
        let saleData = { name: dataToAdd.name, price: dataToAdd.price, count: dataToAdd.count };
        saleList.push(saleData);
    });
    const saleToAdd = await connection.db("icetex").collection("sells").insertOne({ user: userEmail, products: saleList, total: totalPrice });
    res.json(saleToAdd);
});

module.exports = APIRoutes;