const app = require("express");
const express = app();

express.get("/", (req,res) => {
    res.send("Hello World")
})

express.listen(9000, () => {
    console.log("Server started");
})