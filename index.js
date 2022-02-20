//define imports
const tracer = require('dd-trace').init({
    hostname: 'datadog-agent',
    port: 8126
});
require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");



//import middleware
const {validLogin} = require("./middleware/auth")
//define app.use for required middlewares
app.use(cors());
app.use(bodyParser.json());

//define port
const PORT = 8081;

//import routes
const authRoutes = require("./routes/auth")

app.get("/", (req,res) => {
    res.status(200).json({"message":"Index Route"})
})


//define routes
app.use("/auth", authRoutes)

app.get("/test",validLogin, (req,res) => {
    res.status(200).json({message:"TEST route"});
    console.log("TEST ROUTE")
})
//define app.listen to run server

app.listen(PORT, () => {
    console.log(`AUTH Server running on port:${PORT}`)
})