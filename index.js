console.log("clinica");

import express from "express";
import  { pool } from "./controlador/conexion.js";
import { testConexion } from "./controlador/testconexion.js"; 

const app = express();

await testConexion();

app.use(express.json());

app.get("/", (req, res) => {
    console.log("test get");
    //res.status(200).send({ estado: "ok", msg: "API OK" });
    res.send({ estado: "ok", msg: "API OK" });
});

app.post('/especialidades', (req, res) => {
    res.send({ estado: "ok", msg: "creado" });

})

app.get('/especialidades', async (req,res) => {
    try {
        const sql = 'SELECT * FROM especialidades WHERE activo - 1';

        const resulst = await pool.query(sql);
        console.log(resulst);

        res.status(200).res.send({ estado: "ok", msg: "funcionando" });
    
    }catch{error} {
        console.log(error);
    }
})

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log (`servidor iniciado OK en puerto ${PUERTO || 3000}`);
})