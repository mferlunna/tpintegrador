console.log("clinica");

import express from "express";
import  { pool } from "./controlador/conexion.js";
import { testConexion } from "./controlador/testconexion.js"; 
import obrasRoutes from "./routes/obrasSociales.routes.js";
import especialidadesRoutes from "./routes/especialidades.routes.js";

const app = express();

await testConexion();

app.use(express.json());
app.use("/obras-sociales", obrasRoutes);
app.use("/especialidades", especialidadesRoutes);

app.get("/", (req, res) => {
    console.log("test get");
    res.status(200).send({ estado: "ok", msg: "API OK" });
    
});

process.loadEnvFile();
const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
    console.log (`servidor iniciado OK en puerto ${PUERTO || 3000}`);
})