// console.log("clinica");

import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("test get");
    res.status(200).send({ estado: "ok", msg: "API OK" });
});

app.listen(3000, () => {
    console.log ("servidor iniciado OK en puerto 3000");
})