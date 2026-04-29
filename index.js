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

app.post('/especialidades', async (req, res) => {
    try {
        const { nombre } = req.body;

        const sql = 'INSERT INTO especialidades (nombre, activo) VALUES (?, 1)';

        const [result] = await pool.query(sql, [nombre]);

        res.send({
            estado: "ok",
            msg: "creado",
            id: result.insertId
        });

    } catch (error) {
        console.log(error);
    }
})

app.get('/especialidades', async (req, res) => {
    try {
        console.log(" ingrese al get /especialidades");

        const sql = 'SELECT * FROM especialidades WHERE activo = 1';

        const [especialidades] = await pool.query(sql);

        console.log(especialidades);

        res.status(200).send({
            estado: "ok",
            especialidades: especialidades
        });

    } catch (error) {
        console.log(error);
    }
});


app.get('/especialidades/:id_especialidades', async (req,res) => {
    try {
        console.log("entre al get por id");

        const id_especialidades = req.params.id_especialidades;

        const sql = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
        
        const [especialidades] = await pool.query(sql, [id_especialidades]);
        
        console.log(especialidades);

        res.status(200).send({
            estado: "ok",
            especialidades: especialidades
        });
    
    } catch (error) {
        console.log(error);
    }
});

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log (`servidor iniciado OK en puerto ${PUERTO || 3000}`);
})